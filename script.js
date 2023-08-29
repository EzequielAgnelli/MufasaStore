// ------------ DOM generador de productos de la section PRODUCTS BY FILTER y categorias ------------ //
const productsContainer = document.querySelector(".products-filter-container") //
const btnLoad = document.querySelector(".btn-moreproducts") // Boton para renderizar mas productos en la seccion de products-filter-container.
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
// ------------ DOM encargado de llamar al Carrito, menu y demas elementos relacionados.  ------------ //
const cartBtn = document.querySelector(".cart-label")
const menuBtn = document.querySelector(".menu-label")
const cartMenu = document.querySelector(".cart")
const barsMenu = document.querySelector(".navbar-links")
const overlay = document.querySelector(".overlay")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const popUpMsg = document.querySelector(".add-popup")
const btnCartPurchase = document.querySelector(".btn-cartpurchase")
// ------------ DOM encargado de llamar a la seccion Contact Us ------------ //
const form = document.getElementById("contact-form")
const inputName = document.getElementById("name")
const inputLastName = document.getElementById("lastname")
const inputEmail = document.getElementById("email")
const inputTextArea = document.getElementById("textarea")
const formMessage = document.getElementById("message")
// ------------------------------------------------------------------ //

// Funcion que crea el template de los productos.
const createProductTemplate = (product) => {
const {id, nombre, precio, marca, cardImg} = product
// Formatear el precio para poder poner un signo de pesos ($).
// const priceFormat = precio.toLocaleString("es-AR", {
//     style: "currency",
//     currency: "ARS"
// }); Esto esta comentado porque me hice mucho problema. Todo era mas facil agregando un simple $ en las backticks.

return `
<div class="product-filter">
<img src=${cardImg} alt=${nombre}>

<div class="info-filter-top">
<p>${nombre}</p>
<span>${marca}</span>
<h4>$${precio}</h4> 

<button class="btn-add"
data-id='${id}'
data-nombre='${nombre}'
data-precio='${precio}'
data-img='${cardImg}'>Agregar al carrito
</button>
</div> 
</div>   `
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

// Funcioniones para filtrar las Zapatillas por categoria. En este caso, por marcas.
const filterByCategory = ({target}) => {
    if(!inactiveFilters(target)) 
    return
    changeFilter(target)
    productsContainer.innerHTML = ''
    if(appState.activeFilter) {
        renderFilteredProducts()
        appState.currentProductsIndex = 0
        return
    }
    renderProducts(appState.products[0])
};

const inactiveFilters = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    )
};

const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.category
    changeActiveBtnState(appState.activeFilter);

}

// Funcion para cambiar el estado de los botones.
const changeActiveBtnState = (categorySelected) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== categorySelected) {
            categoryBtn.classList.remove("active")
            return
        }
        categoryBtn.classList.add("active")
    })
}

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    )
    renderProducts(filteredProducts)
}
                                    // -------------------------- CARRITO Y MENU -------------------------- //

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

// Funcion para cerrar el menu y carrito cuando el usuario empiece a scrollear con uno de estos abiertos.
const closeOnScroll = () =>  {
    if(
        !barsMenu.classList.contains("open-menu")
        && !cartMenu.classList.contains("open-cart")
        ){
            return
        };
        barsMenu.classList.remove("open-menu")
        cartMenu.classList.remove("open-cart")
        overlay.classList.remove("show-overlay")
    }

// Funcion para cerrar el menu cuando se clickee un elemento de este mismo.
const closeOnClick = () => {
    if(!e.target.classList.contains("navbar-list")) 
    return
    barsMenu.classList.remove("open-menu")
    barsMenu.classList.remove("show-overlay")
}

// Funcion para cerrar el menu o carrito cuando se haga click fuera de este, es decir, en el overlay.
const closeOverlayOnClick = () => {
    barsMenu.classList.remove("open-menu")
    cartMenu.classList.remove("open-cart")
    overlay.classList.remove("show-overlay")
}

