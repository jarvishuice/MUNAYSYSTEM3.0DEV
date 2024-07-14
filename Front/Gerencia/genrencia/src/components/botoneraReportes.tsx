import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Alert from '@mui/material/Alert';
import DownloadIcon from '@mui/icons-material/Download';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const sede=localStorage.getItem("sede")??"sede"
function Alerta(props:any){
const [fecha,setFecha] = React.useState<Date|String>(" ")
const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  setFecha(event.target.value); 


  // Actualiza el estado con el valor seleccionado
};
return (

<Alert variant="outlined" severity="success">
   <Stack spacing={1.5} sx={{ minWidth: 100 }}>
    SELECCIONE LA FECHA DEL REPORTE A GENERAR
      <Input  onChange={handleDateChange} type="date"/>
      <Button  color="primary" disabled={fecha==" "?true:false} onClick={()=>{window.open(`${props.urlBase}/cierreByFecha/${sede}?ano=${String(fecha).slice(0,4)}&mes=${String(fecha).slice(5,7)}&day=${String(fecha).slice(8,10)}`),props.close(false)}}>
        <CheckCircleIcon/> Generar  {String(fecha)}
      </Button>
   </Stack>
</Alert>)
}
export  function BotoneraReportes(props:any) {
  const [value, setValue] = React.useState(0);
  const [open,setOpen]= React.useState(false);




  return (
    <Box sx={{ mt:"70px",width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(event)
        }}
      >      
        <BottomNavigationAction onClick={()=>window.open(props.urlCierre,"reporte")}  label="Descargar" icon={<DownloadIcon />} />
        <BottomNavigationAction label="Precierre"  onClick={()=>window.open(props.Precierre,"reporte")} icon={<RestoreIcon />} />
        <BottomNavigationAction label="Historicos" onClick={()=>setOpen(true)}   icon={<DateRangeIcon/>}/>

      </BottomNavigation>
      {open==true?<Alerta urlBase={props.urlBase} close={setOpen}/>:""}
    </Box>
  );
}
