
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import {ModalDetalleDeudaEspacios} from "./modalDetalleDeudaEspacios";
import * as React from 'react';


  

/**
 * tarjeta que continene los productos 
 * @date 8/2/2024 - 1:09:50 p. m.
 *
 * @export
 * @param {*} props
 * @returns {*}
 */
export function CardDeudasEspacios(props:any): any{
  const [open,setOpen] = React.useState(false)
  const [cliente,setCliente] = React.useState({})
  function sCliente(data:any){
    setOpen(true)
    setCliente(data)
  }
    return (
     <Card sx={{marginTop:"5px"}} color="neutral" variant="outlined">
     <ModalDetalleDeudaEspacios mostrar={open} cliente={cliente} cerrar={setOpen} detalles={<h1>ddd</h1>}/>
<CardContent>
      
      <Typography level="title-md">{props.titulo.slice(0,44)}</Typography>
        <Typography>CI:{props.cedula}</Typography>
        <Typography >ID:{props.id}</Typography>
        <Typography className="informacionDeudas">
               #{props.cantidad}
        </Typography>
        <Typography color="success">DEUDA: ${props.precio}</Typography>
        <CardActions>
       

        </CardActions>

      </CardContent>
      <Button onClick={()=>sCliente(props.data)} variant="solid" color="primary" sx={{mb:"1px",posision:"absolute"}}> Detalles</Button>
    </Card>
    );


}