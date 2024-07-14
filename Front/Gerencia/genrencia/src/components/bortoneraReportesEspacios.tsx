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

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/joy';
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
      <Button  color="primary" disabled={fecha==" "?true:false} onClick={()=>{window.open(`${props.urlBase}/Fecha/${sede}/${String(fecha).slice(0,4)}/${String(fecha).slice(5,7)}/${String(fecha).slice(8,10)}`),props.close(false)}}>
        <CheckCircleIcon/> Generar  {String(fecha)}
      </Button>
   </Stack>
</Alert> )
}

function ReporteMensual(props:any){
    const [mes,setMes]= React.useState<number>(1);
    const [year,setYear]=React.useState<number>(2024)
return(    
<Alert variant="outlined" sx={{width:"50%"}} severity="success">
   <Stack spacing={1.5} sx={{ minWidth: 50 }}>
    Reporte Mensual
    <select style={{width:"100%"}} value= {mes} onChange={(e)=>setMes(Number(e.target.value))}>
    
    <option value="1">Enero</option>
    <option value="2">Febrero</option>
    <option value="3">Marzo</option>
    <option value="4">Abril</option>
    <option value="5">Mayo</option>
    <option value="6">Junio</option>
    <option value="7">Julio</option>
    <option value="8">Agosto</option>
    <option value="9">Septiembre</option>
    <option value="10">Octubre</option>
    <option value="11">Noviembre</option>
    <option value="12">Diciembre</option>
  </select>
  <input value={year} onChange={(e)=> setYear(Number(e.target.value))} type="number" min={2023} step={"1"} />
      <Button  color="primary"  onClick={()=>{window.open(`${props.urlBase}/Mensual/${sede}/${String(mes)}/${String(year)}`),props.close(false)}}>
        <CheckCircleIcon/> Generar  {String(mes)}-{String(year)}
      </Button>
   </Stack>
</Alert>)


}
export  function BotoneraReportesEspacios(props:any) {
  const [value, setValue] = React.useState(0);
  const [open,setOpen]= React.useState(false);
  const[mensual,setMensual]= React.useState(false)



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
        <BottomNavigationAction label="Mensual"  onClick={()=>{setMensual(true),setOpen(false)}} icon={<RestoreIcon />} />
        <BottomNavigationAction label="Historicos" onClick={()=>{setOpen(true),setMensual(false)}}  icon={<DateRangeIcon/>}/>

      </BottomNavigation>
      {open==true?<Alerta urlBase={props.urlBase} close={setOpen}/>:""}
      {mensual==true?<ReporteMensual urlBase={props.urlBase} close={setMensual}/>:""}
    </Box>
  );
}
