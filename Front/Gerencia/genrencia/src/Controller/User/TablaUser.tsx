import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

import React from "react";

import { UsersEntity } from "../../core/Entities/users/userEntity";
import { UserDAO } from "../../core/Implements/user/userDAO";
import { Avatar } from "@mui/joy";
import { RolUser } from "./RolUser";
import { Cargando } from "../../screens/Cargando";
import ModalAggUsuario from "./ModalAggUsuario";



function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{
                fileName: 'Inventario',
                delimiter: ',',
                utf8WithBom: true,
            }} />
        </GridToolbarContainer>
    );
}




export function TablaUser() {
    const [load, setload] = React.useState<Boolean>(true);
    const [user, setUser] = React.useState<UsersEntity[] | []>([]);
    // const [refresh, setRefresh] = React.useState<number>(0);
    async function getProductos() {
        try {
            const controlador = new UserDAO();
            const data = await controlador.getAllUsers();
            setUser(data)
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
    const rows = user;
    const columns: GridColDef[] = [
        
        {
            field: 'id',
            headerName: 'Id',
            width: 70,
            editable: false,
            type: 'number'
        },
     
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 150,
            editable: false,
            type: 'string',

        },
        {
            field: 'apellido',
            headerName: 'Apellidos',
            editable: false,
            width: 100,
            type: 'string',
        },
        {
            field: 'ci',
            headerName: 'Cedula',
            width: 100,
            editable: false,
            type: 'string',

        },
        {
            field: 'nombreusuario',
            headerName: 'Usuario',
            width: 120,
            editable: false,
            type: 'string',

        },

        
        {
            field: 'foto',
            width: 100,
            editable: false,
            renderCell: (params) => {
             const color = params.row.status=="conectado"?"green":"gray";
                return (
                                    
                 <Avatar  sx={{width:50,height:50,borderColor:{color},borderStyle:"solid",borderWidth:"2px"}} src={params.row.urlImagen}/>
              ) } , 
          },
        {
            field: 'status',
            headerName: 'status',
            width: 150,
            editable: false,
            type: 'string',

        },
        {
            field: 'tipoUsuario',
            headerName:'',
            type: 'singleSelect',
            valueOptions: ["1", "2", "3"],
            editable: true,
            width: 60,

        },
        {
            field: 'ROL',
            width: 80,
            editable: false,
            renderCell: (params) => {
          
                return (
                                    
                <RolUser status={params.row.tipoUsuario}/>
              ) } , 
        },
        
        {
            field: 'urlImagen',

            width: 150,
            editable: false,
            type: 'string',

        },
      {field:'ultimaSesion',
        headerName:'ultima Seccion',
        width: 150,
        editable: false,
        type:'string',

      }





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

<ModalAggUsuario/>

    </Box>)


}
}


/* {
       field: 'guardarCambios',

       width: 150,
       editable: false,
       renderCell: (params) => {

          
           return (
               <ButtonUpdateProducto producto={JSON.stringify({
                   'id': parseInt(params.row.id),
                   'nombre': params.row.nombre,
                   'urlimagen': params.row.urlimagen,
                   'precio': parseFloat(params.row.precio),
                   'cantidad': parseInt(params.row.cantidad),
                   'tipo': params.row.tipo,
                   'almacen': "str",
               })} reload={setRefresh} />
           )
       }

   }*/