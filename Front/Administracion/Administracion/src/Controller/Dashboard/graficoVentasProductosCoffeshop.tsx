import { useState, useEffect } from "react";
import { GraficoTorta } from "../../components/graficos/graficoTorta";
import { VentasProductosEntity } from "../../core/Entities/metric/coffeshop/MetricCoffeshopEntity";
import {MetricCoffeshopDAO} from "../../core/Implements/metric/coffeshop/MetricCoffeshopDAO";
import {Cargando}  from "../../screens/Cargando"



export function ProductosVendidosCoffeshop(){
    const sede= localStorage.getItem('sede')??"jalisco"
    const [cargando,setCargando] = useState(true)
    // ventas por productos 
     const [ventas,setVentas]= useState<VentasProductosEntity[]|[]>([]);
     async function getVentas():Promise<void>{
        setCargando(true)
       try{  const ControladorMetricas = new MetricCoffeshopDAO()
         const data = await ControladorMetricas.VentasProductos(sede)
         
         setVentas(data)}
         catch (error) {
             console.error(error);
           }
           finally{setCargando(false)
        }
     }
     useEffect(()=>{
         getVentas();
     },[]);
     //==============================================================================================================
    

     
 if(cargando==false){
 return(
     <GraficoTorta   Nombre="ventas del dia  " datos={ ventas.map((items)=>({nombre:items.nombre,valor:items.total}))}> 
 
     </GraficoTorta>
   
 
 )}
 else{
return(<Cargando/>)}



}