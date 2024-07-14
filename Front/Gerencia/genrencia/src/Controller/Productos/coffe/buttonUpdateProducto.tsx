import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { ProductosEntity } from "../../../core/Entities/productos/productos";

import { ProductosDAO } from "../../../core/Implements/productos/productosDAO";
async function updateProducto(producto: ProductosEntity) {

    if (producto as ProductosEntity) {
        console.log("true")


    } else {
        console.log("false")
    }




    try {
        const ControladorProductos = new ProductosDAO();
        const data = await ControladorProductos.updateProducto( producto);

        return data as boolean;

    } catch (error) {
        console.error(error);
        return null

    }

}

export function ButtonUpdateProducto(props: any) {

    return (<IconButton
        color="primary"
        onClick={() => { updateProducto(props.producto); props.reload(4); }}
    >
        <SaveIcon />
    </IconButton>)

}