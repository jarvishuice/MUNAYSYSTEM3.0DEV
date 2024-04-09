import { PATHMUNAYSYSY } from "../../../Config/routes/pathsMuanaysys";
import { PagosEntity } from "../../Entities/pagos/pagosEntity";
import { Iwallet } from "../../Interfaces/wallet/Iwallet";
export class WalletDAO extends(Iwallet){
    private paths =  new PATHMUNAYSYSY()
    private API=  this.paths.PathAPI()
    private prefijo='Wallet'
    private headers={  
         'accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
     'content-type': 'application/json'
    }
    constructor(){
        super();
        console.log("nueva instancia de clientes ")
        this.paths= new PATHMUNAYSYSY()
        
    }
    async consultasaldoWallet(idCliente:number):Promise<number|any>{
        try{ 
            const response =await fetch(`${this.API}${this.prefijo}/consultaSaldo/${idCliente}`,{headers:this.headers,});
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data
              } if(response.status== 404){
                alert("No se ha podido conectar con el servidor ")
                return 0;
              }
              if(response.status== 400){
                alert(response.statusText)
                return 0;
              }
              if(response.status == 401){
                localStorage.clear()
                window.location.href="/index.html"
                return 0
              }
               else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
              return 0;
            }

    }
    async RecargarWallet(pago:PagosEntity):Promise<PagosEntity|null>{
      try{ 
        console.log(pago)
        const response =await fetch(`${this.API}PagosWallet/REcargaWallet/`,{method:'POST',headers:this.headers,body:JSON.stringify(pago)});
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data as PagosEntity;
          } if(response.status== 404){
            alert("No se ha podido conectar con el servidor ")
            return null;
          }
          if(response.status== 400){
            alert(response.statusText)
            return null;
          }
          if(response.status == 401){
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


}