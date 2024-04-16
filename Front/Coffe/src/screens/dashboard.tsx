import { OrdenesToday } from "../Controller/Dashboard/graficoOrdenesToday";

import {OrdenesTodayCoffe} from "../Controller/Dashboard/graficoOrdenesTodayCoffe";
import {ProductosVendidosCoffeshop} from "../Controller/Dashboard/graficoVentasProductosCoffeshop"
import {ProductosVendidosEspacios} from "../Controller/Dashboard/graficoVentasProductosEspacios"

export function Dashboard(){
    return(<div>
        <div className="dashboard">
           
            <OrdenesToday></OrdenesToday>
            <ProductosVendidosEspacios/>
           
        </div>
        
         <div className="dashboard"><OrdenesTodayCoffe></OrdenesTodayCoffe>
         <ProductosVendidosCoffeshop></ProductosVendidosCoffeshop></div></div>
    )
}