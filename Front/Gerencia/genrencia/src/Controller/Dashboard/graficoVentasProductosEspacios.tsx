import { useState, useEffect } from "react";
import { GraficoTorta } from "../../components/graficos/graficoTorta";
import { VentasProductosEntity } from "../../core/Entities/metric/coffeshop/MetricCoffeshopEntity";
import {MetricEspaciosDAO} from "../../core/Implements/metric/espacios/MetricEspaciosDAO";
import {Cargando}  from "../../screens/Cargando"


export function ProductosVendidosEspacios(){
    const sede= localStorage.getItem('sede')??"jalisco"
    const [cargando,setCargando] = useState(true)
    // ventas por productos 
     const [ventas,setVentas]= useState<VentasProductosEntity[]|[]>([]);
     async function getVentas():Promise<void>{
       try{  const ControladorMetricas = new MetricEspaciosDAO()
         const data = await ControladorMetricas.VentasProductos(sede)
         
         setVentas(data)}
         catch (error) {
             console.error(error);
           }
        finally{
        setCargando(false)}
     }
     useEffect(()=>{
         getVentas();
     },[]);
     //==============================================================================================================
     console.log(`ventas del dia ${ventas}`);

     
 if(cargando==false){
 return(
     <GraficoTorta   Nombre="ventas del dia  " datos={ ventas.map((items)=>({nombre:items.nombre,valor:items.total}))}> 
 
     </GraficoTorta>
   
 
 )}
 else{
return(<Cargando/>)
}



}