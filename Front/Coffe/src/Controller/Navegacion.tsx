import {SideBar} from "../components/SideBar"

import {useState} from "react";
//import {ItemsSideBar} from '../components/itemsSideBar';
//import { ItemsCoffeshop } from "../components/itemsCoffeshop";
import { Dashboard } from "../screens/dashboard";
const imgenPerfil = localStorage.getItem("fotoPerfil")  ?? "x"
const usuario = localStorage.getItem("usuario")?? "nest"
const sede = localStorage.getItem('sede')??'ddd'
export function Navegacion(){
    const [componente,setComponete] = useState(<Dashboard></Dashboard>)

    function Router(comp:any){
      setComponete(comp);
    }
    
    return (<div className="navegacion"><SideBar  sede={sede} usuario={usuario} child={componente} hijo={Router} imagenPerfil = {imgenPerfil}>
      
    </SideBar>
      </div>)
}