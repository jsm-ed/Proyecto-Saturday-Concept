const numProdPagina = 4*6

// Variables Index
const productsContainers = document.querySelectorAll(".productos")

//Variables collections
const params = new URLSearchParams(window.location.search)
const collection = params.get("collection")
const filterMenu = document.querySelector(".filterPage")
const colNum = document.querySelector(".productsMenu p")


//Variables searcher
const buscadorTag = document.querySelector("#buscador")
const buscadorTag2 = document.querySelector("#buscador2")
const busqueda = params.get("q")


let productsList = []
let colList = []
let filteredList = []

let filters = {
    "stock":[],
    "sizes":[],
    "brands":[]
}
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

//Empaginado
const pagination = (list)=>{
    const btnsPags = document.querySelector(".paginas")
    btnsPags.innerHTML=""
    for (let i = 1; i <= Math.ceil(list.length / numProdPagina); i++) {
        const btn = document.createElement("button")
        btn.textContent = i
        btn.addEventListener("click", () => {
            renderPage(list, i)
        })
        btnsPags.appendChild(btn)
    }
}

const renderPage = (list, page)=>{
    let primerProdMostrado = (page - 1) * numProdPagina
    let ultimoProdMostrado = primerProdMostrado + numProdPagina
    const pagina = list.slice(primerProdMostrado, ultimoProdMostrado)
    renderProducts(productsContainers[0], pagina)
}

//Mostrar productos collections   !!!!!HACE FALTA REFACTORIZAR
const renderCollection = (collection) => {
    const colTitle = document.querySelector("#colection h1")
    if (collection == "accesorios"){
        colList = productsList.filter(p => p.section==collection || p.section == "new era")
    }else{
        colList = productsList.filter(p => p.section==collection)
    }
    renderPage(colList, 1)
    pagination(colList)
    
    colTitle.innerHTML = collection.toUpperCase()
    colNum.innerHTML = `${colList.length} productos`
}

//Filtrar lista por nombre, seccion y marca
const buscar = (palabra) =>{
    palabraMayus = palabra.toUpperCase()
    const searchedList = productsList.filter(p=>p.name.toUpperCase().includes(palabraMayus) || 
        p.section.toUpperCase().includes(palabraMayus) || 
        p.brand.some(b => b.toUpperCase().includes(palabraMayus)))
    return searchedList
}

const renderBusqueda = ()=>{
    const resultado = buscar(busqueda)
    colList = resultado
    buscadorTag.value=busqueda
    buscador2Event()
    if(resultado.length < 1){
        const containerProducts = document.querySelector(".sectionProductos")
        containerProducts.innerHTML=`
            <p class="noEncontrado">No se encontraron resultados para "${busqueda}". Revisa la ortografía o usa una palabra o frase diferente.</p>
            `
    }
    else{
        renderPage(colList, 1)
        pagination(colList)
    }  
    colNum.innerHTML = `${colList.length} productos`
    console.log(colList)
}
//Añadir eventlistener al input del header
const buscadorEvent = () =>{
    buscadorTag.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            const texto = buscadorTag.value;
            window.location.href = `/other/search.html?q=${texto}` 
        }
    })
}
//Detalles y listener input del main de la pagina search
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

//Filtros 
const renderSizes = ()=>{
    const sizesContainer = document.getElementById("talla")
    sizesContainer.innerHTML = `<summary>TALLA</summary>`
    let sizes = []
    if (collection == "sneakers"){
        sizes = ["37", "38", "39", "40", "41", "42", "43", "44", "45"]
    }else if(collection == "streetwear"){
        sizes = ["XS", "S", "M", "L", "XL"]
    }else if(collection == "accesorios"){
        sizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8", "22", "23.5", 
            "25", "27", "28", "36-40", "41-46"
        ]
    }else if(collection == "new era"){
        sizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8"]
    }else{
        sizes = ["37", "38", "39", "40", "41", "42", "43", "44", "45", "XS", "S", "M", "L", "XL","6 7/8", "7", 
            "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8", "22", "23.5", "25", "27", "28", 
            "36-40", "41-46", "6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8"
        ]
    }

    sizes.forEach(s=> sizesContainer.innerHTML += `
        <button onclick="toggleFilter('sizes', '${s}', this)">${s}</button>
    `
    )
}

const renderBrands = ()=>{
    const brandsContainer = document.getElementById("marca")
    brandsContainer.innerHTML = `<summary>MARCA</summary>`
    let brands = []
    colList.map(p=>p.brand)
           .flat()
           .forEach(b=>{
                if(!brands.includes(b)){
                    brands.push(b)
                }
            })

    brands.forEach(b=>brandsContainer.innerHTML += `
        <button onclick="toggleFilter('brands','${b}', this)">${b}</button>
    `)
}

const visibilityFilter = (visibilidad)=>{
    filterMenu.style.visibility = visibilidad
    const body = document.querySelector("body")
    if(visibilidad=="visible"){
        body.style.overflow = "hidden"
    }else if(visibilidad=="hidden"){
        body.style.overflow = "auto"
    }
}

const toggleFilter = (type, value, elemento) => {
    const list = filters[type]
    const index = list.indexOf(value)

    index == -1 ? list.push(value) : list.splice(index, 1) 
    elemento.classList.toggle("active")
}


const applyFilter = ()=>{
    const minPrice = document.getElementById("minPrice")
    const maxPrice = document.getElementById("maxPrice")

    filteredList = colList

    if(filters.stock.includes("in") && !filters.stock.includes("notIn")){
        filteredList = filteredList.filter(p=>p.stock > 0)
    }else if(filters.stock.includes("notIn") && !filters.stock.includes("in")){
        filteredList = filteredList.filter(p=>p.stock == 0)
    }
    if(filters.sizes.length > 0){
        filteredList = filteredList.filter(p=> p.size.some(s => filters.sizes.includes(s)))
    }
    if(filters.brands.length > 0){
        filteredList = filteredList.filter(p=> p.brand.some(b => filters.brands.includes(b)))
    }
    if(minPrice.value){filteredList = filteredList.filter(p=> p.price >= parseFloat(minPrice.value))}
    if(maxPrice.value){filteredList = filteredList.filter(p=> p.price <= parseFloat(maxPrice.value))}
    colNum.innerHTML = `${filteredList.length} productos`
    renderPage(filteredList, 1)
    pagination(filteredList)
        console.log(filteredList)

}

//MAIN
const init = async () =>{
    productsList = await getProducts()
    renderIndexProducts() 

    if (collection) {
        renderCollection(collection)
        renderSizes()
        renderBrands()
    }

    buscadorEvent()
    if (busqueda){
        renderBusqueda()
        renderSizes()
        renderBrands()
    }
}

init()