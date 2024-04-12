
import producto from "../assets/producto.png";
import { Button, Input } from "@mui/joy";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

import { ProductosEntity } from "../core/Entities/productos/productos";
import { ProductosEspaciosDAO } from "../core/Implements/productos/productosEspaciosDAO";
export function BuscadorProductosEspacios(props:any){
   const [nProducto,setNproducto]= React.useState(" ")
   function cambioNombreProducto(e:React.ChangeEvent<HTMLInputElement>){
setNproducto(e.target.value)
}
const [productos,setProductos]= React.useState<ProductosEntity[]|[]>([])
const [mostrar,setMostrar]= React.useState(false)
async  function  buscar(nombre:string){
    try {
  
      const ControladorProductos= new ProductosEspaciosDAO();
      const data = await ControladorProductos.BuscarProductos(nombre);
      
      setProductos(data);
      setMostrar(true);
      
    } catch (error) {
      console.error(error);
    }
  };


   
    return(
            <div>
                <div className="buscador">
                    <div className="input-group mb-3">
                         <Input  onChange={cambioNombreProducto} placeholder="Busqueda Productos" sx={{ '--Input-focused': 1, width: "70%" }}/>
                        <Button  onClick={()=>buscar(nProducto)} color="primary"  className="input-group-text" id="basic-addon1">Buscar</Button>
                    </div>
                   {mostrar==true? <List sx={{ width: '100%', maxWidth: 360, }}>
                    {productos.map((items: ProductosEntity) => {
                        //se inicializa la cantidad en uno para que cuando se cargue en pedido sea 1 
                        items.cantidad = 1
                        return(
                        <ListItem  onClick={()=> {props.accion(items),setMostrar(false)}} className="itemsCarrito" color="primary" key={items.id}>
                      
                            <ListItemAvatar>
                                <Avatar src={items.urlimagen ?? producto} sx={{ backgroundColor: "green", color: "#fffff" }}>

                                </Avatar>
                            </ListItemAvatar>
                           <ListItemText primary={items.nombre} secondary={`${items.precio}$`} />
                            
                       
                    </ListItem>)})}



                    </List>:""}

                </div>
            </div>        
        )
    
    
    
}