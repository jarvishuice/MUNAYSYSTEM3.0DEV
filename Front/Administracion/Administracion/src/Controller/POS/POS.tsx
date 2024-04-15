import { CardShop } from "./cards";
import {Carrito} from "../../components/carrito";
import { useState } from "react";
import { ProductosEntity } from "../../core/Entities/productos/productos";
 
export function CoffeShopPOS(){
    const [pedidos,setPedidos]=useState<ProductosEntity[]>([])
    const insertarPedidos=(pedidoNew:ProductosEntity)=>{
     const pedidoExiste = pedidos.find(items => items.id === pedidoNew.id);
     if (pedidoExiste){
       const pedidoNuevo = pedidos.map(item=>{
         if(item.id ===pedidoNew.id){
           return {
             ...item,cantidad:item.cantidad + 1
           };
         }
         return item
       });
       setPedidos(pedidoNuevo)
     } else{
       setPedidos([...pedidos,pedidoNew])
     }
   
    };
   
  const incrementoProducto=(item:ProductosEntity)=>{
  
    insertarPedidos(item)


  }



  const descremento = (pedidoNew: ProductosEntity) => {
    const pedidoExiste = pedidos.find(items => items.id === pedidoNew.id);
    if (pedidoExiste) {
      const pedidoNuevo = pedidos.map(item => {
        if (item.id === pedidoNew.id) {
           item.cantidad - 1;
          return {
            ...item,cantidad:item.cantidad -1
          };
        }
        return item;
      }).filter(item => item.cantidad > 0); // Utiliza filter() para eliminar los elementos null
  
      setPedidos(pedidoNuevo);
    } else {
      setPedidos([...pedidos, pedidoNew]);
    }
  };
  const limpiar = ()=>{
    setPedidos([])
  }
  
    
    return(<div className="pos">
        <CardShop  insertarProducto={insertarPedidos}></CardShop>
        <Carrito style={{position:"sticky"}}  pedidos={pedidos} aumento={incrementoProducto} limpiar={limpiar} descremento={descremento} Cliente="jarvis huice "></Carrito>
        </div>
    )



}