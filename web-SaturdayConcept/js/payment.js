const getFormData = ()=>{ // Datos del form 
    const form = document.getElementById("userData")
    const inputs = form.querySelectorAll("input.buscador")
    const contactInput = document.querySelector(".paymentMenu > input.buscador")
    const select = form.querySelector("select#pais")

    return {
        contact:  contactInput.value.trim(),
        country:  Number(select.value),
        name:     inputs[0].value.trim(),
        surnames: inputs[1].value.trim(),
        address:  inputs[2].value.trim(),
        door:     inputs[3].value.trim(),
        city:     inputs[4].value.trim(),
        pc:       inputs[5].value.trim()
    }
}

const findOrCreate = async (endpoint, list, match, body)=>{// Buscar o crear entidades en la API
    const existing = list.find(match)
    if(existing){return existing}
    const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

const createAddressAndCustomer = async (data)=>{ // Crear ciudad, direccion o cliente en caso de que no exista
    const cities = await (await fetch("http://127.0.0.1:8000/api/cities")).json()
    const city = await findOrCreate("cities", cities,
        c=>c.name.toLowerCase() == data.city.toLowerCase() && c.country_id == data.country,
        {name: data.city, country_id: data.country}
    )

    const addresses = await (await fetch("http://127.0.0.1:8000/api/addresses")).json()
    const address = await findOrCreate("addresses", addresses,
        a => a.name.toLowerCase() == data.address.toLowerCase() && a.pc == data.pc && a.city_id == city.id && (a.door || null) == (data.door || null),
        {name: data.address, door: data.door || null, pc: data.pc, city_id: city.id}
    )

    const customers = await (await fetch("http://127.0.0.1:8000/api/customers")).json()
    const customer = await findOrCreate("customers", customers,
        c=>c.contact == data.contact,
        {name: data.name, surnames: data.surnames, contact: data.contact, address_id: address.id}
    )

    return {address, customer}
}

const processOrder = async (customer, address, cart)=>{// Crear pedido con sus items y actualizar stock
    const discountPct = parseFloat(document.getElementById("discountPct")?.textContent) || 0
    const subtotal = cart.reduce((acc, i)=> acc + (i.price * i.quantity), 0)
    const orderTotal = subtotal - (subtotal * discountPct/100)

    const responseOrder = await fetch("http://127.0.0.1:8000/api/orders", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({customer_id: customer.id, address_id: address.id, discount: discountPct, order_total: orderTotal})
    })
    const order = await responseOrder.json()

    for(const item of cart){
        await fetch("http://127.0.0.1:8000/api/order-items", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({order_id: order.id, product_id: item.id, quantity: item.quantity})
        })
        const newStock = Math.max(0, item.stock - item.quantity)
        const updateBody = {stock: newStock}
        if (newStock === 0) updateBody.size_name = null

        await fetch(`http://127.0.0.1:8000/api/products/${item.id}`, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(updateBody)
        })
    }
}

const getRegexForInput = (input) => {
    switch (input.placeholder) {
        case "Email": return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        case "Nombre": return /^[a-zA-Z\s]+$/
        case "Apellidos": return /^[a-zA-Z\s]+$/
        case "Dirección": return /^[a-zA-Z0-9\s]+$/
        case "Casa, apartamento, etc": return /^[a-zA-Z0-9\s]*$/
        case "Ciudad": return /^[a-zA-Z\s]+$/
        case "Codigo postal": return /^\d{4,5}$/
    }
}
const validateInputs = () => { // Validar inputs
    const inputs = document.querySelectorAll(".paymentMenu input.buscador")
    let isValid = true
    inputs.forEach(input => {
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-msg")) {
            input.nextElementSibling.remove()
        }

        const regex = getRegexForInput(input)

        if (!regex.test(input.value.trim())) {
            input.style.borderColor = "red"
            
            const errorMsg = document.createElement("p")
            errorMsg.textContent = "Campo inválido"
            errorMsg.style.color = "red"
            errorMsg.style.fontSize = "12px"
            errorMsg.classList.add("error-msg")
            
            input.parentNode.insertBefore(errorMsg, input.nextSibling)
            isValid = false
        } else {
            input.style.borderColor = ""
        }
    })

    return isValid
}

const payListener = ()=>{// Listener del botón pagar
    const payBtn = document.getElementById("pay-btn")
    const cart = JSON.parse(localStorage.getItem("cart"))
    
    if(cart){
        payBtn.addEventListener("click", async ()=>{
            if (validateInputs()){
                const data = getFormData()
                const {address, customer} = await createAddressAndCustomer(data)
                await processOrder(customer, address, cart)
                
                localStorage.removeItem("cart")
                alert("Pedido realizado con éxito")
                window.location.href = "/web-SaturdayConcept/index.html"
            } 

        })
    }
}
payListener()