// Renderizar carrito de compras.
// Guardar el carrito de compras en el Local Storage.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Funcion para renderizar los productos del carrito.
const renderCart = () => {
    if(!cart.length) {
        productsCart.innerHTML = `<p class="cart-empty-msg">No hay productos en tu carrito de compras.</p>`;
        return
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("")
} 

const createCartProductTemplate = (cartProduct) => {
    const {id, nombre, precio, img, quantity} = cartProduct
    const priceFormat = precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
    });

    return `<div class="cart-item">
    <img src=${img} alt="Zapatillas seleccionadas">
    <div class="item-info">
    <h3 class="item-name">${nombre}</h3>
    <p class="item-bid">Productos Actuales:</p>
    <span class="item-price">$${precio}</span>
    </div>
    <div class="item-handler">
    <span class="quantity-handler down" data-id=${id}>-</span>
    <span class="item-quantity">${quantity}</span>
    <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
</div>`
}

// Funcion para mostrar el total de la compra.
const showCartTotalPrice = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`
}

// Para ir sumando el precio de los productos en el carrito.
const getCartTotal = () => {
    return cart.reduce((accumulator, actualPrice) => accumulator + Number(actualPrice.precio) * actualPrice.quantity, 0) 
}

const addProduct = (e) => {
    if(!e.target.classList.contains("btn-add")) 
        {return};

    // Funcion para desestructurar.
    const product = createProductData(e.target.dataset);
    //  Ahora compruebo si ya hay productos en el carro de compras. (Con una funcion auxiliar)
    if(isProductInCart(product)) {
        addUnitToProduct(product); 
        console.log("Product data:", product);
    // Mostrar el mensaje popUp.
    showPopUp("Se agrego correctamente una unidad al carrito de compras.")
    } else {
        productInCart(product);
        showPopUp("Se agrego correctamente un producto al carrito de compras.")
    };
        cartState()
};

// Funcion desestructuradora
const createProductData = (product) => {
    const {id, nombre, precio, img} = product
    return {id, nombre, precio, img}
}

// Para agregar un producto que ya esta en el carrito de compras y se sume la cantidad.
const isProductInCart = (product) => {
    return cart.find((item) => item.id === product.id);
};

// Funcion para agregar una unidad a un producto ya existente en el carrito de compras.
const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
    ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
    : cartProduct
    );
};

// Para agregar un producto que aun no esta en el carrito de compras
const productInCart = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};

// Mensaje popUp al agregar un producto al carrito.
const showPopUp = (msg) => {
    popUpMsg.classList.add("active-popup")
    popUpMsg.textContent = msg
    setTimeout(() => {
        popUpMsg.classList.remove("active-popup")
    }, 2500);
};

// Funcion para ir actualizando el carrito cada vez que se agrega un producto.
const cartState = () => {
    // Local Storage del carrito.
    saveCart();
    renderCart();
    showCartTotalPrice();

};

// Al tocar el boton de "Terminar compra" saldra una alert con este texto.
const completePurchase = () => {
    completeCartPurchase("¿Quiere terminar con su compra?", "¡Gracias por elegirnos! Tu compra se proceso correctamente. Te llegara un recibo en tu correo electronico en la brevedad.")
}

const completeCartPurchase = (confirmMsg, successMsg) => {
    if(!cart.length) return;
    if(window.confirm(confirmMsg)) {
        alert(successMsg);
    };
};

// Funcion para eliminar un producto del carrito.
const removeProductCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    cartState();
};

// Funcion para agregar mas unidades de un producto.
const handleMoreBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct)
}

const handleLessBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id)
    if(existingCartProduct.quantity === 1) {
        removeProductCart(existingCartProduct)
    }
    substractProductUnit(existingCartProduct);
}

const substractProductUnit = (existingCartProduct) => {
    cart = cart.map((product) => {
        return product.id === existingCartProduct.id
        ? {...product, quantity: Number(product.quantity) - 1}
        : product;
    });
};

// Funcion para agregar mas productos en el carrito o sacar productos del carrito.
const quantityHandler = e => {
    if(e.target.classList.contains("down")) {
        handleLessBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handleMoreBtnEvent(e.target.dataset.id);
    };
    cartState();
};

// -------------------------- ACA EMPIEZA EL CODIGO DE VALIDACION DE LA SECCION CONTACT US. --------------------------// 

// Validar cantidad de caracteres de un input
const checkTextInput = (input) => {
    // Aplicar la validez del value en false.
    let valid = false;
    const minCharacters = 4;
    const maxCharacters = 20;

    // Si el campo de LastName o Name estan vacios, este mensaje se va a mostrar.
    if(isEmpty(input)) {
        showError(input, `Este campo es obligatorio.`);
        return
    };

    // Esto va a controlar que el campo de LastName y Name tengan entre 4 y 20 caracteres.
    if(!isBetween(input, minCharacters, maxCharacters)) {
        showError(
            input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
        );
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

// Para setear cuando el input este vacio y se detecte.
const isEmpty = (input) => {
    return !input.value.trim().length
};

// Si no se cumplen los requisitos ingresados del input, se mostrara este showError.
const showError = (input, message) => { 
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = message;
};

// Si se cumplen con los requisitos ingresados del input, se mostrara este showSuccess.
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

// Checkear Email.
const checkEmail = (input) => {
    let valid = false;
    if(isEmpty(input)) { 
        showError(input, `Este campo es obligatorio.`)
        return;
    }
    if(!validEmail(input)) {
        showError(input, `Este email no es valido.`)
        return;
    }
    showSuccess(input);
    valid = true;
    return valid;
}

// Para validar el input del Email, con una expresion regular. Si hay un espacio, este pasa por el showError.
const validEmail = (input) => {
    const regularExpression = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    return regularExpression.test(input.value)
};

// Validar el TextArea junto a una expresion regular para no permitir ciertos simbolos.
const checkTextArea = (input) => {
    let valid = false;
    if(isEmpty(input)) {
        showError(input, `Este campo es obligatorio.`)
        return;
    }
    if(!validTextArea(input)) {
        showError(input, `No se permiten los siguientes caracteres: %, &, |, <, >, #`)
        return;
    };
    showSuccess(input);
    valid = true;
    return valid;
}

