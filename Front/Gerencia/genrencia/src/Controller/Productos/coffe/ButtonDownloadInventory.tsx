import Fab from "@mui/material/Fab";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { purple } from '@mui/material/colors';
import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";

export function ButtonDownloadInventory(){
  const paths =  new PATHMUNAYSYSY()
  const API=  paths.PathAPI()
  const prefijo='Reports/inventario/'
   return (<Fab  aria-description="Descargar inventario" aria-labelledby='Crear producto' sx={{
        position: 'fixed',
        bottom: '25%',
        right: '8%',
        transform: 'translateX(50%)', 
        backgroundColor:purple['500'],
       // Adjust for centering
        zIndex: 1000
      }} onClick={() => window.open(`${API}${prefijo}${localStorage.getItem("sede")}`)}>
        <PictureAsPdfIcon sx={{color:'white'}} />
      </Fab>)


}