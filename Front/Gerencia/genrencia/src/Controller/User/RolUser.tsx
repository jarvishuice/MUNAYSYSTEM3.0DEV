import Chip from '@mui/material/Chip';
export function RolUser(porps: any) {
    const BARISTA = <Chip size="small" color='primary' label="BAR" />
    const RECEPCION = <Chip size="small" color='success' label="REC" />
    const ADMINISTRACION = <Chip size="small" color='warning' label="ADM" />
    switch (porps.status) {


        case 1:
            return BARISTA
        case 2:
            return RECEPCION
        case 3:
            return ADMINISTRACION



    }




}