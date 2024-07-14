import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ListItemDecorator from '@mui/joy/ListItemDecorator';


import "../App.css";
export function ItemsSideBar(props:any):any{
    return(
        <AccordionGroup 
        transition={{
            initial: "0.3s ease-out",
            expanded: "0.2s ease",
          }}
        >
            <Accordion>            <AccordionSummary>
                <ListItemDecorator>
                    {props.icon}
                  </ListItemDecorator>
                  {props.Nombre}</AccordionSummary>

                  <AccordionDetails>
                  {props.childs.map((item:any)=>{
                    return item;
                  }
                  )}
                
                  </AccordionDetails>
                  </Accordion>


        </AccordionGroup>
    )
}