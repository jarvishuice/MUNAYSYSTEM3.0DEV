
import * as React from 'react';
import FormLabel from '@mui/joy/FormLabel';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import { ClientesEntity } from '../../core/Entities/clients/clients';
import { ClientesDAO } from '../../core/Implements/clients/clientesDAO';
import CircularProgress from '@mui/material/CircularProgress';

export function FormRegCliente(){
//estado de los inputs ===========================================     
const [nombre,setNombre]= React.useState(" ")
const changeNombre=(e:React.ChangeEvent<HTMLInputElement>)=>(
    setNombre(e.target.value)
)
const [ci,setCi]= React.useState(" ")
const changeCi=(e:React.ChangeEvent<HTMLInputElement>)=>(
    setCi(e.target.value)
)
const [correo,setCorreo] = React.useState(" ")
const changeCorreo=(e:React.ChangeEvent<HTMLInputElement>)=>(
    setCorreo(e.target.value)
)
const [tlf,setTlf] = React.useState(" ")
const changeTlf=(e:React.ChangeEvent<HTMLInputElement>)=>(
    setTlf(e.target.value)
)
const [direccion,setDireccion] = React.useState(" ")
const changeDireccion=(e:React.ChangeEvent<HTMLInputElement>)=>(
    setDireccion(e.target.value)
)
const  [progreso,setProgreso] = React.useState(false)
const restablecer = ()=> {
   
    setDireccion(" ")
    setNombre(" ")
    setCi(" ")
    setCorreo(" ")
    setTlf(" ")
}
//=================================================================
//controlador registro de clientes
async function RegistroCliente (cliente:ClientesEntity){
    try {
      const contorladorCliente = new ClientesDAO();
      setProgreso(true)
      const data = await contorladorCliente.CrearCliente(cliente);
      if (data != null ){
         alert(`cliente registrado de manera correcta `);
        setProgreso(false)
        restablecer()
      }
      
    } catch (error) {
      console.error(error);
    }
  
  
  
  }



//=================================================================



return (
    
            <>          
              <Box component="form"sx={{'& .MuiTextField-root': { m: 1, width: '100%' },width:"100%",gap:'10px',display:"grid",gridTemplateColumns:'1fr 1fr'}}
                noValidate
                autoComplete="off"
                >
                <div>
                    <FormLabel sx={{ml:2,mt:1}}>NOMBRE</FormLabel>
                    <TextField sx={{ml:2,width:"100%"}} value={nombre} onChange={changeNombre} size="small" variant="filled" color="primary" placeholder="Ingerese en nombre"  />
                </div>      
               <div>
                    <FormLabel sx={{ml:2,mt:1}}>CI/RIF</FormLabel>
                    <TextField sx={{ml:2,width:"100%"}} value={ci} onChange={changeCi} size="small"variant="filled" color="primary"  placeholder="cedula o rif" />
                </div>
                <div>
                    <FormLabel sx={{ml:2,mt:1}}>CORREO</FormLabel>
                    <TextField type="email" value={correo} onChange={changeCorreo} sx={{ml:2,width:"100%"}}variant="filled"  size="small" color="primary"  placeholder="correo" />
                </div>
                <div>
                    <FormLabel sx={{ml:2,mt:1}}>TELEFONO</FormLabel>
                    <TextField  sx={{ml:2,width:"100%"}} value={tlf} onChange={changeTlf} size="small" variant="filled" color="primary"  placeholder="telefono" />
                </div>
                <div>
                    <FormLabel sx={{ml:2,mt:1}}>DIRECCION</FormLabel>
                    <TextField  sx={{ml:2,mb:2,width:"100%"}} value={direccion} onChange={changeDireccion} variant="filled" size="small" color="primary"  placeholder="direccion" />
                </div>
                <div> 
            
                    <Fab sx={{ml:"85%"}} onClick={()=> RegistroCliente(
                        {
                            id:Number(1),
                            nombre:nombre.toUpperCase(),
                            apellido:" ",
                            correo:correo,
                            tlf:tlf,
                            fechaingreso:" ",
                            fechacambio:" ",
                            codigo:Number(0),
                            credito: Number(0),
                            ci:ci.trim().replace(/\./g, ""),
                            identificacion:" ",
                            direccion:direccion,
                            deuda:Number(0)
                        }
                    )}  disabled={((nombre!=" "&& nombre.length > 1 ) && (correo !=" " && correo.length > 1) && (ci != " "&& ci.length > 1 )&& (tlf != " " &&tlf.length > 1 )&& (direccion != " "&& direccion.length > 1))?false:true} color="primary" aria-label="add">
                        {progreso==false?<SaveIcon />:<CircularProgress color="inherit" />}
                    </Fab>

                </div>
             
            </Box>
        
            </>

                  
     )




}