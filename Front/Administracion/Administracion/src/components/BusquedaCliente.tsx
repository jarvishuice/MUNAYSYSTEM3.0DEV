import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close as CloseIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { ClientesDAO } from "../core/Implements/clients/clientesDAO";
import { ClientesEntity} from "../core/Entities/clients/clients";
import SearchIcon from '@mui/icons-material/Search';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function BusquedaCliente(props:any) {
  const [clientes, setClientes] = React.useState<ClientesEntity[]>([]);
  const [open, setOpen] = React.useState(false);
  const [valorInput, setValorInput] = React.useState(' ');
  async  function  getAllClientes(){
    try {
  
      const ControladorClientes = new ClientesDAO();
      const data = await ControladorClientes.BuscarClientes(valorInput);
      
      setClientes(data);
   
      
    } catch (error) {
      console.error(error);
    }
  };




  const handleClickOpen = () => {
    
    
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorInput(event.target.value);
  };

 
  return (
    <React.Fragment>
       <center><Button sx={{width:"75%"}} variant="outlined" onClick={handleClickOpen}>
      Clientes<SearchIcon/>
      </Button></center>
      
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Busqueda Clientes
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
         <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="search-container">
            <input type="text" value={valorInput} onChange={manejarCambio} className="search-input" placeholder="Buscar..." name="search" />
            <Button variant="contained" onClick={()=>getAllClientes()}> <SearchIcon/></Button>
          </div>
          <List sx={{ width: '100%', maxWidth: 360 }}>
          
            {clientes.map((cliente: ClientesEntity) => {
            return(
              
              <ListItem onClick={() => {props.select(cliente);setOpen(false)}} color="secondary" key={cliente.id}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={cliente.nombre} secondary={cliente.ci} />
              </ListItem>
            )})}
          </List>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
