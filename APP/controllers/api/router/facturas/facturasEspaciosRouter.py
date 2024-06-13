from core.Implements.facturas.facturasEspaciosDAO import FacturasEspaciosDAO
from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion


core= FacturasEspaciosDAO()
ROOM=RegisterAccion()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
FACTURAS_ESPACIOS=APIRouter(prefix=f"{urlBase}/facturas/espacios", tags=["FACTURAS"])
def aut(credendentials:HTTPAuthorizationCredentials= Depends(security)):
   token= credendentials.credentials
   validacion=validator.validarToken(token)
   if validacion['response']  == True:
      return True
   else:
     raise HTTPException(401,detail="token inauorizado ")
 



   
@FACTURAS_ESPACIOS.get("/generar/{sede}/{idCliente}/")
async def generar(sede,idCliente,): 
   trigger = core.generarFactura(idCliente=idCliente,sede=sede)   
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])
    
@FACTURAS_ESPACIOS.get("/search/{id}/{sede}")
async def getDeatil(id,sede):
   trigger = core.getFacturaById(id,sede)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])
@FACTURAS_ESPACIOS.get("/filter/{status}/{sede}")
async def filterStatus(status:int,sede:str):
   trigger = core.filterFacturaByStatus(sede,status)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])