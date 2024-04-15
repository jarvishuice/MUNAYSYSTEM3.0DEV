import Accordion from '@mui/joy/Accordion';
import Drawer from '@mui/joy/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemDecorator, {
  listItemDecoratorClasses,
} from '@mui/joy/ListItemDecorator'
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import {useState} from 'react';
import { BarraNavegacion } from './BarraNavegacion';
import { UsuarioInfoCard } from './UsuarioInfo';
import {ItemsCoffeshop} from "./itemsCoffeshop";
import {ItemsEspacios} from "./itemsEspacios";
import AccordionGroup from '@mui/joy/AccordionGroup';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import "../App.css";
import ModalClose from '@mui/joy/ModalClose';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { Outlet,Link } from "react-router-dom";

const drawerWidth = 230;


/**
 * Description placeholder
 * @date 6/2/2024 - 12:36:16 p. m.
 *
 * @export
 * @param {*} props
 * @returns {*}
 */
const FotoPerfil = JSON.parse(localStorage.getItem("user")??JSON.stringify({"id":0,"nombre":"inicie seccion","apellido":"inicie seccion","ci":"0","nombreusuario":"0","password":"🖕","token":"ss","status":"conectado","tipoUsuario":3,"urlImagen":"djdhd"}))
//alert(FotoPerfil.urlImagen) //descomentar para validar
export function SideBar(props: any): any {
  const [index, setIndex] = useState(0);
  const [open,setOpen] =useState(true)
  const toggleDrawer =
  (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
  
    setOpen(inOpen);
  };
  return (
    <><BarraNavegacion side={setOpen} imagenPerfil={FotoPerfil.urlImagen} sede= {props.sede}></BarraNavegacion>
      <div style={{ display: 'flex' }}>
        
      
        <Drawer open={open} onClose={toggleDrawer(false)}
        size="sm"

          sx={{

            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
         
          
        > 
       
      <ModalClose id="close-icon" sx={{ position: 'initial' }} onClick={()=> setOpen(false)} />
          <Toolbar> <img src="http://10.10.2.224:8050/assets/logonest.png" className='Logo-Sidebar' alt="" /> </Toolbar>
          <Divider className='divider'></Divider>
          <UsuarioInfoCard 
           usuario={FotoPerfil.nombreusuario??"nest"} imagenPerfil={FotoPerfil.urlImagen}>

          </UsuarioInfoCard>
          <div style={{ overflow: 'auto' }}>
            <List role="presentacion" key="side bar" aria-label="Sidebar"
              sx={{
                '--ListItem-paddingLeft': '0px',
                '--ListItemDecorator-size': '64px',
                '--ListItem-minHeight': '32px',
                '--List-nestedInsetStart': '13px',
                [`& .${listItemDecoratorClasses.root}`]: {
                  justifyContent: 'flex-end',
                  pr: '18px',
                },
                '& [role="button"]': {
                  borderRadius: '0 20px 20px 0',
                },
              }}><ListItem>
                <AccordionGroup  onClick={()=>(setOpen(false))}  className="itemsLista">
                  <Link  to="Dashboard">
                 <Accordion >
                <ListItemButton 
                className="itemsLista"
                  selected={index === 0}
                  color={index === 0 ? 'primary' : undefined}
                  onClick={() => setIndex(0)}
                >
                  <ListItemDecorator>
                    <AnalyticsIcon/>
                  </ListItemDecorator>
                  <ListItemContent>DASHBOARD</ListItemContent>
           
                </ListItemButton>
                
                </Accordion>
                </Link>
                </AccordionGroup>
              </ListItem>
              <ListItem>
                <AccordionGroup  onClick={()=>(setOpen(false))} className="itemsLista">
                <Link to="clientes">
                 <Accordion >
                <ListItemButton 
                className="itemsLista"
                  selected={index === 1}
                  color={index === 1 ? 'success' : undefined}
                  onClick={() => {setIndex(1),setOpen(false)}}
                >
                  <ListItemDecorator>
                    <PeopleIcon/>
                  </ListItemDecorator>
                  <ListItemContent>CLIENTES</ListItemContent>
           
                </ListItemButton>
                
                </Accordion>
                </Link>
                </AccordionGroup>
              </ListItem>
              <ListItem >
                
                <ListItemButton className="itemsLista"
                  selected={index === 2}
                  color={index === 2 ? 'success' : undefined}
                  onClick={() => setIndex(2)}
                >
                  <ItemsCoffeshop></ItemsCoffeshop>
                </ListItemButton>
              </ListItem>
              <Divider/>
              <ListItem >
                
                <ListItemButton className="itemsLista"
                  selected={index === 3}
                  color={index === 3 ? 'warning' : undefined}
                  onClick={() => setIndex(3)}
                >
                  <ItemsEspacios></ItemsEspacios>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <AccordionGroup  onClick={()=>(setOpen(false))} className="itemsLista">
                <Link to="gerencia/reportes">
                 <Accordion >
                <ListItemButton 
                className="itemsLista"
                  selected={index === 1}
                  color={index === 1 ? 'success' : undefined}
                  onClick={() => {setIndex(1),setOpen(false)}}
                >
                  <ListItemDecorator>
                    <SummarizeIcon/>
                  </ListItemDecorator>
                  <ListItemContent>REPORTES</ListItemContent>
           
                </ListItemButton>
                
                </Accordion>
                </Link>
                </AccordionGroup>
              </ListItem>
            </List>


          </div>
        </Drawer>
        <main  onClick={()=>setOpen(false)} style={{ flexGrow: 1, padding: 3 }}>
          <Outlet />
        </main>
      </div></>
  );
}