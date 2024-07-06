import Typography from '@mui/joy/Typography';
import React, { useEffect, useState } from 'react';
import Divider from '@mui/joy/Divider'
import { TasaDollarDAO } from '../core/Implements/finance/tasaDollarDAO';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { CuentasEntity } from '../core/Entities/cuentas/cuentasEntity';
import { CuentasDAO } from "../core/Implements/Cuentas/cuentasDAO";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AbonosDAO } from '../core/Implements/abonos/abonosDAO';
import { PagosEntity } from "../core/Entities/pagos/pagosEntity"
import { PagosEspaciosDAO } from "../core/Implements/pagos/pagosEspaciosDAO";
import CircularProgress from '@mui/material/CircularProgress';
import { DeudasClientesEspaciosDAO } from '../core/Implements/clients/deudasClientesEspaciosDAO'
const sede = localStorage.getItem("sede") ?? "sede";

/**
 * Description placeholder
 * @date 29/2/2024 - 2:50:22 p. m.
 *
 * @export
 * @param {*} props
 * @returns {*}
 */
export function FormularioPagoEspacios(props: any): any {
  //consulta abono 
  const [cargando, setCargando] = useState(false)
  const [abono, setAbono] = useState<number>(props.cliente.abono);
  async function fecthWallet() {
    try {
      const controladorAbonos = new AbonosDAO();
      const data = await controladorAbonos.consultasaldoAbonoEspacios(props.cliente.idCliente);
      setAbono(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fecthWallet()
  }, [props.cliente.id]);
  //==============================================
  //extractor formas de pagos 
  const [payForm, setPayForm] = useState<CuentasEntity[]>([])
  useEffect(() => {
    async function fecthPlanCuentas() {
      try {
        const controladorCuentas = new CuentasDAO();
        const data = await controladorCuentas.getCuentasBySede(sede);
        setPayForm(data);
      } catch (error) {
        console.error(error);
      }
    }
    fecthPlanCuentas();
  }, []);
  //=============================================================
  //extractor tasa bcv 
  const [tasa, setTasa] = useState<number>(0);
  useEffect(() => {
    async function fecthTasa() {
      try {
        setCargando(true)
        const controladorTasa = new TasaDollarDAO();
        const data = await controladorTasa.ObtenerTazaActual();
        setTasa(data);
      } catch (error) {
        console.error(error);
      }
      finally {
        setCargando(false);
      }

    }
    fecthTasa();
  }, []);
  //===============================================================



  //inputs========================================================= 
  const [referencia, setReferencia] = useState("  ")
  const cambioReferencia = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferencia(e.target.value);
  }
  const [iMonto, setIMonto] = useState(0.00)
  const cambioIMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIMonto(Number(e.target.value));
  }
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {

    setAge(event.target.value);
  };
  //======================================================================

  const reinicio = () => {

    setReferencia(" ");
    setIMonto(0.00);
    setAge('');
    fecthWallet();
  }
 
  //multipago
  async function Multipago(pagoData: PagosEntity) {
    try {
      setCargando(true);
      const contorladorPagos = new PagosEspaciosDAO();
      const data = await contorladorPagos.RegMultipago(pagoData);
      if (data != null) {
        alert(`Pago registrado de m,anera correcta bajo la modalidad de multipago con el #${data.id}`)

      }

    } catch (error) {
      console.error(error);
    }
    finally {
      reinicio()
      setCargando(false)
    }



  }

  //=================
  //cerrrar deuda 
  async function SaldarDeudas(Rwallet: number, Dwallet: number, pago: PagosEntity) {
    setCargando(true)

    if (iMonto > props.cliente.deuda - abono) {
      const x = confirm(`El cliente desea abonar ${iMonto - (props.cliente.deuda - abono)} `)
      if (x === true) {
        pago.monto = iMonto;
        Rwallet = iMonto - (props.cliente.deuda - abono)
      }
      else {
        Rwallet = 0
        pago.monto = props.cliente.deuda - abono
        Dwallet = abono
      }
    }



    try {
      const controladorDeudaClientes = new DeudasClientesEspaciosDAO();
      const data = await controladorDeudaClientes.SaldarDeudaClientes(Rwallet, Dwallet, pago)
      if (data != null) {
        alert(`deuda pagada con el id de pago ${data.id}`);
        reinicio()
        // window.location.reload();
      }

    }
    catch (error) {
      alert(`Error al intentar saldar la deuda detail ${(error)}`)
      console.error(error)
    }
    finally {
      setCargando(false)
    }
  }
  //===================

  const totalApagar = Number(props.cliente.deuda - abono).toFixed(2)



  return (<div className="formularioPago" key="FormularioPAgo">
    <div key="informacion cliente">
      <Typography key={"nombreCLiente"} mt={2} color="neutral" noWrap={true} variant="plain" level="h4" >
        CLIENTE:{props.cliente.nombre.toUpperCase()}
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} key={"ci"} noWrap={true} color="neutral" level="body-sm" >
        CI:{props.cliente.ci}
      </Typography>

      <Divider />
      <Typography sx={{ fontWeight: 'bold' }} key={"walletCard"} noWrap={true} color="neutral" level="body-xs" >
        ABONOS:{abono}$
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} key={"tasaBCV"} noWrap={true} color="neutral" level="body-xs" >
        BCV:{tasa}$
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} key={"total "} noWrap={true} color="neutral" level="body-xs" >
        TOTAL:{Number(props.cliente.deuda).toFixed(2)}$
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} key={"total a pagar "} noWrap={true} color="neutral" level="body-xs" >
        TOTAL A PAGAR:{Number(props.cliente.deuda - abono).toFixed(2)}$
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }} key={"total a pagar bs"} noWrap={true} color="neutral" level="body-xs" >
        TOTAL A PAGAR BS:{Number((props.cliente.deuda - abono) * tasa).toFixed(2)}
      </Typography>

    </div>
    <Divider />
    <div key="infoPAy">
      <center> <h4> informacion pago </h4></center>
      <center>  <Stack sx={{ mt: 1, flexWrap: 'wrap', display: "flex" }} spacing={1}>
        <FormControl sx={{ display: "flex", width: "100%" }}>
          <TextField size="small" sx={{ mt: 0.1, ml: 1, width: "97%" }} id="outlined-basic" value={referencia} onChange={cambioReferencia} label="REFERENCIA" color="primary" />
          <TextField inputProps={{
            min: 0.1, // Valor mínimo
            // Valor máximo
          }} size="small" sx={{ mt: 1, ml: 1, width: "97%" }} id="outlined-basic" onChange={cambioIMonto} value={(iMonto===0?null:iMonto)} type="number" label="MONTO" placeholder={`${Number(props.cliente.deuda - abono).toFixed(2)}`} color="primary" />

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            size="small"
            sx={{ width: "97%", heigth: 10, mt: 1, ml: 1 }}
            label="Forma de pago"
            onChange={handleChange}
          > <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {payForm.map((item: any) => ((<MenuItem value={item.id}>{item.metodo}</MenuItem>)))}   </Select>
        </FormControl>
      </Stack></center>


    </div>
    <Box sx={{ mt: 2, p: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Button disabled={(Number(iMonto) < Number(totalApagar)) || (Number(age) < 1) ? true : false}
        sx={{ width: "30%" }} color="success" onClick={() => {
          SaldarDeudas(0, abono, {
            id: 'f',
            fecha: "f",
            monto: Number(iMonto),
            motivo: "pago",
            idcliente: props.cliente.idCliente,
            idformadepago: Number(age),
            referencia: referencia,
            idtaza: "d",
            sede: sede,

          })
        }}>{cargando == true ? <CircularProgress color="inherit" /> : "PAGAR"}</Button>
      <Button color={"warning"} disabled={Number(iMonto) != 0 && (iMonto <= Number(totalApagar)&& Number(age) > 0) ? false : true} onClick={() => {
        Multipago({
          id: "f",
          fecha: "f",
          monto: Number(iMonto) || 0.0,
          motivo: "Multipago",
          idcliente: props.cliente.idCliente,
          idformadepago: Number(age),
          referencia: referencia,
          idtaza: "d",
          sede: sede,
        })
      }} >{cargando == true ? <CircularProgress color="inherit" /> : "MULTIPAGO/ABONO"}</Button>

    </Box>



  </div>
  )

}
