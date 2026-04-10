const productsContainers = document.querySelectorAll(".productos")
const buscadorTag = document.querySelector("#buscador")
const buscadorTag2 = document.querySelector("#buscador2")

//Variables collections
const params = new URLSearchParams(window.location.search)
const collection = params.get("collection")

//Variables searcher
const busqueda = params.get("q")

productsList = []

//Peticion fetch a JSON
const getProducts = async () =>{
    const response = await fetch('/data/products.JSON')
    const data = await response.json()
    return data
}

const renderProducts = (container, products) =>{
    container.innerHTML = ""
    products.forEach(product => {
        container.innerHTML+=`
            <article>
                <div class="contenedorOverflow">
                    <img src="/img/Productos/${product.img}"/>
                </div>
                <div class="contenidoProd">
                    <p>${product.name}</p>
                    <p class="precio">${product.price}€</p>
                </div>
            </article>
        `
    })
}

//Mostrar productos página index
const renderIndexProducts = ()=>{
    productsContainers.forEach(c=> {
        if (c.dataset.section === "novedades"){
            const newList = productsList.slice(-4)
            renderProducts(c, newList)
        } else if (c.dataset.section === "streetwear"){
            const newList = productsList.filter(p=> p.section==="streetwear")
                                  .slice(0,4)
            renderProducts(c, newList)
        }
    })
}

//Mostrar productos collections
const renderCollection = (collection) => {
    const colTitle = document.querySelector("#colection h1")
    const colNum = document.querySelector("#colection p")
    const btnsPags = document.querySelector(".paginas")
    
    const colList = productsList.filter(p => p.section==collection)
    
    let numProdMostrados = 6*4
    let primerProdMostrado = 0
    let ultimoProdMostrado = numProdMostrados
    let pagina = colList.slice(primerProdMostrado, ultimoProdMostrado)        

    colTitle.innerHTML = collection.toUpperCase()
    colNum.innerHTML = `${colList.length} productos`
    
    renderProducts(productsContainers[0], pagina)
    btnsPags.innerHTML=""
    for (let i = 1; i <= Math.ceil(colList.length / numProdMostrados); i++) {
        const btn = document.createElement("button")
        btn.textContent = i

        btn.addEventListener("click", () => {
            primerProdMostrado = (i - 1) * numProdMostrados
            ultimoProdMostrado = primerProdMostrado + numProdMostrados
            pagina = colList.slice(primerProdMostrado, ultimoProdMostrado)
            renderProducts(productsContainers[0], pagina)
        })

        btnsPags.appendChild(btn)
    }
}

const buscar = (palabra) =>{
    palabraMayus = palabra.toUpperCase()
    const searchedList = productsList.filter(p=>p.name.toUpperCase().includes(palabraMayus) || 
                        p.section.toUpperCase().includes(palabraMayus) || 
                        p.brand.some(b => b.toUpperCase().includes(palabraMayus)))
    return searchedList
}


const buscadorEvent = () =>{
    buscadorTag.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            const texto = buscadorTag.value;
            window.location.href = `/other/search.html?q=${texto}` 
        }
    })
}
const buscador2Event = ()=>{
    if(buscadorTag2){
        buscadorTag2.value=busqueda
        buscadorTag2.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                const texto = buscadorTag2.value;
                window.location.href = `/other/search.html?q=${texto}` 
            }
        })
    }
}

//MAIN
const init = async () =>{
    productsList = await getProducts()
    renderIndexProducts()

    if (collection) {renderCollection(collection)}

    buscadorEvent()
    if (busqueda) {
        const resultado = buscar(busqueda)
        
        buscadorTag.value=busqueda
        buscador2Event()

        if(resultado.length < 1){
            const containerProducts = document.querySelector(".sectionProductos")
            containerProducts.innerHTML=`
                <p class="noEncontrado">No se encontraron resultados para "${busqueda}". Revisa la ortografía o usa una palabra o frase diferente.</p>
                `
        }
        else{
            
            renderProducts(productsContainers[0], resultado)
        }

    }
    
}

init()