import * as React from 'react';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Sheet from '@mui/joy/Sheet';
import { IframeFactura } from './iframeFactura';
import { Cargando } from '../screens/Cargando';
import { IconButton } from '@mui/material';

export default function ModalFacturasPrevizualizar(props:any) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <IconButton  color="primary" onClick={() => setOpen(true)}>
      <VisibilityIcon/>
      </IconButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width:'900px',
            height:'100vh',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
         {<IframeFactura idFactura={props.idFactura}/>?<IframeFactura idFactura={props.idFactura}/>:<Cargando></Cargando>}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}