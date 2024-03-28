
import { PATHMUNAYSYSY } from "../../Config/routes/pathsMuanaysys";
import { IFrameReporte } from "../../components/IframeReporte";
import { BotoneraReportes } from "../../components/botoneraReportes";

const paths = new PATHMUNAYSYSY();
const API = paths.PathAPI();
const prefijo = 'Reports/coffeshop';



const sede =  localStorage.getItem("sede")??"sede"
const urlCierre=  `${API}${prefijo}/cierre/${sede}`
const urlPrecierre= `${API}${prefijo}/precierre/${sede}`
const urlIframeCierre = `${API}${prefijo}/cierre/html/${sede}`
const urlBase = `${API}${prefijo}`
export function ReportesCoffeshop(){
    
  
return( 
<div>
  
    <center>
        <BotoneraReportes urlBase={urlBase} urlCierre={urlCierre} Precierre={urlPrecierre}/>
    </center>

    <IFrameReporte url={urlIframeCierre}/>


</div>    
)
}