
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { IconButton } from '@mui/joy';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { PagosDAO } from "../../core/Implements/pagos/pagosDAO";
import { PagosEntity } from "../../core/Entities/pagos/pagosEntity";


const controlador = new PagosDAO()
const credenciales = JSON.parse(localStorage.getItem("user")??"{'k':'0',}")??"inicie seccion"

// console.log(controlador);
// alert("este es el json:  "+typeof(pagoData)+ JSON.stringify(pagoData))

export function ModalEditPayCoffe(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const j = props.x;
  console.log(j);
  console.log(j);
  async function Modificar(pagoData: PagosEntity) {
    try {
      
       const data = await controlador.editPay(pagoData,credenciales.id,credenciales.nombreusuario)

      alert(` pago modificado con el siguiente estatus: ${data as Boolean}`)
     
      setOpen(false);
    }
    catch (error) {
      alert(error);
      setOpen(false);
    }
    // console.log(controlador);
    // alert("este es el json:  "+typeof(pagoData)+ JSON.stringify(pagoData))
  }




  const [fpago, setFPago] = React.useState<number>(0);
  const handleChangefpago = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFPago(parseInt(e.target.value));

  }


  const [date, setDate] = React.useState<string>(j.row.fecha.slice(0,11));
  const [time, setTime] = React.useState<string>(j.row.fecha.slice(12,-1));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const payForm = props.planCuentas


  return (
    <React.Fragment>
      <IconButton color="primary" variant="solid" size="sm" onClick={() => setOpen(true)} ><EditIcon /> </IconButton>



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

          <h2> Editar Pago #{j.row.id}</h2>
          <div className="form-group col-sm-7">
            <label htmlFor="card-holder"> forma de pago</label>
            <select id="card-holder" value={fpago} onChange={handleChangefpago} className="form-control mt-2 " aria-label="Card Holder" aria-describedby="basic-addon1">
              {payForm.map((items:any) => (
                <option value={items.id}>{items.metodo}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-sm-7">
            <label htmlFor="date-input">Fecha</label>
            <input
              type="date"
              id="date-input"
              value={date}
              onChange={handleDateChange}
              className="form-control mt-2"
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

          <IconButton color="primary" className="mt-2 " variant="solid" size="sm" onClick={() => Modificar({ id: j.row.id, fecha: `${date} ${time}:00`, monto: j.row.monto, motivo: j.row.motivo, idcliente: j.row.idcliente, idformadepago: fpago, referencia: j.row.referencia, idtaza: "jjj", sede: j.row.sede })}><SaveAsIcon /> Guardar Cambios  </IconButton>

        </Sheet>
      </Modal>
    </React.Fragment>
  );

}