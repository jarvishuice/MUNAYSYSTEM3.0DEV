import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";

import { IUser } from "../../Interfaces/user/IUser";
import { UsersEntity } from "../../Entities/users/userEntity";

export class UserDAO extends (IUser) {
    private paths = new PATHMUNAYSYSY()
    private API = this.paths.PathAPI()
    private prefijo = 'User'
    private headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    constructor() {
        super();
        console.log("nueva instancia de UserDAO ")
        this.paths = new PATHMUNAYSYSY()

    }


    async createuser(User: UsersEntity): Promise<UsersEntity | null> {
        try {
            const response = await fetch(`${this.API}${this.prefijo}/`, { method: "POST", headers: this.headers, body: JSON.stringify(User) });
            if (response.ok) {

                const data = await response.json();
                console.log(data)
                return data as UsersEntity;
            } if (response.status == 404) {
                alert("No se ha podido conectar con el servidor ")
                return null;
            }
            if (response.status == 400) {
                alert(response.statusText)
                return null;
            }
            if (response.status == 401) {
                localStorage.clear()
                window.location.href = "/index.html"
                return null
            }
            else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.error(error);
            return null;
        }



    }
  async  getAllUsers(): Promise<UsersEntity[]|[]> {
        try {
            const response = await fetch(`${this.API}${this.prefijo}/all`, { method: "GET", headers: this.headers, });
            if (response.ok) {

                const data = await response.json();
                console.log(data)
                return data as UsersEntity[];
            } if (response.status == 404) {
                alert("No se ha podido conectar con el servidor ")
                return [];
            }
            if (response.status == 400) {
                alert(response.statusText)
                return [];
            }
            if (response.status == 401) {
                localStorage.clear()
                window.location.href = "/index.html"
                return []
            }
            else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.error(error);
            return [];
        }



    }

    updateUser(User: UsersEntity): Promise<UsersEntity[]> {
        throw new Error(JSON.stringify(User));
    }

}

