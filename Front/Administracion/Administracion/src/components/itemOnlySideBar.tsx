import  ListItemDecorator  from "@mui/joy/ListItemDecorator";
import  ListItemContent from "@mui/joy/ListItemContent";
import  ListItem  from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from 'react'
import {Link } from "react-router-dom";
export function ItemOnlySideBar(props:any){
    const [index, setIndex] = useState(0);
    return(
        <ListItem key={"u"}>

                <ListItemButton
                  selected={index === 1}
                  color={index === 1 ? 'secondary' : undefined}
                  onClick={() => setIndex(1)}
                >
                  <ListItemDecorator>
                    {props.icon}
                  </ListItemDecorator>
                  <ListItemContent><Link  to={props.ruta} >{props.Nombre}</Link></ListItemContent>
                </ListItemButton>
              </ListItem>
    )
}