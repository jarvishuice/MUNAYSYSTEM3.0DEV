function inicio (){
let usuario= document.getElementById('username');
let password= document.getElementById('password');
let sede=document.getElementById('sede');

if(usuario.value==''||password.value==''){
    alert('Debe llenar todos los campos');
}
const USUARIO=usuario.value;
const PASSWORD=password.value;
const SEDE=sede.value;
const login = login(USUARIO, PASSWORD,SEDE);

}

async function login(nombreUsuario,password,sede){
    const  headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'};
    try{
    const response = await fetch(`http://191.97.17.26:8011/MUNAY/nest/Loggin/`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify({nombreUsuario:nombreUsuario,password:password,token:"string"})});
    if (response.ok){
       alert(`hola ${data.nombreUsuario} binevenido a munaysystem`);
       localStorage.setItem("sede",sede)
       window.location.href = "http://191.97.17.26:8011/v3.0/administracion/index.html";
    }
    else{
    alert(`${response.status}`)
    
    }
alert("pase") //TODO

}catch (error) {
    console.error(error);
    return null;
}




}