// Expresion regular del Text Area (RegEx = Regular Expression)
const validTextArea = (input) => {
    const regEx = /^[^%&|<>#]*$/ // Expresion regular del Text Area para que no se permitan los simbolos: %, &, |, <, >, #.
    return regEx.test(input.value)
}

// Validar el formulario de Contact Us.
const validateForm = () => {
    const validName = checkTextInput(inputName);
    const lastNameValid = checkTextInput(inputLastName);
    const emailValid = checkEmail(inputEmail);
    const textAreaValid = checkTextArea(inputTextArea);
    
    if(validName && lastNameValid && emailValid && textAreaValid) {
        formMessage.textContent = "Formulario enviado con exito."
        // Tendras una respuesta en tu correo electronico en la brevedad.
        formMessage.classList.remove("error")
        formMessage.classList.add("success")
    } else {
        formMessage.textContent = "Hay campos del formulario con errores. Porfavor verificalos y volve a intentarlo."
        formMessage.classList.remove("success")
        formMessage.classList.add("error")
    }
}

// ------------------------------- Funcion inicializadora para llamar a los Listeners y el init. ------------------------------- //

const init = () => {
    // ---------------- LISTENERS PARA RENDERIZAR PRODUCTOS DE LA SECTION PRODUCTS BY FILTER Y FILTRAR POR CATEGORIA. ----------------  // 
    renderProducts(appState.products[0]);
    btnLoad.addEventListener("click", moreProducts) // Boton para renderizar mas productos. 
    categories.addEventListener("click", filterByCategory)
    // ---------------- LISTENERS DEL CARRITO, MENU Y RELACIONADOS. ----------------  //
    cartBtn.addEventListener("click", toggleCart) 
    menuBtn.addEventListener("click", toggleMenu) 
    window.addEventListener("scroll", closeOnScroll)
    barsMenu.addEventListener("click", closeOnClick)
    overlay.addEventListener("click", closeOverlayOnClick)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotalPrice)
    productsContainer.addEventListener("click", addProduct)
    productsCart.addEventListener("click", quantityHandler)
    btnCartPurchase.addEventListener("click", completePurchase)
                        // ---------------- LISTENERS DE LA SECCION CONTACT US ----------------  //
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm()
    }) // Listener del formulario de la section de ContactUs. Prevengo el comportamiento default y valido el formulario.
    inputName.addEventListener("input", () => checkTextInput (inputName))
    inputLastName.addEventListener("input", () => checkTextInput (inputLastName)) 
    inputEmail.addEventListener("input", () => checkEmail(inputEmail))
    inputTextArea.addEventListener("input", () => checkTextArea(inputTextArea))
};
init()