import React from "react";
import { BusquedaCliente } from "../../components/BusquedaCliente";
import { ClientesEntity } from "../../core/Entities/clients/clients";
import { Button, FormControl } from "@mui/joy";
import TextField from '@mui/material/TextField';
import { CuentasEntity } from "../../core/Entities/cuentas/cuentasEntity";
import { CuentasDAO } from "../../core/Implements/Cuentas/cuentasDAO";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { WalletDAO } from "../../core/Implements/wallet/walletDAO";

const sede= localStorage.getItem('sede')??"sede";
export function RecargaWalletCoffe(){

const [cliente,setCliente]=React.useState<ClientesEntity>({ "id": 0,
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
"deuda": null})
function seleccionCliente(cliente:ClientesEntity){
 setCliente(cliente);

}
const [monto,SetMonto] = React.useState(0)
function cambioMonto(e:React.ChangeEvent<HTMLInputElement>){
SetMonto(Number(e.target.value))
}
const [referencia,setReferencia] = React.useState(" ")
function cambioReferencia(e:React.ChangeEvent<HTMLInputElement>){
setReferencia(e.target.value)
}
//extractor formas de pagos 
  const [payForm,setPayForm]=React.useState<CuentasEntity[]>([])
  React.useEffect (()=>{
      async function fecthPlanCuentas() {
          try {
              const controladorCuentas =  new CuentasDAO();
              const data = await controladorCuentas.getCuentasBySede(sede);
              setPayForm(data);
            } catch (error) {
              console.error(error);
            }
      }
      fecthPlanCuentas();
    },[]);
    //=============================================================
    const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  let activo=false;
  if (monto > 0 &&cliente.id !=0&& age != "" ){
     activo =false
}
else{
activo=true;
}

 async function RecargaWallet(){
 try{   
const controladorWallet = new WalletDAO();
const data = await controladorWallet.RecargarWallet({id:"x",
fecha:"f",
monto:Number(monto),
motivo:`Recarga Wallet ${sede}`,
idcliente:Number(cliente.id),
idformadepago:Number(age),
referencia:referencia,
idtaza:"d",
sede:sede})
if (data != null){
    alert("Recarga de wallet realizada de manera exitosa exitosa bajo el id"+data.id)
    SetMonto(0)
    setReferencia("")
    setAge(" ") 
}
}
catch (error) {
alert(`error al realizar la recarga `)
  console.error(error);
}}

return(
<center>
    <div className="grid-2-5-5">
        <div className="entrada">
        
            <BusquedaCliente select={seleccionCliente}/>
            <center>
                <FormControl>
                    <center><TextField label="Monto" size="small"value={monto} onChange={cambioMonto} sx={{mt:1,ml:0,width:"75%"}}name="monto" id="outlined-basic" inputProps={{"min":0}}type="number"></TextField>
                    <TextField label="referencia"  type="text" size="small" value={referencia} onChange={cambioReferencia} sx={{mt:1,ml:0,width:"75%"}}name="referencia" />
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        size="small"
                        sx={{width:"75%",heigth:10,mt:1,ml:0}}
                        label="Forma de pago"
                        onChange={handleChange}> 
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {payForm.map((item:any)=>((<MenuItem value={item.id}>{item.metodo}</MenuItem>)))}   
                    </Select> </center>
                </FormControl>
            </center>    
        </div>
        <div className="visual">
            <h3>informacion</h3>
            <p> id:{cliente.id} <br />
                nombre:{cliente.nombre}<br/>
                ci:{cliente.ci}<br/>
                Monto:{monto}$<br/>
                Referencia:{referencia}<br/>
                Forma de Pago:{age}</p>
            <Button onClick={()=>RecargaWallet()}   sx={{bgcolor:"green"}} disabled={activo}> Recargar</Button>  
        </div>


    </div>
    
    </center>
    
    )}