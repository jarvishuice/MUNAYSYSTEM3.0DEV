import { PATHMUNAYSYSY } from "../../Config/routes/pathsMuanaysys";
import { IFrameReporte } from "../../components/IframeReporte";
import Input from '@mui/joy/Input';
import { Alert, Button, Stack } from "@mui/joy";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from "react";
import Fab from '@mui/material/Fab';

import DownloadIcon from '@mui/icons-material/Download';

const sede =  localStorage.getItem("sede")??"sede"
const paths = new PATHMUNAYSYSY();
const API = paths.PathAPI();
const prefijo = 'gerencia/reporte/';

const date= new Date()
const fecha= `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
const ulrReporteIframe=`${API}${prefijo}html/filter/range/${sede}/${fecha}/${fecha}`
const urlBase=`${API}${prefijo}html/filter/range/${sede}`
const urlBaseDescarga=`${API}${prefijo}filter/range`
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
   <Button  color="primary" onClick={()=>{props.url(`${urlBase}/${Finicio}/${Ffin}`),props.urlDescarga(`${urlBaseDescarga}/${sede}/${Finicio}/${Ffin}`)}} >
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
    const[urlDescarga,setUrlDescarga]=useState(`${ulrReporteIframe}`)
    function cambioUrlDescarga(url:string){
    setUrlDescarga(url);
    }
    return(
    <div> 

      <center> <RangoFecha url={cambioUrl} urlDescarga={cambioUrlDescarga}></RangoFecha></center> 
      <Fab onClick={()=>window.open(urlDescarga)} size="small" color="primary" aria-label="add" sx={{mt:10,ml:"90%",zIndex:99,display:"scroll", position:"fixed"}}>
        <DownloadIcon />
      </Fab>
         <IFrameReporte url={url}></IFrameReporte>
        
    </div>
    
    )


}