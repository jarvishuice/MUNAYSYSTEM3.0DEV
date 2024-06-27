import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { ProductosEntity } from "../../../core/Entities/productos/productos";
import { ProductosEspaciosDAO } from "../../../core/Implements/productos/productosEspaciosDAO";
async function updateProducto(producto: ProductosEntity) {

    if (producto as ProductosEntity) {
        console.log("true")


    } else {
        console.log("false")
    }




    try {
        const ControladorProductos = new ProductosEspaciosDAO();
        const data = await ControladorProductos.updateProducto(localStorage.getItem("sede") ?? "sede", producto);

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