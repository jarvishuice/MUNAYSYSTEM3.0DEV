
import { PATHMUNAYSYSY } from "../../Config/routes/pathsMuanaysys";
import { IFrameReporte } from "../../components/IframeReporte";
import { BotoneraReportesEspacios } from "../../components/bortoneraReportesEspacios";


const paths = new PATHMUNAYSYSY();
const API = paths.PathAPI();
const prefijo = 'Espacios/Report';



const sede =  localStorage.getItem("sede")??"sede"
const urlCierre=  `${API}${prefijo}/${sede}`
const urlPrecierre= `${API}${prefijo}/precierre/${sede}`
const urlIframeCierre = `${API}${prefijo}/cierre/html/${sede}`
const urlBase = `${API}${prefijo}`
console.log(`urlBASE${urlBase}`)
export function ReportesEspacios(){
    
  
return( 
<div>
  
    <center>
        <BotoneraReportesEspacios urlBase={urlBase} urlCierre={urlCierre} Precierre={urlPrecierre}/>
    </center>

    <IFrameReporte url={urlIframeCierre}/>


</div>    
)
}