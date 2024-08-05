
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
//import { RegistroVISITA } from '../components/registroVisita';
import { VisitasTable } from '../components/VisitasTable';
//import { FormRegVisitante } from '../components/registroVisitante';
import { VisitantesTable } from '../components/tableVisitantes';
//import { Form } from 'react-router-dom';
import { FormRegistroVisita } from '../Controller/Visitas/formRegistroVisitas';




export  function VisitantesScreen() {
  return (
    <Tabs sx={{mt:10}} aria-label="Basic tabs" defaultValue={0}>
      <TabList>
        <Tab>Visitas</Tab>
        <Tab>Registrar Visita</Tab>
       
        <Tab>Visitantes</Tab>
      </TabList>
      <TabPanel value={0}>
      <VisitasTable/>
      </TabPanel>
      <TabPanel value={1}>
      <FormRegistroVisita></FormRegistroVisita>
      {/*<RegistroVISITA/>*/}
      </TabPanel>
 
      <TabPanel value={2}> 
      <VisitantesTable></VisitantesTable>
      </TabPanel>
    </Tabs>
  );
}