// DOM generador de productos de la section --- PRODUCTS BY FILTER ---
const productsContainer = document.querySelector(".products-filter-container") //
const btnLoad = document.querySelector(".btn-moreproducts") // Boton para renderizar mas productos en la seccion de products-filter-container.

// DOM encargado de llamar al Carrito y al Menu.
const cartBtn = document.querySelector(".cart-label")
const cartMenu = document.querySelector(".cart")

// Funcion para renderizar la lista de productos.
const createProductTemplate = (product) => {
const {id, nombre, precio, marca, cardImg} = product
return `
<div class="product-filter">
<img src=${cardImg} alt=${nombre} />

<div class="info-filter-top">
<p>${nombre}</p>
<span>${marca}</span>
<h4>${precio}</h4>
<button class="btn-add"
data-id='${id}'
data-name='${nombre}'
data-price='${precio}'
data-img='${cardImg}'>Agregar al carrito</button>
</div> 
</div> `
};

// Funcion para mostrar mas productos en el boton de "Ver mas".
const moreProducts = () => {
    appState.currentProducts +=1;
    let {products, currentProducts} = appState
    renderProducts(products[currentProducts]); // Products y currentProducts vienen del JS de dataProducts (appState)
    if(lastProducts()) {
        btnLoad.classList.add("hidden")
    }
}

// Funcion para ver si el indice de productos renderizados es igual al del limite de estos mismos productos.
const lastProducts = () => {
    return appState.currentProducts === appState.limiteProducts -1; // limiteProducts viene de dataProducts (appState)
};

// Funcion para renderizar la lista de productos.
const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
    .map(createProductTemplate)
    .join('');
};


const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
}

// Funcion inicializadora para llamar a los Listeners y el init.
const init = () => {
    renderProducts(appState.products[0]);
    btnLoad.addEventListener("click", moreProducts) //
    cartBtn.addEventListener("click", toggleCart)
};

init()
