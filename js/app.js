const numProdPagina = 4*6

// Variables Index
const productsContainers = document.querySelectorAll(".productos")

//Variables collections
const params = new URLSearchParams(window.location.search)
let collection = params.get("collection")
const filterMenu = document.querySelector(".filterPage")
const colNum = document.querySelector(".productsMenu p")


//Variables searcher
const buscadorTag = document.querySelector("#buscador")
const buscadorTag2 = document.querySelector("#buscador2")
const busqueda = params.get("q")

//Página dinámica de cada producto
const nombreProducto = params.get("p")

//Listas
    //Productos sin filtrar por talla
let totalProductsList = []
let totalColList = [] //Sin filtrar pero únicamente los de la sección o búsqueda (para poder filtrar por talla y stock)
    //Productos unicos
let productsList = [] //Todos
let colList = []      //Únicamente colección o búsqueda
let filteredList = [] //Filtrados

let filters = { //JSON de filtros
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

const listDistinct = (lista)=>{
    let used = []
    let newList = []
    lista.forEach(e=>{
        if(!used.includes(e.name)){
            used.push(e.name)
            newList.push(e)
        }
    })
    return newList
}

const renderProducts = (container, products) =>{ //Renderizar productos de una lista en un contenedor
    container.innerHTML = ""
    products.forEach(product => {
        container.innerHTML+=`
            <a href="/other/product.html?p=${product.name}">
            <article class="product">
                <div class="contenedorOverflow">
                    <img src="/img/Productos/${product.img}"/>
                </div>
                <div class="contenidoProd">
                    <p>${product.name}</p>
                    <p class="precio">${product.price}€</p>
                </div>
            </article>
            </a>
        `
    })
}


const renderIndexProducts = ()=>{ //Mostrar productos página index
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
const pagination = (list)=>{ //Añadir numeros de cambio de página en función de una lista
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

const renderPage = (list, page)=>{ //Mostrar productos de una lista por páginas 
    let primerProdMostrado = (page - 1) * numProdPagina
    let ultimoProdMostrado = primerProdMostrado + numProdPagina
    const pagina = list.slice(primerProdMostrado, ultimoProdMostrado)
    renderProducts(productsContainers[0], pagina)
}


const renderCollection = (collection) => { //Mostrar productos collections
    const colTitle = document.querySelector("#colection h1")
    if(collection == "accesorios"){
        colList = productsList.filter(p => p.section==collection || p.section == "new era") 
        totalColList = totalProductsList.filter(p => p.section==collection || p.section == "new era") 
    }else{
        colList = productsList.filter(p => p.section==collection)
        totalColList = totalProductsList.filter(p => p.section==collection)
    }
    renderPage(colList, 1) 
    pagination(colList)
    
    colTitle.innerHTML = collection.toUpperCase()
    colNum.innerHTML = `${colList.length} productos`
    renderSizes()
    renderBrands()
}


const buscar = (palabra, lista) =>{ //Filtrar lista por nombre, seccion y marca
    palabraMayus = palabra.toUpperCase()
    const searchedList = lista.filter(p=>p.name.toUpperCase().includes(palabraMayus) || 
        p.section.toUpperCase().includes(palabraMayus) || 
        p.brand.some(b => b.toUpperCase().includes(palabraMayus)))
    return searchedList
}

const renderBusqueda = ()=>{ //Mostrar resultado de búsqueda y añadir eventListener al segundo buscador
    const resultado = buscar(busqueda, productsList)
    colList = resultado
    totalColList = buscar(busqueda, totalProductsList)
    buscadorTag.value=busqueda //Estético
    buscador2Event()
    if(resultado.length == 0){
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
    renderSizes()
    renderBrands()
}

const buscadorEvent = () =>{ //Añadir eventlistener al input del header
    buscadorTag.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            const texto = buscadorTag.value
            window.location.href = `/other/search.html?q=${texto}` 
        }
    })
}

const buscador2Event = ()=>{ //Detalles y listener input del main de la pagina search
    if(buscadorTag2){
        buscadorTag2.value=busqueda
        buscadorTag2.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                const texto = buscadorTag2.value
                window.location.href = `/other/search.html?q=${texto}` 
            }
        })
    }
}

