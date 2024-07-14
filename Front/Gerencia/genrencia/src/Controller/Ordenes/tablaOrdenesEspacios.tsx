
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/joy';
import { OrdenesDetalladasEntity } from '../../core/Entities/ordenes/ordenesEntity';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { OrdenesEspaciosDAO } from '../../core/Implements/Ordenes/OrdenesEspaciosDAO';
import { FormEditOrder } from '../../components/formEditOrderEspacios';

const sede = localStorage.getItem("sede")??"inicie seccion";
const USUARIO = localStorage.getItem("user")??JSON.stringify({"id":0,"nombre":"Inicie seccion","apellido":"InICIE SECCION","ci":"00000","nombreusuario":"jarvis","password":"🖕","token":"1710421055.9607954","status":"conectado","tipoUsuario":0,"urlImagen":"xxxxxxxx"})

const credenciales = JSON.parse(USUARIO)
function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

 

async function deleteORder(idOrder:string){
  try {
    const ControladorOrdenes = new OrdenesEspaciosDAO();
    const data = await ControladorOrdenes.deleteOrden(idOrder,credenciales.id,credenciales.nombreusuario,sede);
    alert(`Orden #${idOrder} eliminada: ${data}`);
    //window.location.reload()
  } catch (error) {
   alert(error);
  }
}
function mostrarCElda(params:any){

  deleteORder(JSON.stringify(params.row.idOrden).replace(/['"]+/g, ''));


}

const columns: GridColDef[] = [
  {
    field: 'idOrden',
    headerName: 'Id',
    width: 250,
    editable: false,
  },
  {
    field: 'cliente',
    headerName: 'Nombre',
    width: 250,
    editable: false,
  },
  {
    field: 'total',
    headerName: 'Total',
   
    width: 100,
    editable: false,
    
  },

  {
    field: 'fecha',
    headerName: 'Fecha de apertura',
   
    width: 200,
    editable: false,
    
  },
  {  field: 'hora',
  headerName: ' Hora',

  width: 150,
  editable: false,
  },
  {
    field: 'status',
    headerName: 'Estado',
 
    width: 100,
    editable: false,
  },
  {
    field: 'convertir',
    headerName: 'Eliminar ',
 
    width: 110,
    editable: false,
    renderCell:(params)=>(
    <IconButton size={"lg"} color="danger" onClick={()=>mostrarCElda(params)}> 
  <DeleteForeverIcon /> 
   </IconButton>
    )
  },
  {
    field: 'Editar',
    headerName: 'Editar ',
 
    width: 110,
    editable: false,
    renderCell:(params)=>(
  <FormEditOrder orden={params.row}/>
    )
  }
  
];



export  function TablaOrdenesEspacios() {
   
  const[ordenes,setOrdenes]=useState<OrdenesDetalladasEntity[]|[]> ([])
  
    /**
   * Fetches data from an API using an instance of the @class`VisitasDAO`  
   * and sets the fetched data to the `visitas` state variable.
   * 
   * @returns {Promise<void>} 
   * - A promise that resolves once the data is fetched and set to the state variable.
   */
  async function fecthOrdenes(): Promise<void> {
    try {
        const ControladorOrdenes = new OrdenesEspaciosDAO();
        const data = await ControladorOrdenes.getOrdenesBySede(sede);
        setOrdenes(data);
      } catch (error) {
        console.error(error);
      }
}
useEffect(() => {
  fecthOrdenes();
}, []);

const rows = ordenes;

  return (
    <Box sx={{ mt:"80px",height: "100vh", width: '100%' }}>
      <DataGrid
    getRowId={(row)=>row.idOrden}
  slots={{
    toolbar: CustomToolbar,
  }}
rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 40,
            },
          },
        }}
        pageSizeOptions={[40]}
     
        disableRowSelectionOnClick
      />
    </Box>
  );
}