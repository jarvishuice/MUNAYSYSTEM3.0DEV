import Typography from '@mui/joy/Typography';

import { BusquedaCliente } from "./BusquedaCliente"
import Add from '@mui/icons-material/Add';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import producto from "../assets/producto.png";
import { useState,useEffect } from 'react';
import { WalletDAO } from '../core/Implements/wallet/walletDAO';
import { ClientesEntity } from '../core/Entities/clients/clients';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { OrdenesEntity } from '../core/Entities/ordenes/ordenesEntity';
import { PedidosEntity } from '../core/Entities/pedidos/pedidosEntity';
import { OrdenesDAO } from '../core/Implements/Ordenes/ordenesDAO';
import { ProductosEntity } from '../core/Entities/productos/productos';
import CircularProgress from '@mui/material/CircularProgress';
const sede = localStorage.getItem("sede")??"sede";
export function Carrito(props: any) {

    const [cargando,setCargando]= useState(false)

   //estado seleccion cliente para renderizar en el carrito 
 const [cliente,setCliente]=useState<ClientesEntity>({
    "id": 0,
    "nombre": "seleccione un cliente",
    "apellido": "",
    "correo": "clientecontado@gmail.com",
    "tlf": "",
    "fechaingreso": "2022-10-25 14:39:01",
    "fechacambio": null,
    "codigo": null,
    "credito": null,
    "ci": "10000002",
    "identificacion": "",
    "direccion": "Caracas null",
    "deuda": null
  }
    )
   //====================================================================================
  const seleccionarCliente=(client:ClientesEntity) =>{
    setCliente(client)
 
    }
  //consulta salod wallet 
    const[wallet,setWallet] = useState<number>(0);
    useEffect (()=>{
      async function fecthWallet(idCliente:number) {
          try {
              const controladorWallet = new WalletDAO();
              const data = await controladorWallet.consultasaldoWallet(idCliente??0);
              
              setWallet(data);
            } catch (error) {
              console.error(error);
            }
      }
      fecthWallet(cliente.id);
    },[cliente.id??0]);
   //========================================================================================= 

   //controlador de ordenes ==================================================================
   async function crearOrden (ordenData:OrdenesEntity,pedido:PedidosEntity[]){
    try { 
        setCargando(true)
      const controladorOrdenes = new OrdenesDAO();
      const data = await controladorOrdenes.crearOrden(ordenData,pedido);

      if (data != null ){
        if(data.status ==='pagado'){
        alert( `Orden creada y pagada con el wallet  bajo el # ${data.id} `);
          //window.location.reload()
        }
        else{
          alert(`Orden creada con exito bajo el #${data.id}`)
         // window.location.reload()
        }
      }
      setCargando(false)
    } catch (error) {
        setCargando(false)
      console.error(error);
    }
    finally{
        setCargando(false)
        props.limpiar()
        setCliente({
            "id": 0,
            "nombre": "seleccione un cliente",
            "apellido": "",
            "correo": "clientecontado@gmail.com",
            "tlf": "",
            "fechaingreso": "2022-10-25 14:39:01",
            "fechacambio": null,
            "codigo": null,
            "credito": null,
            "ci": "10000002",
            "identificacion": "",
            "direccion": "Caracas null",
            "deuda": null
          })
    }
  
  
  
  }
   
   //======================================================================================
//convertir productos a pedidos

/**
 * Esta funcion lo que hace es extraer todo los elementos de  la lsita 
 * @props.pedidos.prodctos y lo convieeter en @pedidosEntity
 */
function llenarLista(){
    const ListaPedidos:PedidosEntity[]=[]
    props.pedidos.map((items:ProductosEntity)=>(
      ListaPedidos.push({
      
        idOrden: "ss",
        idProducto: items.id,
        cantidad: items.cantidad,
        total: items.cantidad * items.precio,
      })
     ))
    return ListaPedidos}
//===========================================================================================

    let total=0;
    props.pedidos.map((items:any)=>
    total += items.cantidad * items.precio)
    

   
    return (
        <div style={{position:"sticky"}} className="carrito">
            <BusquedaCliente select={seleccionarCliente} />
            <div className="clienteCarrito"><center>
                <Typography key={"nombreCLiente"} mt={2} color="neutral" noWrap={true} variant="plain" level="h4" >
                CLIENTE:{cliente.nombre.toUpperCase()}
                </Typography>
            <Typography key={"ci"} noWrap={true}color="neutral" level="h4" >CI:{cliente.ci}</Typography>
            <Typography key={"walletCard"} noWrap={true}color="neutral" level="h4" >WALLET:{wallet.toFixed(2)??0.00}$</Typography>
            
            </center></div>
            <div>
             <Typography  key={"totalOrdewn"} color="success" level="h4"> TOTAL:{total.toFixed(2)}$</Typography>

            </div>
            <center> <List className="pedidos">
                {props.pedidos.map((items: any) => {
                    return <ListItem  className="itemsCarrito" color="primary" key={items.idProducto}>
                       {/**
                        * imagen del producto 
                        */
                       }
                        <ListItemAvatar>
                            <Avatar src={items.urlimagen ?? producto} sx={{ backgroundColor: "green", color: "#fffff" }}>

                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={items.nombre} secondary={` cantidad:${items.cantidad} total:${(items.precio * items.cantidad).toFixed(2)}$ `} />
                        <ListItemAvatar>
                            <Avatar onClick={()=>props.aumento(items)} sx={{ backgroundColor: "green", color: "#fffff" }}>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Avatar onClick={() => props.descremento(items)} sx={{ backgroundColor: "red", color: "#fffff" }}>
                                <RemoveIcon />
                            </Avatar>
                        </ListItemAvatar>
                    </ListItem>
                })}


            </List> </center>
            {(total >=0.1 && cliente.id !=0?<center><Button disabled={(cargando ==false)?false:true} variant="contained"  
                                        sx={{marginTop:"10px",width:"250px",}} onClick={()=>crearOrden({
                                            id:"x",
                                            total:Number(total),
                                            sede:String(sede),
                                            fechaPedido:"n",
                                            fechaPago:"n",
                                            status:"por pagar",
                                            idCliente:Number(cliente.id),
                                            tipoPago:"",
                                            idPago:""

                                        },llenarLista())}> 
                                        {(cargando ==false)?"CREAR ORDEN":<CircularProgress  color="inherit"/>} 
                                        </Button>
                        </center>:<Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
Seleccione un Cliente y  Producto

    </Alert>)}
            

        </div>)
}