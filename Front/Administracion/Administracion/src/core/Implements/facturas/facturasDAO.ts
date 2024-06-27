import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";
import { EncabezadoFacturaEntity, FacturaEntity } from "../../Entities/facturas/FacturasEntity";
import { IFacturas } from "../../Interfaces/Facturas/IFacturas";

export class FacturasDAO extends IFacturas{
   
    private paths =  new PATHMUNAYSYSY()
    private API=  this.paths.PathAPI()
    private prefijo='facturas'
    private headers={  
         'accept': 'application/json',
         'Content-Type': 'application/json' ,
    'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    async getAllFacturas(sede: string): Promise<FacturaEntity[] | []> {
        try{ 
            const response =await fetch(`${this.API}${this.prefijo}/all/${sede}`,{headers:this.headers,});
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                
                return data as FacturaEntity[];
              } if(response.status== 404){
                alert("No se ha podido conectar con el servidor ")
                return [];
              }
              if(response.status== 400){
                alert(response.statusText)
                return [];
              }
              if(response.status == 401){
                localStorage.clear()
                window.location.href="/index.html"
                return []
              }
               else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
              return [];
            }
    }
    async updateFactura(sede: string, encabezado: EncabezadoFacturaEntity): Promise<boolean> {
      try{ 
        const response =await fetch(`${this.API}${this.prefijo}/update/${sede}`,{method:"PUT",headers:this.headers,body:JSON.stringify(encabezado)});
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            
            return true;
          } if(response.status== 404){
            alert("No se ha podido conectar con el servidor ")
            return false;
          }
          if(response.status== 400){
            alert(response.statusText)
            return false;
          }
          if(response.status == 401){
            localStorage.clear()
            window.location.href="/index.html"
            return false
          }
           else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          console.error(error);
          return false;
        }}
    
 

}