//Filtros 
const makeSizes = ()=>{
    let sizes = [
        "37", "38", "39", "40", "41", "42", "43", "44", "45", "XS", "S", "M", "L", "XL","6 7/8", "7", 
        "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8", "22", "23.5", "25", "27", "28", 
        "36-40", "41-46", "6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8"
    ]
    if (collection == "sneakers"){
        sizes = ["37", "37.5", "38", "38.5", "39", "39.5", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43", "43.5", "44", "45"]
    }else if(collection == "streetwear"){
        sizes = ["XS", "S", "M", "L", "XL"]
    }else if(collection == "accesorios"){
        sizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8", "22", "23.5", 
            "25", "27", "28", "36-40", "41-46"
        ]
    }else if(collection == "new era"){
        sizes = ["6 7/8", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8", "7 3/4", "7 7/8", "8"]
    }
    return sizes
}
const renderSizes = ()=>{ //Según la colección, cargar opciones de tallas
    const sizesContainer = document.getElementById("talla") //No tiene carga dinámica porque pueden haber tallas que no estan disponibles
    sizesContainer.innerHTML = ""
    const sizes = makeSizes()
    sizes.forEach(s=> sizesContainer.innerHTML += `
        <button class="btn-blanco" onclick="toggleFilter('sizes', '${s}', this)">${s}</button>
    `
    )
}

const renderBrands = ()=>{ //Según la sección, cargar dinámicamente las marcas
    const brandsContainer = document.getElementById("marca")
    brandsContainer.innerHTML = ""
    let brands = []
    colList.map(p=>p.brand)
           .flat()
           .forEach(b=>{
                if(!brands.includes(b)){
                    brands.push(b)
                }
            })

    brands.forEach(b=>brandsContainer.innerHTML += `
        <button class="btn-blanco" onclick="toggleFilter('brands','${b}', this)">${b}</button>
    `)
}

const visibilityFilter = (visibilidad)=>{ //Declarada en un onclick del boton btn-filtrar
    filterMenu.style.visibility = visibilidad  //Mostrar o ocultar menu de filtrado y bloquear o no el scroll mediante el overflow
    const body = document.querySelector("body")
    if(visibilidad=="visible"){
        body.style.overflow = "hidden"
    }else if(visibilidad=="hidden"){
        body.style.overflow = "auto"
    }
}

const toggleFilter = (type, value, elemento) => { //Añadir/borrar elemento de filtrado a la lista de filtros
    const list = filters[type]
    const index = list.indexOf(value)

    index == -1 ? list.push(value) : list.splice(index, 1) 
    elemento.classList.toggle("active")
}


const applyFilter = ()=>{ //Aplicar filtro acumulativamente
    const minPrice = document.getElementById("minPrice")
    const maxPrice = document.getElementById("maxPrice")

    filteredList = colList

    if(filters.stock.includes("in") && !filters.stock.includes("notIn")){
        filteredList = filteredList.filter(p =>
            totalColList.some(tp =>
            tp.name == p.name && tp.stock > 0)
        )
    }else if(filters.stock.includes("notIn") && !filters.stock.includes("in")){
        filteredList = filteredList.filter(p =>
            !totalColList.some(tp =>
            tp.name == p.name && tp.stock > 0)
        )
    }
    if(filters.sizes.length > 0){
        filteredList = filteredList.filter(p =>
            totalColList.some(product =>
            product.name === p.name &&
            filters.sizes.includes(product.size))
        )
    }
    if(filters.brands.length > 0){filteredList = filteredList.filter(p=> p.brand.some(b => filters.brands.includes(b)))}
    if(minPrice.value){filteredList = filteredList.filter(p=> p.price >= parseFloat(minPrice.value))}
    if(maxPrice.value){filteredList = filteredList.filter(p=> p.price <= parseFloat(maxPrice.value))}
    
    colNum.innerHTML = `${filteredList.length} productos`
    renderPage(filteredList, 1)
    pagination(filteredList)
}

//Ordenar por
const sortProducts = (sortValue)=>{
    let sortedList = []
    filteredList.length > 0 ? sortedList=filteredList : sortedList=colList 

    if(sortValue=="az"){
        sortedList = sortedList.sort((p1, p2) => p1.name.localeCompare(p2.name))
    }else if(sortValue=="za"){
        sortedList = sortedList.sort((p1, p2) => p2.name.localeCompare(p1.name))
    }else if(sortValue=="min-max"){
        sortedList = sortedList.sort((p1, p2) => p1.price - p2.price)
    }else if(sortValue=="max-min"){
        sortedList = sortedList.sort((p1, p2) => p2.price - p1.price)
    }
    renderPage(sortedList, 1)
    pagination(sortedList)
}

//Carga dinámica de products.html
const renderProductPage = (productName)=>{
    const image = document.querySelector(".productImage img")
    const productTitle = document.querySelector(".productDescription h2")
    const productPrice = document.querySelector(".productDescription h3")
    const sizesContainer = document.querySelector(".grid-btns-blancos")
    const descriptionContainer = document.getElementById("description")
    const description = document.querySelector("#description p")
    let producto = {}
    producto = productsList.find(p => p.name == productName)
    const disponibleSizes = totalProductsList.filter(p=>p.name==producto.name)
                                             .map(p=>p.size)
    console.log(disponibleSizes)

    image.src = `/img/Productos/${producto.img}`
    productTitle.innerHTML = producto.name
    productPrice.innerHTML = `${producto.price}€`
    
    sizesContainer.innerHTML = ""
    collection = producto.section
    const sizes = makeSizes()
    sizes.forEach(
        s=>{
            disponibleSizes.includes(s) 
            ? sizesContainer.innerHTML +=`
                <button class="btn-blanco">${s}</button>
              `
            : sizesContainer.innerHTML +=`
                <button class="">${s}</button>
              `
            
        }
    )

    //Añadir description

}

//MAIN
const init = async () =>{
    totalProductsList = await getProducts()
    productsList = listDistinct(totalProductsList)
    renderIndexProducts() 
    

    if (collection) {renderCollection(collection)}

    buscadorEvent()
    if (busqueda){renderBusqueda()}

    if(busqueda || collection){
        const sortTag = document.getElementById("ordenar")
        sortTag.addEventListener("change",()=>sortProducts(sortTag.value))
    }

    if(nombreProducto){renderProductPage(nombreProducto)}
}
init()