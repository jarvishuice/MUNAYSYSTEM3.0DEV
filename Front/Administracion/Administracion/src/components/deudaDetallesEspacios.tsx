import Typography from '@mui/joy/Typography';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {DetalleDeudaCliente } from '../core/Entities/clients/dedudaClientes';
import producto from "../assets/producto.png";
import { useEffect, useState } from 'react';
import { DeudasClientesEspaciosDAO } from '../core/Implements/clients/deudasClientesEspaciosDAO';
import {Cargando} from '../screens/Cargando';

const sede = localStorage.getItem("sede")??"sedes";

export function DeudasDetallesEspacios(props:any){
const [cargando,setCargando] = useState(true);
const [pedidos,setPedidos]= useState<[]|DetalleDeudaCliente[]>([])
async function DETALLESDEUDAS(idCliente:number) {
    setCargando(true)
    try {

      const controladorDeudas = new DeudasClientesEspaciosDAO();
      const data = await controladorDeudas.DetalleDeudaClientes(sede, idCliente);
      setPedidos(data);
  
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    finally{
    setCargando(false)}
    
  }
  useEffect(()=>{
    DETALLESDEUDAS(props.cliente.idCliente)
  },[props.cliente.idCliente])
 
  let total = 0
  pedidos.map((item)=>{
    total += Number(item.total);
 })

 if(cargando==false){
    return (  
        
    
    <div className="detalleDeudas">
        <div key="datosCliente">
            <Typography key={"nombreCLiente"} mt={2} color="neutral" noWrap={true} variant="plain" level="h4" >
            CLIENTE:{props.cliente.nombre.toUpperCase()}
            </Typography>
            <Typography key={"ci"} noWrap={true}color="neutral" level="h4" >CI:{props.cliente.ci}</Typography>
            <Typography key={"walletCard"} noWrap={true}color="neutral" level="h4" >Abonos:{props.cliente.abono}$</Typography>
        </div>
        <div key="deuda del cliente">
             <Typography  key={"totalOrdewn"} color="success" level="h4"> Total:{total-props.cliente.abono}$</Typography>

        </div>
        <center>
            <List sx={{bb:1}} key="detallesDeuda" className="detaleDeudasInterno">
                {pedidos.map((items: DetalleDeudaCliente) => {
                    return <ListItem className="itemsDetalle"   color="primary" key={items.idOrden}>
                       {/**
                        * imagen del producto 
                        */
                       }
                        <ListItemAvatar>
                            <Avatar src={producto} sx={{ backgroundColor: "green", color: "#fffff" }}>

                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={items.producto} secondary={` \tcantidad:${items.cantidad} \t \t total:${(items.precio * items.cantidad).toFixed(2)}$ #orden:${items.idOrden} `} />
                        
                    </ListItem>
                })}


            </List> </center>


        
        </div>
    )}
  else{
  return(<Cargando/>)
  }



}