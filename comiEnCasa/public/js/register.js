const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userName = document.getElementById('userName');
const email = document.getElementById('email');

let errores = {}
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}   

firstName.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

lastName.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

userName.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

email.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const userNameValue = userName.value.trim();
    const emailValue = email.value.trim();
    
    if (firstNameValue === '') {
        setError(firstName,'El campo nombre no puede estar vacio')
    }else{
        setSucces(firstName)
    }

    if (lastNameValue === '') {
        setError(lastName,'El campo apellido no puede estar vacio')
    }else{
        setSucces(lastName)
    }

    if (userNameValue === '') {
        setError(userName,'El campo usuario no puede estar vacio')
    }else{
        setSucces(userName)
    }

    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es valido')
    } else {
        setSucces(email)
    }
    console.log(errores);

}

function setError(input ,message){
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    
    small.innerText = message
    formControl.className = 'form-control error'
    errores[input.name] = message 
 
}

function setSucces(input) {
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    
    formControl.className = 'form-control succes'
    small.innerText = ''
    
    delete errores[input.name] 
}