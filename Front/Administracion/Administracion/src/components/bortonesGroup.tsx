import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';





export  function BotonesGroup(props:any) {
    return (
      <ButtonGroup
      variant="solid"
      
        
        aria-label="Disabled button group"
      >
     {props.botones.map((boton:any)=>(
            <Button  size="sm" color="neutral" key={boton.id} onClick={()=>props.accion(boton.valor)}>{boton.nombre}</Button>
     ))}
        
      </ButtonGroup>
    );
  }
