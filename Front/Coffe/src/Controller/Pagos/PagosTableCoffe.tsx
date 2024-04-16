
import { GridColDef, DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useState,useEffect } from "react";

import { PagosDetailEntity } from "../../core/Entities/pagos/pagosEntity";
import { PagosDAO } from "../../core/Implements/pagos/pagosDAO";

import { Box } from "@mui/joy";
import { ModalEditPayCoffe } from "./modalEditPayCoffe";
import { CuentasDAO } from "../../core/Implements/Cuentas/cuentasDAO";
import { CuentasEntity } from "../../core/Entities/cuentas/cuentasEntity";
let account:[]|CuentasEntity[] =[];
async function fecthPlanCuentas() {
  try {
    const controladorCuentas = new CuentasDAO();
    const data = await controladorCuentas.getCuentasBySede(localStorage.getItem("sede")??"sede");
   account=data;
  } catch (error) {
    console.error(error);
  }
}
fecthPlanCuentas();
function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  /*function botonera(params:any){
    alert(`Cambios del cliente ${JSON.stringify(params.row.id)} realizado con exito !!!` );
  
  
  }*/
const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      editable: false,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 150,
      editable: false,
    },
  
  
    {
      field: 'monto',
      headerName: 'Monto',
     
      width: 60,
      editable: false,
      
    },
  
    {
      field: 'motivo',
      headerName: 'Motivo',
     
      width: 200,
      editable: false,
      
    },
    {  field: 'cliente',
    headerName: ' Cliente',
  
    width: 200,
    editable: false,
    },
    {
      field: 'formaDepago',
      headerName: 'Metodo',
   
      width: 200,
      editable: false,
    },
    {
      field: 'referencia',
      headerName: ' Referencia',
  
      width: 100,
      editable: false,
    },
    {
        field: 'tasa',
        headerName: ' Tasa',
    
        width: 100,
        editable: false,
      },
      {
        field: 'sede',
        headerName: ' Sede',
    
        width: 50,
        editable: false,
      },
      {
        field: 'idcliente',
        headerName: ' cliente ID',
    
        width: 10,
        editable: false,
      },
      {
        field: 'idformadepago',
        headerName: '# forma pay ',
    
        width: 10,
        editable: false,
      },
      
      {
        field:'',
        editable:false,
        renderCell:(params)=>(<ModalEditPayCoffe planCuentas={account} x={params}></ModalEditPayCoffe>)
      }
  
    
  ];
export function PagosTableCoffe(){
    const[pays,setPays]=useState<PagosDetailEntity[]|any> ([])
    async function fecthClientes(): Promise<void> {
        try {
            const ControladorPays = new PagosDAO();
            const data = await ControladorPays.getAllPayDetail();
            setPays(data);
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(() => {
        fecthClientes();
      }, []);
    const rows = pays

    return (<Box sx={{ ml:1,mt:"80px",height: "75vh", width: '100%' }}>
    <DataGrid

slots={{
  toolbar: CustomToolbar,
}} editMode='cell'
rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize:100,
          },
        },
      }}
      pageSizeOptions={[7]}
     
      disableRowSelectionOnClick
    />
  </Box>
);

}