import * as React from 'react';
import Modal from '@mui/material/Modal';
import Input from '@mui/joy/Input';
import Box from '@mui/material/Box';
import {  Button} from "@mui/joy";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IFrameReporte } from '../../components/IframeReporte';
import { PATHMUNAYSYSY } from '../../Config/routes/pathsMuanaysys';
import { Fab, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
const sede =  localStorage.getItem("sede")??"sede"
const paths = new PATHMUNAYSYSY();
const API = paths.PathAPI();
const prefijo = 'Reports/Clients/coffe';
export function FormHistoricoCliente(props:any){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const date= new Date()
    const fecha= `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
    
    const[Finicio,setFinicio] = React.useState(fecha)
    const[Ffin,setFfin] = React.useState(fecha)
    const urlDowload=`${API}${prefijo}/pdf/filter/range/${props.idCliente}/${sede}/${Finicio}/${Ffin}`
    const urlIframe= `${API}${prefijo}/html/filter/range/${props.idCliente}/${sede}/${Finicio}/${Ffin}`
    
      const cambioFinicio=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setFinicio(event.target.value)}
        const cambioFfin=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setFfin(event.target.value)}
      return (
        <Box
          sx={{
            height: "75vh",
            flexGrow: 5,
           
            transform: 'translateZ(0)',
            // The position fixed scoping doesn't work in IE11.
            // Disable this demo to preserve the others.
            '@media all and (-ms-high-contrast: none)': {
              display: 'none',
            },
          }}
      
        > <Button onClick={handleOpen}>Open modal</Button>
          <Modal
          
            open={open}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            sx={{
              display: 'flex',
              p: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          
          >
            <div>
                <IconButton onClick={()=> handleClose()}> <CloseIcon/></IconButton>
                <div> 
                <Input value={Finicio} onChange={cambioFinicio} type='date'/>
                <Input value={Ffin} onChange={cambioFfin} type='date'/>
                <Button  color="primary" >
                    <CheckCircleIcon/> Generar {String(Finicio)} a {String(Ffin)}
                </Button>

                </div>
                <div> <Fab onClick={()=>window.open(urlDowload)} size="small" color="primary" aria-label="add" sx={{mt:10,ml:"90%",zIndex:99,display:"scroll", position:"fixed"}}>
        <DownloadIcon />
      </Fab>
                    <IFrameReporte url={urlIframe}></IFrameReporte>
                </div>
           </div>
          </Modal>
        </Box>
      );
    


}