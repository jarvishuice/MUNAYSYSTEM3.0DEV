import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { IconButton } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import { BusquedaCliente } from './BusquedaCliente';
import { ClientesEntity } from '../core/Entities/clients/clients';
import { OrdenesEntity } from '../core/Entities/ordenes/ordenesEntity';
import { OrdenesDAO } from '../core/Implements/Ordenes/ordenesDAO';
export  function FormEditOrder(props:any) {
  const sede =localStorage.getItem("sede")??"inicie seccion"
  const credenciales = JSON.parse(localStorage.getItem("user")??"{k:0}")??{
    "id": 0,
    "nombre": "seleccione un cliente",
    "apellido": "",
    "correo": "clientecontado@gmail.com",
    "tlf": "",
    "fechaingreso": "2022-10-25 14:39:01",
    "fechacambio": null,
    "codigo": null,
    "credito": null,
    "ci": "10000002",
    "identificacion": "",
    "direccion": "Caracas null",
    "deuda": null
  }
  const [open, setOpen] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>(props.orden.fecha.slice(0,11));
  const [time, setTime] = React.useState<string>(props.orden.hora.slice(0,8));
  const [cliente,setCliente]= React.useState<ClientesEntity>({
    "id": 0,
    "nombre": "seleccione un cliente",
    "apellido": "",
    "correo": "clientecontado@gmail.com",
    "tlf": "",
    "fechaingreso": "2022-10-25 14:39:01",
    "fechacambio": null,
    "codigo": null,
    "credito": null,
    "ci": "10000002",
    "identificacion": "",
    "direccion": "Caracas null",
    "deuda": null
  });
  const [idCliente,setIdCliente]= React.useState<number>(0);
  const [nombreCliente,setNombreCliente]= React.useState<string>("seleccione un cliente por favor ");
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };



  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleClienteChange=(cliente:ClientesEntity) =>{
  setCliente(cliente);
  alert(cliente.ci)
  setIdCliente(cliente.id);
  setNombreCliente(cliente.nombre)

  }
  async function editarOrden(orden:OrdenesEntity){
    try {
      const ControladorOrdenes = new OrdenesDAO();
      const data = await ControladorOrdenes.editOrden(orden,credenciales.id,credenciales.nombreusuario)
      if (data ==true){
      alert("orden editada con exito")
      }
      console.log(`edicion de orden status ${data}`)
      window.location.reload()
    } catch (error) {
     alert(error);
    }
  }

  
  return (
    <React.Fragment>
      <IconButton variant="solid" color="primary" onClick={() => setOpen(true)}>
        <EditIcon/>
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
            Edicion de orden 
          </Typography>
        
          <div className="form-group col-sm-12">
          <label htmlFor="date-input">id:{idCliente}</label> <br/>
          <label htmlFor="date-input">CI:{cliente.ci??"inserte un cliente"}</label><br/>
          <label htmlFor="date-input">Orden#{props.orden.idOrden}</label><br/>
          <BusquedaCliente select={handleClienteChange} /> 
          <label htmlFor="date-input">Cliente</label>
          <input
              type="text"
              id="test"
              value={nombreCliente}
             
              className="form-control w-5 mt-2"
              disabled
            />
            <label htmlFor="date-input">Fecha</label>
            
            <input
              type="date"
              id="date-input"
              value={date}
              onChange={handleDateChange}
              className="form-control w-5 mt-2"
            />
            <label htmlFor="time-input">Hora</label>
            <input
              type="time"
              id="time-input"
              value={time}
              onChange={handleTimeChange}
              className="form-control mt-2"
            />
          </div>
          <Button  disabled={cliente.id ==0?true:false}sx={{width:"100%"}} 
          onClick={()=>editarOrden({id:props.orden.idOrden,
                                    total:props.orden.total,
                                    sede:sede,
                                    fechaPedido:`${date} ${time}`,
                                    fechaPago:`${date} ${time}`,
                                    status:"por pagar",
                                    idCliente:idCliente,
                                    tipoPago:"ddd",
                                    idPago:"d"})}> 
                                    Guardar</Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}