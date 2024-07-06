import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import AdbIcon from '@mui/icons-material/Adb';
import "../App.css"




export function BarraNavegacion(props: any) {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  console.log(anchorElUser);

  return (
    <AppBar className={"barra-nav"} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"

              onClick={() => props.side(true)}
            >
              <MenuIcon />

            </IconButton>

          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="salvoNav"
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <h6 className="sede">SEDE {props.sede ?? "Jalisco"}</h6>
                <Avatar alt="Remy Sharp" src={props.imagenPerfil} />
              </IconButton>
            </Tooltip>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
