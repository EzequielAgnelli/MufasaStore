// DOM
const form = document.getElementById("form")
const inputName = document.getElementById("nombre")
const inputLastName = document.getElementById("apellido")
const inputEmail = document.getElementById("email")
const inputPhoneNumber = document.getElementById("phone")
const inputPassword = document.getElementById("password")


// Funciones auxiliares.
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const saveInLocalStorage = () => {
        localStorage.setItem("users", JSON.stringify(users))
    }

const isEmpty = (input) => {
    return !input.value.trim().length
};

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max
};

const validEmail = (input) => {
    const regularExpression = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    return regularExpression.test(input.value)
}

const showError = (input, message) => {
    const formField = input.parentElement; 
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error")
    form.classList.add("success")
    const error = formField.querySelector("small")
    error.textContent = ""
}

const validPhone = (input) => {
    const re =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im // re (Regular Expression)
    return re.test(input.value)
}

const validPassword = (input) => {
    const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return rePassword.test(input.value)
}

// Chequear nombre y apellido.
const checkTextInput = (input) => {
    let valid = false
    const minCharacters = 4
    const maxCharacters = 20

    if(isEmpty(input)) {
        showError(input, "Este campo es obligatorio.");
        return
    };
    if(!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe de tener entre ${minCharacters} y ${maxCharacters} caracteres.`);  
        return
    }
    showSuccess(input)
    valid = true
    return valid
};

// Chequear el email
const checkEmail = (input) => {
    let valid = false
    if(isEmpty(input)) {
        showError(input, "Este campo es obligatorio.")
        return

    }
    if(!validEmail(input)) {
        showError(input, "Este email no es valido o ya esta en uso.")
        return;
    }
    showSuccess(input)
    valid = true
    return valid
};

// Chequear el numero de telefono.
const checkPhoneNumber = (input) => {
    let valid = false
    console.log()
    if(isEmpty(input)) {
        showError(input, "Este campo es obligatorio.")
        return
    }
    if(!validPhone(input)) {
        showError(input, "Este numero de telefono no es valido.")
        return
    }
    showSuccess(input)
    valid = true
    return valid
};

// Chequear la contraseña.
const checkPassword = (input) => {
    let valid = false 

    if(isEmpty(input)) {
        showError(input, "Este campo es obligatorio.");
        return
    };

    if(!validPassword(input)) {
        showError(input, "La contraseña debe tener al menos 8 caracteres, una mayúscula y una minúscula")
        return
    }
    showSuccess(input)
    valid = true
    return valid
};

const validateForm = () => {
        const validatedName = checkTextInput(inputName)
        const validatedLastName = checkTextInput(inputName)
        const validatedEmail = checkEmail(inputEmail)
        const validatedPhoneNumber = checkPhoneNumber(inputPhoneNumber)
        const validatedPassword = checkPassword(inputPassword)

        let validateForm =
        validatedName && validatedLastName && validatedEmail && validatedPhoneNumber && validatedPassword

        if(validateForm) {
            users.push({
                name: inputName.value,
                lastName: inputLastName.value,
                email: inputEmail.value,
                phoneNumber: inputPhoneNumber.value,
                password: inputPassword.value,
            });
            saveInLocalStorage(users);
            alert("Te registraste con exito")
            window.location.href = "/Login-Register-pages/log-in.html"
        };
}
const init = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm()
    })
    inputName.addEventListener("input", () => checkTextInput(inputName))
    inputLastName.addEventListener("input", () => checkTextInput(inputLastName))
    inputEmail.addEventListener("input", () => checkEmail(inputEmail))
    inputPhoneNumber.addEventListener("input", () => checkPhoneNumber(inputPhoneNumber))
    inputPassword.addEventListener("input", () => checkPassword(inputPassword))
}

init()