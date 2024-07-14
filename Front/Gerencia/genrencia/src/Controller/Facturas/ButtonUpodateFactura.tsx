import { IconButton } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';
import { EncabezadoFacturaEntity } from "../../core/Entities/facturas/FacturasEntity";
import { FacturasDAO } from "../../core/Implements/facturas/facturasDAO";

async function updateFactura(encabezado:EncabezadoFacturaEntity){
    
    try {
        const ControladorFacturas = new FacturasDAO();
        const data = await ControladorFacturas.updateFactura(localStorage.getItem("sede")??"sede",encabezado);
        
        return data as boolean;
       
      } catch (error) {
        console.error(error);
       return null
    
      }

}
export function ButtonUpdateFactura(props:any) {
    

    return (<IconButton 
        color="primary"
                    onClick={() => { updateFactura(props.encabezado) }}
                    disabled={parseInt(props.encabezado.status) >=2 ?true:false}>
        <SaveIcon />
    </IconButton>)

}