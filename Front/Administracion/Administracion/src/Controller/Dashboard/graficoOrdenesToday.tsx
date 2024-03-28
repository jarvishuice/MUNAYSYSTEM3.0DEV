import { useState, useEffect } from "react";
import { OrdenesEspaciosDAO} from "../../core/Implements/Ordenes/OrdenesEspaciosDAO";
import { OrdenesDetalladasEntity } from "../../core/Entities/ordenes/ordenesEntity";
import { GraficoLinea } from "../../components/graficos/graficoLinea";
import {Cargando} from "../../screens/Cargando";
export function OrdenesToday(){
    const [cargando,setCargando] = useState(false)
    const sede= localStorage.getItem('sede')??"jalisco"
   
   // ordenes de espacios 
    const [ordenes,setOrdenes]= useState<OrdenesDetalladasEntity[]|[]>([]);
    async function getOrdenes():Promise<void>{
     setCargando(true)
      try{  const ControladorOrdenesEspacios = new OrdenesEspaciosDAO()
        const data = await ControladorOrdenesEspacios.ordenesToday(localStorage.getItem('sede')??"jalisco")
        setOrdenes(data.sort((a,b)=> a.hora.localeCompare(b.hora )))}
        catch (error) {
            console.error(error);
          }
      finally{
    setCargando(false)
    }
    }
    useEffect(()=>{
        getOrdenes();
    },[]);
    //==============================================================================================================
    console.log(ordenes+sede);

    if (cargando==false){
    return(

    <GraficoLinea  ejex={ ordenes.map((orden)=>(orden.hora))} etiqueta="ordenes Espacios " area={true} ejey={ordenes.map((orden)=>orden.total)} Nombre="Ventas del dia espacios " color="green"> 

    </GraficoLinea>
  

)}
else{
return <Cargando/>}

}