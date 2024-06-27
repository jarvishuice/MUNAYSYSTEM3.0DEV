import { Button } from "@mui/joy";
import React from "react";
import { ProductosEspaciosDAO } from "../../../core/Implements/productos/productosEspaciosDAO";
import { ProductosEntity } from "../../../core/Entities/productos/productos";



export function FormCreateProduct() {
    async function createProduct(producto:ProductosEntity){

        try {
            const ControladorProductos = new ProductosEspaciosDAO();
            const data = await ControladorProductos.createProducto(producto);
            
           
            //alert(" Producto creado con exito"+`${data}`);
            console.log(`este es el resultado del request -> ${JSON.stringify(data)}`);
            data as ProductosEntity|boolean ;
            if (data === false) {
                alert("Error al crear el producto ")}
            else{
                alert(" Producto creado con exito !!!" );
            window.location.reload();    
            } 
            
            
            return data
    
        } catch (error) {
            console.error(error);
            return null
    
        }

    }    
    

    const categorias = ['oficinas', 'sala', 'espaciosCompartidos', 'daypass', 'escritorios'];
    const [nombre, setNombre] = React.useState("")
    const changeNombre = (e: React.ChangeEvent<HTMLInputElement>) => { setNombre(e.target.value) }
    const [precio, setPrecio] = React.useState<Number | null>();
    const changePrecio = (e: React.ChangeEvent<HTMLInputElement>) => { setPrecio(Number(e.target.value)) }
    const [CATEGORIA, setCategoria] = React.useState<String | null>("Categoria");
    const changeCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => { setCategoria(e.target.value) }
    
    return (

        <div className="form-group col-sm-12">
            <label>NOMBRE</label>
            <input placeholder="ingrese el nombre del producto" value={nombre} onChange={changeNombre} className="form-control w-5 mt-2" type="text" />
            <label>PRECIO</label>
            <input placeholder="0.00" value={Number(precio)} onChange={changePrecio} className="form-control w-5 mt-2" type="number" />
            <label>CATEGORIA</label>
            <select onChange={changeCategoria} className="form-control w-5 mt-2">
                <option value="vacio"> Selecione  la categoria</option>
                {
                    categorias.map((categoria, index) => {
                        return <option value={categoria} key={index}>{categoria}</option>
                    })
                }
            </select>

            <Button onClick={()=>{
                createProduct({
                    id:30000,
                    nombre:nombre,
                    urlimagen:" ",
                    precio:Number(precio),
                    cantidad:1,
                    tipo:String(CATEGORIA)??" ",
                    almacen:localStorage.getItem("sede")??"sede",

                })
            }}
                disabled={CATEGORIA === "Categoria" || CATEGORIA === "vacio" || precio === null || nombre === ""}
                className="form-control w-5 mt-2"
                color="primary">
                CREAR
            </Button>
        </div>
    )


}