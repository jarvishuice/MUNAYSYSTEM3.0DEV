import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateUsuario } from './formCreateusuario';
export default function ModalAggUsuario() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>


      <Fab color='primary' aria-labelledby='Crear Usuario' sx={{
        position: 'fixed',
        bottom: '14%',
        right: '8%',
        transform: 'translateX(50%)', // Adjust for centering
        zIndex: 1000
      }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

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
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Crear Usuario
          </Typography>
          <FormCreateUsuario />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}