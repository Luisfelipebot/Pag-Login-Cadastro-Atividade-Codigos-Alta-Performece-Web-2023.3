const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const cpf = document.getElementById("cpf")
const data = document.getElementById("data")

form.addEventListener('submit', (e)=>{
    e.preventDefault() //para a página não recarregar e tirar os valores dos inputs

    checkInputs()
})

function cadastrar(){
    localStorage.setItem("username", document.querySelector("#username").value)
    localStorage.setItem("cpf", document.querySelector("#cpf").value)
    localStorage.setItem("email", document.querySelector("#email").value)
    localStorage.setItem("password", document.querySelector("#password").value)
    localStorage.setItem("password-confirmation", document.querySelector("#password-confirmation").value)
    localStorage.setItem("data", document.querySelector("#data").value)
}

function checkInputs(){ //verificando os inputs
    const storedData = localStorage.getItem('userData');
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmationValue = passwordConfirmation.value
    const specialCharRegex = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const numberRegex = /\d/;
    const cpfValue = cpf.value
    const dataValue = data.value
    //validando os dados

    if(usernameValue === ''){
        setErrorFor(username, "O nome de usuário é obrigatório.")
    }else if(username.value.length<=2){
        setErrorFor(username, "O nome de usuário deve conter no minimo 3 caracteres.")
    }else{  
        setSuccessFor(username)
    }

    if(cpfValue ===""){
        setErrorFor(cpf, "O cpf é obrigatório")
    }else if(cpfValue.length != 11){
        setErrorFor(cpf, "O cpf precisa conter 11 digítos")
    }else{
        setSuccessFor(cpf)
    }

    if(emailValue=== ""){
        setErrorFor(email,"O email é obrigatório.")
    }else if(!checkEmail(emailValue)){
        setErrorFor(email,"Insira um email válido.")
    }else{
        setSuccessFor(email)
    }

    if(dataValue===""){
        setErrorFor(data,"A data de nascimento é obrigatória")
    }else{
        setSuccessFor(data)
    }

    if(passwordValue===""){
        setErrorFor(password,"A senha é obrigatória.")
    }else if(passwordValue.length < 7){
        setErrorFor(password,"A senha deve ter no minímo 8 caracteres.")
    }else if(!specialCharRegex.test(password.value) && !numberRegex.test(password.value)){
        setErrorFor(password,'A senha deve ter no minímo um caractere especial e um número.')
    }else if(!specialCharRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um caractere especial.")
    }else if(!numberRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um número.")
    }else{
        setSuccessFor(password)
    }

    if(passwordConfirmationValue===""){
        setErrorFor(passwordConfirmation, 'A confirmação da senha é obrigatório.')
    }else if(passwordConfirmationValue!=passwordValue){
        setErrorFor(passwordConfirmation, "As senhas não conferem.")
    }else{
        setSuccessFor(passwordConfirmation)
    }

    const formControls = form.querySelectorAll(".form-control")

    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className === "form-control success"
    })

    if (formIsValid) {  
      //quando o formulario for valido ira para a pagina de login
      setTimeout(() => {
        alert("Cadastro completo!")
        window.location.href = "loginPage.html";
    }, 1000); 
}
}

function setErrorFor(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText=message //Adiciona a mensagem de erro

    formControl.className = 'form-control error' // Adiciona a classe de erro
}

function setSuccessFor(input){
    const formControl = input.parentElement
    
    formControl.className = 'form-control success' // Adicionar a classe de sucesso

    var paragraph = document.getElementById("meuParagrafo"); // seleciona o elemento do parágrafo
    paragraph.style.display = "none"; // altera a propriedade "display" do parágrafo para "none"
}
/*Sobre a função checkEmail:
*1. Deve haver pelo menos um caractere antes do "@"
*2. Deve haver pelo menos um caractere entre o "@" e o primeiro ponto
*3. Deve haver pelo menos um caractere entre o último ponto e o final do domínio
*4. O domínio deve ter pelo menos duas letras
*5. O e-mail não deve conter caracteres especiais, exceto os permitidos (pontos, traços e sublinhados)
*/
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}
