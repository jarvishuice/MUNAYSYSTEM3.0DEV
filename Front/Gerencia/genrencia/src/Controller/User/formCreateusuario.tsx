import { Button } from "@mui/joy";
import React from "react";
import { UsersEntity } from "../../core/Entities/users/userEntity";
import { UserDAO } from "../../core/Implements/user/userDAO";
import { Cargando } from "../../screens/Cargando";



export function FormCreateUsuario() {
    const [loading,setLoading] = React.useState(false);
    async function CreateUser(usuario: UsersEntity) {

        try { setLoading(true);
            const ControladorUsuarios = new UserDAO();
            const data = await ControladorUsuarios.createuser(usuario);


            //alert(" Producto creado con exito"+`${data}`);
            console.log(`este es el resultado del request -> ${JSON.stringify(data)}`);
            data as UsersEntity | null;
            if (data === null) {
                alert("Error al crear el usuario")
            }
            else {
                alert(" Usuario creado con exito !!!");
                window.location.reload();
            }


            return data

        } catch (error) {
            console.error(error);
            return null

        }finally{
            setLoading(false);
        }

    }



    const [nombre, setNombre] = React.useState("")
    const changeNombre = (e: React.ChangeEvent<HTMLInputElement>) => { setNombre(e.target.value) }
    const [apellido, setApellido] = React.useState("")
    const changeApellido = (e: React.ChangeEvent<HTMLInputElement>) => { setApellido(e.target.value) }
    const [ci, setCi] = React.useState("")
    const chageCi = (e: React.ChangeEvent<HTMLInputElement>) => { setCi(e.target.value) }
    const [userName, setUserName] = React.useState("")
    const chageUserName = (e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) }
    const [tipoUsuario, setTipo] = React.useState<number>(0);
    const changeTipo = (e: React.ChangeEvent<HTMLSelectElement>) => { setTipo(Number(e.target.value)) }
    //todo
    if (loading){
        return (<Cargando/>)
    }else{
    return (

        <div className="form-group col-sm-12">
            <label>NOMBRE</label>
            <input placeholder="NOMBRE" value={nombre} onChange={changeNombre} className="form-control w-5 mt-2" type="text" />
            <label>APELLIDO</label>
            <input placeholder="APELLIDO" value={apellido} onChange={changeApellido} className="form-control w-5 mt-2" type="text" />
            <label>CI</label>
            <input placeholder="12345678" value={ci} onChange={chageCi} className="form-control w-5 mt-2" type="text" />
            <label>NOMBRE USUARIO</label>
            <input placeholder={`${nombre}`} value={userName} onChange={chageUserName} className="form-control w-5 mt-2" type="text" />
            <label>TIPO DE PERFIL</label>
            <select onChange={changeTipo} className="form-control w-5 mt-2">
                <option value={0}> Selecione  el tipo de perfil</option>
                <option value={1}> BARISTA</option>
                <option value={2}> RECEPCION</option>
                <option value={3}> ADMINISTRACION</option>
            </select>

            <Button onClick={() => {
                CreateUser({
                    id: 3000,
                    nombre: nombre,
                    apellido: apellido,
                    ci: ci,
                    nombreusuario: userName,
                    password: ci,
                    token: ci,
                    status: "desconectado",
                    tipoUsuario: tipoUsuario,
                    urlImagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fusers%2F&psig=AOvVaw2t_ko_wPshpcwrgQAGTdvH&ust=1721011375990000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjuk5HBpYcDFQAAAAAdAAAAABAJ",
                    ultimaSesion: null,
                    creado: null,

                })
            }}
                disabled={tipoUsuario === 0 || apellido === null || apellido === "" || nombre === ""||ci === null || ci === ""|| userName === null || userName === ""}
                className="form-control w-5 mt-2"
                color="primary">
                CREAR
            </Button>
        </div>
    )

}
}