
import { ItemOnlySideBar } from "./itemOnlySideBar"
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { ItemsSideBar } from './itemsSideBar';

import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import SavingsIcon from '@mui/icons-material/Savings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
function POS(){
    return(<ItemOnlySideBar ruta="espaciosPOS" key={"posSpace"} icon={<AddBusinessIcon/>} Nombre ="POS"></ItemOnlySideBar>)

}
function ORDENES(){
    return(<ItemOnlySideBar ruta="ordenes/espacios" key="ordenesSpace" icon={<RequestQuoteIcon/>} Nombre ="ORDENES"></ItemOnlySideBar>)
}
function PAGOS(){
    return(<ItemOnlySideBar ruta='pagos/espacios' key="pagosSpace" icon={<SavingsIcon/>} Nombre ="PAGOS"></ItemOnlySideBar>)
}
function DEUDAS(){
    return(<ItemOnlySideBar ruta='deudas/espacios' key="DEUDASpace" icon={<CreditCardOffIcon/>} Nombre ="DEUDAS"></ItemOnlySideBar>)

}
function REPORTES(){
    return(<ItemOnlySideBar ruta='reporte/espacios' key="ReportesSpace" icon={<ReceiptIcon/>} Nombre ="REPORTES"></ItemOnlySideBar>)
}
function PRODUCTOS(){
    return(<ItemOnlySideBar ruta='productos/espacios' key="ProductosSpace" icon={<ProductionQuantityLimitsIcon/>} Nombre ="PRODUCTOS"></ItemOnlySideBar>)
}


/**
 * Items completos de los espacios 
 * @date 6/3/2024 - 10:15:06 a. m.
 *
 * @export
 * @returns {*}
 */
export function ItemsEspacios(): any{

    return (<ItemsSideBar Nombre="ESPACIOS" icon={<HomeWorkIcon/>} childs={[<POS/>,<ORDENES/>,<PAGOS/>,<DEUDAS/>,<REPORTES/>,<PRODUCTOS/>]}/>)

    
}