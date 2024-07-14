import { useState, useEffect } from "react";
import { OrdenesDAO} from "../../core/Implements/Ordenes/ordenesDAO";
import { OrdenesDetalladasEntity } from "../../core/Entities/ordenes/ordenesEntity";
import { GraficoLinea } from "../../components/graficos/graficoLinea";
import {Cargando}  from "../../screens/Cargando"
export function OrdenesTodayCoffe(){
    const sede= localStorage.getItem('sede')??"jalisco"
    const [cargando,setCargando] =useState(false)

   // ordenes de espacios 
    const [ordenes,setOrdenes]= useState<OrdenesDetalladasEntity[]|[]>([]);

    async function getOrdenes():Promise<void>{
      try{  const ControladorOrdenesEspacios = new OrdenesDAO()
        const data = await ControladorOrdenesEspacios.ordenesToday(sede)
        setOrdenes(data.sort((a,b)=> a.hora.localeCompare(b.hora )))}  // se ordena el array de manera hacendente par QUE MUESTRA LA ULTIMA ORDEN AL FINAL 
        catch (error) {
            console.error(error);
          }finally{
        setCargando(false)}
    }
    useEffect(()=>{
        getOrdenes();
    },[]);
    //==============================================================================================================
    
if(cargando ==false){
return(
    <GraficoLinea  ejex={ ordenes.map((orden)=>(orden.hora))} etiqueta="ordenes Coffeshop " area={true} ejey={ordenes.map((orden)=>orden.total)} Nombre="Ventas del dia espacios " color="blue"> 

    </GraficoLinea>
  

)}
else{
return <Cargando/>}
}