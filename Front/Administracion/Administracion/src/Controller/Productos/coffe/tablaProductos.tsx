import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Cargando } from "../../../screens/Cargando";
import React from "react";
import { ProductosEntity } from "../../../core/Entities/productos/productos";

import { ProductosDAO } from "../../../core/Implements/productos/productosDAO";
import ModalAggProducto from "./modalAggProducto";
import { Avatar } from "@mui/joy";
import { ButtonDownloadInventory } from "./ButtonDownloadInventory";



function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport  csvOptions={{
    fileName: 'Inventario',
    delimiter: ',',
    utf8WithBom: true,
  }} />
        </GridToolbarContainer>
    );
}




export function TablaProductos() {
    const [load, setload] = React.useState<Boolean>(true);
    const [productos, setProductos] = React.useState<ProductosEntity[] | []>([]);
  
    async function getProductos() {
        try {
            const controlador = new ProductosDAO();
            const data = await controlador.getProductos();
            setProductos(data)
            setload(false);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setload(false);
        }



    }
    React.useEffect(() => {
        getProductos();
    }, []);
    const rows = productos;
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 90,
            editable: false,
            type: 'number'
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 250,
            editable: false,
            type: 'text',
        },
        {
            field: 'urlimagen',
            headerName: 'Imagen',
            editable: false,
            width: 200,
        },
        {
            field: 'Imagen',

            width: 100,
            editable: false,
            renderCell: (params) => {

               
                return (
                    <Avatar  sx={{width:50,height:50}}src={params.row.urlimagen}/>
                )
            }

        },
        
       
        {
            field: 'precio',
            headerName: 'Precio',
            width: 120,
            editable: false,
            type: 'number',
            valueFormatter: (params) => {
                const formattedValue = params.value.toFixed(2);
                return parseFloat(formattedValue); // Convierte la cadena a un número decimal
            }
        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            width: 120,
            editable: false,
            type: 'number',
        },
        {
           /* field: 'tipo',
            headerName: 'Categoria',
            width: 200,
            editable: false,
            type: 'text',*/
            field: 'tipo',
            headerName:'Categoria',
            type: 'singleSelect',
            valueOptions: ['alimentos', 'bebidas', 'cafe', 'snack'],
            editable: false,
            
            width: 150,
        },
       
       
       
        
    ]
    if (load === true) {
        return <Cargando></Cargando>
    }
    else {
        return (<Box sx={{ height: "100vh", width: '100%', mt: "4%" }}>
            
            {/*<ModalAggProducto/>*/}
            <DataGrid slots={{ toolbar: CustomToolbar, }}
                editMode="cell"
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 30,
                        },
                    },
                }}
                pageSizeOptions={[10]}

                disableRowSelectionOnClick />

<ModalAggProducto/>
<ButtonDownloadInventory/>

        </Box>)


    }
}