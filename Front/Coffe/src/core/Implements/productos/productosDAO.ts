import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";
import { IProductos } from "../../Interfaces/productos/Iclientes";
import { ProductosEntity } from "../../Entities/productos/productos";

export class ProductosDAO extends(IProductos){
    private paths =  new PATHMUNAYSYSY()
    private API=  this.paths.PathAPI()
    private prefijo='Productos'
    private headers={  
         'accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    constructor(){
        super();
        console.log("nueva instancia de clientes ")
        this.paths= new PATHMUNAYSYSY()
        
    }
    async BuscarProductos(name:string): Promise<ProductosEntity[]> {
     try{ 
        const response =await fetch(`${this.API}${this.prefijo}/search/${name}`,{headers:this.headers,});
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data as ProductosEntity[];
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
     async ProductosByCategoriaandSede(categoria:string,sede:string): Promise<ProductosEntity[]> {
        try{ 
           const response =await fetch(`${this.API}${this.prefijo}/filterCategoria/${categoria}/${sede}`,{headers:this.headers,});
           if (response.ok) {
            
               const data = await response.json();
               console.log(data)
               return data as ProductosEntity[];
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
    

}