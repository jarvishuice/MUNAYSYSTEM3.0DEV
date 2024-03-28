
import { GridColDef, DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useState,useEffect } from "react";

import { PagosDetailEntity } from "../../core/Entities/pagos/pagosEntity";
import { CuentasEntity } from '../../core/Entities/cuentas/cuentasEntity';
import { CuentasDAO } from '../../core/Implements/Cuentas/cuentasDAO';
import { Box } from "@mui/joy";
import { ModalEditPayEspacios } from "./modalEditPayEspacios";
import { PagosEspaciosDAO } from "../../core/Implements/pagos/pagosEspaciosDAO";


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
  


//alert(`plan ${account}`)
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
        renderCell:(params)=>(<ModalEditPayEspacios planCuentas={account} x={params}></ModalEditPayEspacios>)
      }
  
    
  ];
export function PagosTableEspacios(){
 
    const[pays,setPays]=useState<PagosDetailEntity[]|any> ([])
    async function fecthClientes(): Promise<void> {
        try {
            const ControladorPays = new PagosEspaciosDAO();
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