
import Modal from '@mui/joy/Modal';
import IconButton from "@mui/joy/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import * as React from 'react';
import {DeudasDetalles} from './deudasDetalles';
import {FormularioPago } from "./formularioPago";
/**
 * Description placeholder
 * @date 23/2/2024 - 1:58:27 p. m.
 *
 * @export
 * @param {*} props
 * @returns {*}
 */


export function ModalDetalleDeuda(props:any): any{
  
    return (  <React.Fragment>
      
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={props.mostrar}
         
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{display:"flex"}} className="modalDeudasClientes">
          <center><IconButton variant="outlined"  color="danger" onClick={()=>props.cerrar(false)}><ClearIcon/></IconButton></center>
          <div > {<FormularioPago cliente={props.cliente}></FormularioPago>}</div>
         
          <div>{<DeudasDetalles cliente={props.cliente}/>}</div>
          </div>
        </Modal>
        </React.Fragment>
      )
}