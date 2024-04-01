import { PATHMUNAYSYSY } from "../../Config/routes/pathsMuanaysys";
import { IFrameReporte } from "../../components/IframeReporte";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/joy/Input';
import { Alert, Button, FormLabel, Stack } from "@mui/joy";
import { FormControl } from "@mui/joy";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from "react";

const sede =  localStorage.getItem("sede")??"sede"
const paths = new PATHMUNAYSYSY();
const API = paths.PathAPI();
const prefijo = 'gerencia/reporte/';

const date= new Date()
const fecha= `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
const ulrReporteIframe=`${API}${prefijo}html/filter/range/${sede}/${fecha}/${fecha}`
const urlBase=`${API}${prefijo}html/filter/range/${sede}`
function RangoFecha(props:any){
const[Finicio,setFinicio] = useState(fecha)
const[Ffin,setFfin] = useState(fecha)
const cambioFinicio=(event:React.ChangeEvent<HTMLInputElement>)=>{
setFinicio(event.target.value)}
const cambioFfin=(event:React.ChangeEvent<HTMLInputElement>)=>{
setFfin(event.target.value)}
return (
<Alert sx={{mt:7,maxWidth:"300px"}} >
<Stack spacing={1.5} sx={{ minWidth: 100 }}>
 SELECCIONE EL RANGO DE DIAS 
 <br></br>

 <Input value={Finicio}  onChange={cambioFinicio} type="date"/>

   <Input  value={Ffin} onChange={cambioFfin}  type="date"/>
   <Button  color="primary" onClick={()=>props.url(`${urlBase}/${Finicio}/${Ffin}`)} >
     <CheckCircleIcon/> Generar {String(Finicio)} a {String(Ffin)}
   </Button>
</Stack>
</Alert>
    
           )
}
export function ReportesUnificados(){

    const [url,setUrl] =useState(`${ulrReporteIframe}`)
    function cambioUrl(url:string){
    setUrl(url);
    }
    return(
    <div> 

      <center> <RangoFecha url={cambioUrl}></RangoFecha></center> 
         <IFrameReporte url={url}/>
        
    </div>
    
    )


}