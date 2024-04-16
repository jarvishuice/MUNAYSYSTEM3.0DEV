import { ItemOnlySideBar } from "./itemOnlySideBar";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { ItemsSideBar } from './itemsSideBar';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function POS(){
    return(<ItemOnlySideBar ruta="coffePOS☕" key={"pos"} icon={<AddBusinessIcon/>} Nombre ="POS"></ItemOnlySideBar>)

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

    return (<ItemsSideBar Nombre="COFFESHOP" icon={<CoffeeIcon/>} childs={[<POS/>,<DEUDAS/>,<REPORTES/>,<WALLET></WALLET>]}/>)

    
}