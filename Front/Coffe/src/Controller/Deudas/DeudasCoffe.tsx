import { useState, useEffect } from "react";
import {CardDeudas} from  "../../components/cardDeudas";
import { DeudaClientesEntity } from "../../core/Entities/clients/dedudaClientes";
import { DeudasClientesDAO } from "../../core/Implements/clients/deudasClientesDAO";
import {Cargando} from "../../screens/Cargando";

import Box from '@mui/joy/Box';
import { BusquedaCoffe } from "./busquedaCoffe";

export function DeudasCoffe(){
    const sede = localStorage.getItem('sede') ?? 'por favor inicie sesión para poder crear una orden';
    const [deudas,setDeudas]= useState<DeudaClientesEntity[]>([]);
    const [cargando,setCargando] = useState(false)
    const contenedorTarjetas= screen.width >= 800 ? "97%":600;


    async function fecthDeuda() {
          try {
              setCargando(true);  
              const ControladorDeudas = new DeudasClientesDAO();
              const data = await ControladorDeudas.DeudasClientesBysede(sede);
              setDeudas(data);
              setCargando(false);
            } catch (error) {
              console.error(error);
            }
      }
    
  
      useEffect(() => {
        fecthDeuda();
      }, []);



      {if (cargando){
        return <Cargando></Cargando>
      }

      }
      return (
        <div>
          <BusquedaCoffe data={deudas} />
        <Box
      sx={{
        width: '100%',
        maxWidth: contenedorTarjetas,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 2,
        mt:3,
        ml:3,
      }}
    >  
            {deudas.map((item:DeudaClientesEntity)=>{
                return <CardDeudas key={item.ci} 
                                   titulo={item.nombre} 
                                   cedula={item.ci}
                                   cantidad={item.cantidadOrdenes} 
                                   precio={(item.deuda-item.abono).toFixed(2)}
                                   id={item.idCliente}
                                   data={item}
                               
                                   />
            })}
    </Box>
    </div>
      )


}