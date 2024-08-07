import { MetricCoffeshopEntity,PagosMetrictEntity,VentasProductosEntity } from "../../../Entities/metric/coffeshop/MetricCoffeshopEntity";

import { PATHMUNAYSYSY } from "../../../../Config/routes/pathsMuanaysys";

import { IMetricCoffeshop } from "../../../Interfaces/metric/coffeshop/IMetricCoffeshop";

export class MetricEspaciosDAO implements IMetricCoffeshop{
    private paths =  new PATHMUNAYSYSY()
    private API=  this.paths.PathAPI()
    private prefijo='metric/Espacios'
    private headers={  
         'accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    constructor(){
      console.log("nueva instancia de clientes ");
      this.paths = new PATHMUNAYSYSY();
    }
    async ExtraerMetricasBySede(sede:string): Promise<MetricCoffeshopEntity|null> {
        try{ 
            const response =await fetch(`${this.API}${this.prefijo}/${sede}`,{headers:this.headers,});
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data as MetricCoffeshopEntity
              } if(response.status== 404){
                alert("No se ha podido conectar con el servidor ")
                return null;
              }
              if(response.status== 400){
                //alert(response.statusText)
                return null;
              }if(response.status == 401){
                localStorage.clear()
                window.location.href="/index.html"
                return null
              }
               else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
              return null;
            }
       
   }
   async ExtraerMetricasGlobales(): Promise<MetricCoffeshopEntity|null> {
    try{ 
        const response =await fetch(`${this.API}${this.prefijo}/global`,{headers:this.headers,});
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data as MetricCoffeshopEntity
          } if(response.status== 404){
            alert("No se ha podido conectar con el servidor ")
            return null;
          }
          if(response.status== 400){
            alert(response.statusText)
            return null;
          }if(response.status == 401){
            localStorage.clear()
            window.location.href="/index.html"
            return null
          }
           else {
            throw new Error('Error en la solicitud');
    
          }
        } catch (error) {
          console.error(error);
          return null;
        }
   
}
async VentasProductos(sede:string):Promise<VentasProductosEntity[]|[]>{

  try{ 
    const response =await fetch(`${this.API}${this.prefijo}/VentasProductos/${sede}`,{headers:this.headers,});
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data as VentasProductosEntity[];
      } if(response.status== 404){
        alert("No se ha podido conectar con el servidor ")
        return [];
      }
      if(response.status== 400){
        alert(response.statusText)
        return [];
      }if(response.status == 401){
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
async payEspaciosToday(sede:string):Promise<PagosMetrictEntity|[]>{

  try{ 
    const response =await fetch(`${this.API}${this.prefijo}/pay/today/${sede}`,{headers:this.headers,});
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data as PagosMetrictEntity;
      } if(response.status== 404){
        alert("No se ha podido conectar con el servidor ")
        return [];
      }
      if(response.status== 400){
        alert(response.statusText)
        return [];
      }if(response.status == 401){
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


}