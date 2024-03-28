import { useEffect, useState } from 'react';
import producto from '../../../assets/producto.png';
import {Cargando} from "../../../screens/Cargando";
import { BotonesCategoriasEspacios } from './botonesCategoria';
import { ProductosEntity } from '../../../core/Entities/productos/productos';
import { ProductosEspaciosDAO } from '../../../core/Implements/productos/productosEspaciosDAO';
import { CardProduct } from '../../../components/card';
const imagen = producto;
const sede  = localStorage.getItem("sede")??"inicia seccion"
export function CardShopEspacios(props:any){
const [loanding,setLoading] = useState(false);   
const [categoria,setCategoria] = useState<string>("oficinas")
const [productos,setProductos] = useState<[] | ProductosEntity[]>([]);
async function getProductos(categoria: string): Promise<void> {
    setLoading(true)
    try {
        const ControladorProductos = new ProductosEspaciosDAO()

        const data = await ControladorProductos.ProductosByCategoriaandSede((categoria), sede);
        //  alert("Busqueda"+categoria);
        setProductos(data)
        
    }
    catch (error) {

        console.error(error);

    }
    finally{
    setLoading(false);
    }
}
useEffect(() => {
    getProductos(categoria);
}, [categoria]);
if (loanding){
    return(<Cargando/>)
}
return(
    <div className="contenedorPOS">
        <div className="botonesCategorias">
            <BotonesCategoriasEspacios accion={setCategoria}/>

        </div>
        <div className="contenedor">
        {productos.map((items: ProductosEntity) => {
                    {items.cantidad = 1}
                    return (
                        <CardProduct 
                            key={items.id} 
                            imagen={items.urlimagen ?? imagen} 
                            titulo={items.nombre} 
                            precio={items.precio}
                            producto={items} 
                            accion ={props.insertarProducto}/>)
                })}

        </div>
    </div>
    )

}