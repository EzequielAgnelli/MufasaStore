// DOM generador de productos de la section --- PRODUCTS BY FILTER ---
const productsContainer = document.querySelector(".products-filter-container") //
const btnLoad = document.querySelector(".btn-moreproducts") // Boton para renderizar mas productos en la seccion de products-filter-container.

// DOM encargado de llamar al Carrito y al Menu.
const cartBtn = document.querySelector(".cart-label")
const menuBtn = document.querySelector(".menu-label")
const cartMenu = document.querySelector(".cart")
const barsMenu = document.querySelector(".navbar-links")
const overlay = document.querySelector(".overlay")
const productsCart = document.querySelector(".cart-container")

// DOM encargado de llamar a la seccion Contact Us
const form = document.getElementById("contact-form")
const inputName = document.getElementById("name")
const inputLastName = document.getElementById("lastname")
const inputEmail = document.getElementById("email")


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

// Activar el cart y si el menu esta abierto que se cierre el carrito.
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
    // Menu Hamburguesa 🍔. Si esta abierto, que se cierre para evitar que se sobreponga con el menu. Tambien activo el overlay con 0px de blur (Se sigue notando un brillo minimo)
    if(barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return; 
    }
    overlay.classList.toggle("show-overlay")
};

// Activar el menu hamburguesa y que se cierre el cart si este mismo se abre.
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    if(cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return
    }
    overlay.classList.toggle("show-overlay")
};

// Guardar en el LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || []

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// 
const renderCart = () => {
    if(!cart.length) {
        productsCart.innerHTML = `<p class="empty-cart-text">No hay ningun producto agregado.</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join('');
};

const validateForm = () => {
    
}

const checkTextInput = (input) => {
    // Aplicar la validez del value en false.
    let valid = false;
    const minCharacters = 4;
    const maxCharacters = 32;

    if(isEmpty(input)) {
        showError(input, `Este campo es obligatorio.`);
        return
    };

    if(!isBetween(input, minCharacters, maxCharacters)) {
        showError(
            input `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
        );
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

const isEmpty = (input) => {
    // falsy.
    return !input.value.trim().length
};

const showError = (input, message) => { 
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = message;  
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success")
    const error = formField.querySelector("small")
    error.textContent = "";
}

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max
}

// Funcion inicializadora para llamar a los Listeners y el init.
const init = () => {
    renderProducts(appState.products[0]);
    btnLoad.addEventListener("click", moreProducts) // Boton para renderizar mas productos. 
    cartBtn.addEventListener("click", toggleCart) // Para togglear el Carrito.
    menuBtn.addEventListener("click", toggleMenu) // Para togglear el Menu hamburguesa.
    form.addEventListener("submit", validateForm) // Listener del formulario de la section de ContactUs.
    inputName.addEventListener("input", () => checkTextInput (inputName))
    inputLastName.addEventListener("input", () => checkTextInput (inputLastName)) 
};

init()
