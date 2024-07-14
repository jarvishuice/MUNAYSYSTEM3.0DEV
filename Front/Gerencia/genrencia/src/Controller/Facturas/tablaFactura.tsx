import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { EncabezadoFacturaEntity } from "../../core/Entities/facturas/FacturasEntity";
import React from "react";
import { FacturasDAO } from "../../core/Implements/facturas/facturasDAO";
import { Box } from "@mui/material";
import { Cargando } from "../../screens/Cargando";
import ModalFacturasPrevizualizar from "../../components/modalFacturasPrevisualizar";
import { ButtonUpdateFactura } from "./ButtonUpodateFactura";
import { StatusFacturas } from "./statusFacturas";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 90,
        editable: false,

    },
    {
        field: 'nFactura',
        headerName: 'NFactura',
        width: 120,
        editable: true
    },
    {
        field: 'ci',
        headerName: 'CI/rif',
        width: 120,
        editable: true
    },
    {
        field: 'nombre',
        headerName: 'Nombre',
        width: 250,
        editable: true,
        type: 'text',
       
    },
    {
        field: 'totalDivisa',
        headerName: 'total$',
        width: 120,
        editable: false

    },
  /*  {
        field: 'iva',
        headerName: 'IVA $',
        width: 70,
        editable: false
    },
    {
        field: 'ivaBS',
        headerName: 'IVA BS',
        width: 70,
        editable: false
    },
    {
        field: 'baseBs',
        headerName: 'Base Bs',
        width: 120,
        editable: false
    },
    {
        field: 'baseDivisa',
        headerName: 'Base $',
        width: 120,
        editable: false
    },*/
    {
        field: 'fecha',
        headerName: 'Fecha',
        width: 150,
        editable: false
    },
    {
        field: 'tasa',
        headerName: 'Tasa',
        width: 80,
        editable: false
    },
    {
        field: 'status',
        headerName: '',
        width: 1,
        editable: false
    },{
        field: '',
        headerName: 'Status',
        width: 100,
        editable: false,
        renderCell:(params)=>(
        <StatusFacturas status={params.row.status}/>
        )

    },
    
    {
        field: 'direcion',
        headerName: 'Direccion',
        width: 150,
        editable: true,

    },{
        field: 'visualizar',
        headerName: '',
        width: 50,
        editable: false,
        renderCell:(params)=>(
            <ModalFacturasPrevizualizar idFactura={params.row.id}/>
        )

    },
    {
        field: 'guardarCambios',
        headerName: '',
        width: 50,
        editable: false,
        renderCell:(params)=>(
            <ButtonUpdateFactura encabezado={params.row}/>
        )

    }
   /* {
        field: 'totalBs',
        headerName: 'Total Bs',
        width: 70,
        editable: false
    }*/


]
export function TablaFacturas() {
    const [load,setload]=React.useState<Boolean>(true);
    const [facturas, setFacturas] = React.useState<EncabezadoFacturaEntity[] | []>([]);
    async function getFacturas(): Promise<void> {
        try {
            const controlador = new FacturasDAO();
            const data = await controlador.getAllFacturas(localStorage.getItem("sede") ?? "sede");
            const encabezados:EncabezadoFacturaEntity[]  = data.map((factura) => factura.encabezado);
            setFacturas(encabezados)
            setload(false);
        }
        catch (error) {
            console.error(error);
        }
        finally{
            setload(false);
        }

    }
    
    const rows = facturas
    React.useEffect(() => {
        getFacturas();
    }, []);

    if(load === true){
        return <Cargando></Cargando>
    }
    else{
    return (<Box sx={{ height: "100vh", width: '100%' ,mt:"4%"}}>
                <DataGrid slots={{toolbar: CustomToolbar,}} 
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
                         
                          disableRowSelectionOnClick/>
                    
                

            </Box>)}






}