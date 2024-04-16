import { ItemOnlySideBar } from "./itemOnlySideBar"
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { ItemsSideBar } from './itemsSideBar';
import CoffeeIcon from '@mui/icons-material/Coffee';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import SavingsIcon from '@mui/icons-material/Savings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function POS(){
    return(<ItemOnlySideBar ruta="coffePOS☕" key={"pos"} icon={<AddBusinessIcon/>} Nombre ="POS"></ItemOnlySideBar>)

}
function ORDENES(){
    return(<ItemOnlySideBar ruta="ordenes/coffe" key="ordenes" icon={<RequestQuoteIcon/>} Nombre ="ORDENES"></ItemOnlySideBar>)
}
function PAGOS(){
    return(<ItemOnlySideBar ruta='pagos/coffe' key="pagos" icon={<SavingsIcon/>} Nombre ="PAGOS"></ItemOnlySideBar>)
}
function DEUDAS(){
    return(<ItemOnlySideBar ruta='deudas/coffe' key="DEUDAS" icon={<CreditCardOffIcon/>} Nombre ="DEUDAS"></ItemOnlySideBar>)

}
function REPORTES(){
    return(<ItemOnlySideBar ruta='reporte/coffe' key="Reportes" icon={<ReceiptIcon/>} Nombre ="REPORTES"></ItemOnlySideBar>)
}
function WALLET(){
return (<ItemOnlySideBar ruta='wallet/coffe' key="WALLET-cooffer" icon={<AccountBalanceWalletIcon/>} Nombre ="WALLET"> </ItemOnlySideBar>)
}

/**
 * Description placeholder
 * @date 4/3/2024 - 2:37:03 p. m.
 *
 * @export
 * @returns {*}
 */
export function ItemsCoffeshop(): any{

    return (<ItemsSideBar Nombre="COFFESHOP" icon={<CoffeeIcon/>} childs={[<POS/>,<ORDENES/>,<PAGOS/>,<DEUDAS/>,<REPORTES/>,<WALLET></WALLET>]}/>)

    
}