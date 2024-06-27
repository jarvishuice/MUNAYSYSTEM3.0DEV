import Chip from '@mui/material/Chip';
export function StatusFacturas(porps:any){
    const porValidar=<Chip size="small"  color='warning' label="Revisar"/>
    const validada=<Chip size="small"  color='success' label="Valida"/>
    const consolidada=<Chip size="small" label="Impresa"/>
    switch(porps.status){
   

    case 1:
        return porValidar
    case 2: 
    return validada
    case 3 :
        return consolidada     
    


}




}