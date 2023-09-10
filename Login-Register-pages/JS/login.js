// DOM
const form = document.getElementById("form")
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const errorMessage = document.getElementById("message")

// Funciones auxiliares
const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToSessionStorage = (user) => {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
}

const isEmpty = (input) => {
    return !input.value.trim().length
};

const emailExists = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const passwordExists = (input) => {
    const user = users.find((user) => user.email === inputEmail.value.trim());
    return user.password === input.value.trim();
}

const showError = (message) => {
    errorMessage.textContent = message;
}

const  validAccount = () => {
    let valid = false 

    if(isEmpty(inputEmail)) {
        showError("Complete los datos requeridos.")
        return
    }
    if(!emailExists(inputEmail)) {
        showError("Los datos ingresados no son validos.")
        return
    }
    if(isEmpty(inputPassword)) {
        showError("Complete los datos requeridos.")
        return
    }
    if(!passwordExists(inputPassword)) {
        showError("Los datos ingresados no son validos.")
        form.reset();
        return valid;
    }
    alert("Te loggeaste con exito.")
    valid = true
    errorMessage.textContent = "";
    form.reset
    return valid
};


const login = (e) => {
    e.preventDefault(e)
    if(validAccount()) {
        const user = users.find((user) => user.email === inputEmail.value.trim());
        saveToSessionStorage(user)
        window.location.href = '/index.html'
    }
}

// Funcion inicializadora con los listeners
const init = () => {
    form.addEventListener("submit", login)
    // inputEmail.addEventListener("input", () => checkEmail(inputEmail))
    // inputPassword.addEventListener("input", () => checkPassword(inputPassword))
}
init()