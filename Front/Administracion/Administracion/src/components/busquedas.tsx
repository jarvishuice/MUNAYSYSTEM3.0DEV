import { useState } from "react";

export function Busqueda(props:any){
const [resultado,setResultado] = useState<[]>(props.data);
const [mostrar,setMostrar]= useState(false)

return(
    <div key="contenedor de busqueda ">
        <div key="seccion de busqueda ">
            <input type="tetx"/>
            <button>buscar</button>
        </div>
    </div>
    )

}