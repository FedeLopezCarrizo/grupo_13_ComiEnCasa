const email = document.querySelector('.input__email');

let errores = {}
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}   

email.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

function checkInputs() {
    const emailValue = email.value.trim();
    
    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es valido')
    } else {
        setSucces(email)
    }
    console.log(errores);

}

function setError(input ,message){
    let divLogin = input.parentElement
    let small = divLogin.querySelector('small')
    
    small.innerText = message
    divLogin.className = 'div__login error'
    errores[input.name] = message 
 
}

function setSucces(input) {
    let divLogin = input.parentElement
    let small = divLogin.querySelector('small')
    
    divLogin.className = 'div__login succes'
    small.innerText = ''
    
    delete errores[input.name] 
}