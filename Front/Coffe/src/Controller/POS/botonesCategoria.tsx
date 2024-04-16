import { BotonesGroup } from "../../components/bortonesGroup"

export function BotonesCategorias(props:any){
    const botones=[{id:1,valor:"cafe",nombre:"CAFE"},
    {id:2,valor:"alimentos",nombre:"ALIMENTOS"},
    {id:3,valor:"bebidas",nombre:"BEBIDAS"},
    {id:4,valor:"snack",nombre:"POSTRES"}]
return(<BotonesGroup botones={botones} accion={props.accion}></BotonesGroup>)

}