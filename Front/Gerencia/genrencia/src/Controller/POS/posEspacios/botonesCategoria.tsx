import { BotonesGroup } from "../../../components/bortonesGroup";
export function BotonesCategoriasEspacios(props:any){
const botones = [
    {id:1,valor:"daypass",nombre:"Daypass"},
    {id:2,valor:"escritorios",nombre:"Escritorios"},
    {id:3,valor:"espaciosCompartidos",nombre:"Espacios Compartidos"},
    {id:4,valor:"oficinas",nombre:"Oficinas"},
    {id:5,valor:"sala",nombre:"Salas"}
                ]
    return(<BotonesGroup botones={botones} accion={props.accion}/>)            


}