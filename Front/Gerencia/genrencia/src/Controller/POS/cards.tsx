import { useEffect, useState } from "react";
import { CardProduct } from "../../components/card";
import { ProductosDAO } from "../../core/Implements/productos/productosDAO";
import { ProductosEntity } from "../../core/Entities/productos/productos";
import { BotonesCategorias } from "./botonesCategoria";
import { Cargando } from "../../screens/Cargando"
import producto  from '../../assets/producto.png'
import { BuscadorProductos } from "../../components/BuscadorProductos";
/**
 * contenedor de las tarjetas del pos de coffeshop
 * @date 14/2/2024 - 11:28:43 a. m.
 * 
 * @export
 * @returns {*}
 */
export function CardShop(props:any): any {
    const imagen = producto
    const sede = localStorage.getItem('sede') ?? "jalisco";
    const [categoria, setCategoria] = useState<string>("cafe");
    function insertarCategoria(categoria: string) {
       
        setCategoria(categoria);
    }
    /*
    * este estado se encarga de mostrar el componente loading mientras que 
    * llegue la data del API
     */
    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState<[] | ProductosEntity[]>([])
    async function getProductos(categoria: string): Promise<void> {

        try {
            const ControladorProductos = new ProductosDAO()

            const data = await ControladorProductos.ProductosByCategoriaandSede((categoria), sede);
            //  alert("Busqueda"+categoria);
            setProductos(data)
            setLoading(false)
        }
        catch (error) {

            console.error(error);

        }
    }
    useEffect(() => {
        getProductos(categoria);
    }, [categoria]);
    if (loading) {
        return <Cargando />;
    }

    return (
        <div className="contenedorPOS" >
            <div className="botonesCategorias"><BuscadorProductos accion={props.insertarProducto}/> </div>
            <div className="botonesCategorias"><BotonesCategorias accion={insertarCategoria} /></div>
            <div className="contenedor">


                {productos.map((items: ProductosEntity) => {
                    {items.cantidad = 1}
                    return (<CardProduct 
                    key={items.id} 
                    imagen={items.urlimagen ?? imagen} 
                    titulo={items.nombre} 
                    precio={items.precio}
                    producto={items} 
                    accion ={props.insertarProducto}/>)
                })}
            </div>
        </div>)
}