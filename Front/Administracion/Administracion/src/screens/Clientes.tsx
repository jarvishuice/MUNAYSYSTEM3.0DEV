import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import {FormRegCliente} from '../Controller/Clientes/formRegistroCLientes';
import { TablaClientes } from '../Controller/Clientes/TablaClientes';


export  function ClientesScreen() {
    return (
      <Tabs sx={{mt:8}} aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Clientes</Tab>
          <Tab>Registrar Cliente</Tab>
         <Tab>Historico de Cliente</Tab>
        </TabList>
        <TabPanel value={0}>
  
         <TablaClientes/>
        </TabPanel>

        <TabPanel value={1}>
        <FormRegCliente/>
        </TabPanel>
        <TabPanel value={2}>
      <h1>HISTORICO CONSUMO</h1>
        </TabPanel>
      
      </Tabs>
    );
  }