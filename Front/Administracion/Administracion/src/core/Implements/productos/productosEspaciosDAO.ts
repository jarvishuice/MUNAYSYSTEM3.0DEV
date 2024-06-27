import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";
import { IProductos } from "../../Interfaces/productos/Iclientes";
import { ProductosEntity } from "../../Entities/productos/productos";

export class ProductosEspaciosDAO extends(IProductos){
    private sede = localStorage.getItem('sede') ?? "seleccione una sede"
    private paths =  new PATHMUNAYSYSY()
    private API=  this.paths.PathAPI()
    private prefijo='Espacios'
    private headers={  
         'accept': 'application/json',
        'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`

    }
    constructor(){
        super();
        console.log("nueva instancia de clientes ")
        this.paths= new PATHMUNAYSYSY()
        this.sede = localStorage.getItem('sede') ?? "seleccione una sede"
    }
    async BuscarProductos(name:string): Promise<ProductosEntity[]> {
     try{ 
        const response =await fetch(`${this.API}${this.prefijo}/Productos/search/${name}/${this.sede}`,{headers:this.headers,});
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
           const response =await fetch(`${this.API}${this.prefijo}/Productos/filterCategoria/${categoria}/${sede}`,{headers:this.headers,});
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
      async getProductos():Promise<ProductosEntity[]|[]>{
        try{ 
          const response =await fetch(`${this.API}${this.prefijo}/Productos/sede/${localStorage.getItem('sede')}`,{headers:this.headers,});
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
      async updateProducto(sede: string, producto: any): Promise<boolean> {
        try{ 
          const response =await fetch(`${this.API}${this.prefijo}/Productos/update/${sede}`,{method:"PUT",headers:this.headers,body:producto});
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
      
          async createProducto(producto:ProductosEntity): Promise<ProductosEntity|boolean> {
            try{ 
              const response =await fetch(`${this.API}${this.prefijo}/Productos/crear`,{method:"POST",headers:this.headers,body:JSON.stringify(producto)});
              if (response.ok) {
                  const data = await response.json();
                  console.log(data)
                  
                  return data as ProductosEntity;
                } if(response.status== 404){
                  alert("No se ha podido conectar con el servidor ")
                  return  false;
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