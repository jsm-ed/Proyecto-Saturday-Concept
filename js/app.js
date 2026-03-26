const productsContainers = document.querySelectorAll(".productos")

productsList = []

const getProducts = async () =>{
    const response = await fetch('./data/products.JSON')
    const data = await response.json()
    return data
}

const renderProducts = (container, products) =>{
    container.innerHTML = ""
    products.forEach(product => {
        container.innerHTML+=`
            <article>
                <div class="contenedorOverflow">
                    <img src="./img/Productos/${product.img}"/>
                </div>
                <div class="contenidoProd">
                    <p>${product.name}</p>
                    <p class="precio">${product.price}€</p>
                </div>
            </article>
        `
    })
}


const init = async () =>{
    productsList = await getProducts()
    
    productsContainers.forEach(c=> {
        if (c.dataset.section === "novedades"){
            const newList = productsList.slice(-4)
            renderProducts(c, newList)
        } else if (c.dataset.section === "streetwear"){
            const newList = productsList.filter(p=> p.section="streetwear")
                                  .slice(0,4)
            renderProducts(c, newList)
        }
    })

}

init()