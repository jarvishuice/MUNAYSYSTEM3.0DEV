

import  Avatar  from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '../App.css'



export  function UsuarioInfoCard(props:any) {
 

  return (
    <Grid container alignItems="center"  className="usuarioInfoCard">
      <Badge
      
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<small> </small>}
      >
        <Avatar alt="Jaydon Frankie" src={props.imagenPerfil}  />
      </Badge>
     <center> <Typography  component="h2">
       {(props.usuario).toUpperCase()}
      </Typography></center>
    </Grid>
  );
}
