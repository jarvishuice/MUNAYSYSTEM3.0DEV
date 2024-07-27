import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";
import { Iloggin } from "../../Interfaces/Loggin/Ilogin";

export class logginDAO implements Iloggin{
    private paths = new PATHMUNAYSYSY();
    private API = this.paths.PathAPI();
    private prefijo = 'Loggin/2/logout';
    private headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
async logout(): Promise<boolean> {
   
    console.log(localStorage.getItem('user'));
    let idUser = JSON.parse(localStorage.getItem("user")??JSON.stringify({"id":0,"nombre":"inicie seccion","apellido":"inicie seccion","ci":"0","nombreusuario":"0","password":"🖕","token":"ss","status":"conectado","tipoUsuario":3,"urlImagen":"djdhd"})).id;
    try {
        const response = await fetch(`${this.API}${this.prefijo}/${idUser}`, {
            method: 'POST',
            headers: this.headers,
           
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.clear();
        
            alert('ha cerrado sesion de manera sastifactoria!!!')
            window.location.href="http://191.97.17.26:8011/v3.0/login/index.html"
            return data as boolean;
        } else if (response.status == 404) {
            alert("No se ha podido conectar con el servidor ");
            return false;
        } else if (response.status == 400) {
            alert(response.statusText);
            return false;
        } else if (response.status == 422) {
            alert("unprocesable entity");
            return false;
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    finally{
        localStorage.clear()
    }
}



}