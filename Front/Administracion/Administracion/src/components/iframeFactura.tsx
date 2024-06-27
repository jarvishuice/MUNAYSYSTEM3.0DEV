import { PATHMUNAYSYSY } from "../Config/routes/pathsMuanaysys"

export function IframeFactura(props:any){
    const paths =  new PATHMUNAYSYSY()
    const API=  paths.PathAPI()
   const  prefijo='facturas'
    const url = `${API}${prefijo}/html/${localStorage.getItem('sede')}/${props.idFactura}`
  
    return (
        
        <iframe src={url} width="100%" height="100%"></iframe>
        
        
    )

}