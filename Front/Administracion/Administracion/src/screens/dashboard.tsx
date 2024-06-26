import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { DashboardCoffe } from "../Controller/Dashboard/DashboardCoffe";
import { DashboardEspacios } from '../Controller/Dashboard/DashboardEspacios';
export function Dashboard(){
    return(<Tabs sx={{mt:8}} aria-label="Basic tabs" defaultValue={0}>
    <TabList>
      <Tab>COFFESHOP</Tab>
      <Tab>ESPACIOS</Tab>

    </TabList>
    <TabPanel value={0}>
        <DashboardCoffe></DashboardCoffe>
    </TabPanel>

    <TabPanel value={1}>
      <DashboardEspacios></DashboardEspacios>
    </TabPanel>
  </Tabs>
    )
}