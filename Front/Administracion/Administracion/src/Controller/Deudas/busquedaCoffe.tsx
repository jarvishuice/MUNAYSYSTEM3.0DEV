import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useState } from "react";
import { DeudaClientesEntity } from "../../core/Entities/clients/dedudaClientes";
import { ModalDetalleDeuda } from '../../components/modalDetalleDeuda';
export function BusquedaCoffe(props:any){
 const [resultado,setResultado]=useState<DeudaClientesEntity[]|[]>(props.data);
 const [mostrar,setMostrar]= useState<boolean>(false);
 const [nombre,setNombre]= useState<string>("")
 const [open,setOpen]= useState<boolean>(false)
 const [cliente,setCliente]=useState({})

 const changeNombre = (event: React.ChangeEvent<HTMLInputElement>) => setNombre(event.target.value);
 function buscar() {
  const valorBuscado = nombre.toLowerCase(); // Convertir a minúsculas
  const resultadosFiltrados = props.data.filter((objeto: any) => {
    const nombreEnObjeto = objeto["nombre"].toLowerCase(); // Convertir a minúsculas
    return nombreEnObjeto.includes(valorBuscado);
  });


  // Supongo que "setResultado" es una función que actualiza el estado
  // con los resultados filtrados. Asegúrate de que esté implementada correctamente.
  setResultado(resultadosFiltrados);

  // Muestra los resultados en un alert (esto podría ser mejorado)
  alert(JSON.stringify(resultadosFiltrados));
}
function agregar(cliente:any){
  setCliente(cliente)
}


    return (
      <center><div key="contenedor general" style={{maxHeight:"40vh",overflowY: "auto",marginTop:"70px",maxWidth:"500px"}}>
            <div key="contenedord de los inmput ">
                <input type="text"  value={nombre}onChange={changeNombre}  placeholder="Buscar..." name="search"/>
                <Button variant="contained" onClick={()=>{setMostrar(true),buscar()}}> <SearchIcon/></Button>
            </div>
            <div key="CResultadoBusqueda" >
            <ModalDetalleDeuda mostrar={open} cliente={cliente} cerrar={setOpen} detalles={<h1>ddd</h1>}/>
            <List sx={{ width: '100%', maxWidth: 360 }}>  {mostrar?
                
               (resultado.map((re:DeudaClientesEntity)=>{
                return( 
                <ListItem onClick={() => {setMostrar(false),setOpen(true),agregar(re)}} color="secondary" key={re.idCliente}>
                    <ListItemAvatar>
                    <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={re.nombre} secondary={`deuda:${re.deuda-re.abono}$`} />
               
              </ListItem>)
                })):""
               }
                 </List>
                
                 </div>
        </div></center>)



}