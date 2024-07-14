import { useState, useEffect } from "react";
import {CardDeudasEspacios} from  "../../components/cardDeudasEspacios";
import { DeudaClientesEntity } from "../../core/Entities/clients/dedudaClientes";
import { DeudasClientesEspaciosDAO } from "../../core/Implements/clients/deudasClientesEspaciosDAO";
import {Cargando} from "../../screens/Cargando";
import Box from '@mui/joy/Box';
import { BusquedaEspacios } from "./busquedaEspacios";

const sede= localStorage.getItem("sede")??"inica seccion"
export function DeudasEspacios(){
    const contenedorTarjetas= screen.width >= 800 ? "97%":600;
    const [loading,setLoading]=useState(false)
    const [deudas,setDeudas] = useState<DeudaClientesEntity[]|[]>([])
    async function fecthDeudas(){
        try{
            setLoading(true);
            const ControladorDeudas= new DeudasClientesEspaciosDAO()
            const data = await ControladorDeudas.DeudasClientesBysede(sede);
            setDeudas(data);
            
            }
        catch(error){
            console.error(error)
            }
        finally{
            setLoading(false)
         }

    }
    useEffect(() => {
        fecthDeudas();
      }, []);

    if (loading){
    return <Cargando/>}
    
    return(
        <div>
        <BusquedaEspacios data={deudas} />
        <Box 
            sx={{
                width: '100%',
                maxWidth: contenedorTarjetas,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 2,
                mt:3,
                ml:3,}}>
                        {deudas.map((item:DeudaClientesEntity)=>{
                return <CardDeudasEspacios key={item.ci} 
                                   titulo={item.nombre} 
                                   cedula={item.ci}
                                   cantidad={item.cantidadOrdenes} 
                                   precio={item.deuda-item.abono}
                                   id={item.idCliente}
                                   data={item}
                               
                                   />
            })}
        </Box> </div>
        )
}