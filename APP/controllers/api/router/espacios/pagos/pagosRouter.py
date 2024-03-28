from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.pagos.pagosEspaciosDAO import PagosEspaciosDAO,PagosEntity,PagosDetailEntity
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion
ROOM = RegisterAccion()
core= PagosEspaciosDAO()
urlBase = "/Pagos"
PAGOS=APIRouter(prefix=f"{urlBase}",tags=["PAGOS ESPACIOS"])
security = HTTPBearer()
validator=AuthDAO()
def aut(credendentials:HTTPAuthorizationCredentials= Depends(security)):
   token= credendentials.credentials
   validacion=validator.validarToken(token)
   if validacion['response']  == True:
      return True
   else:
     raise HTTPException(401,detail="token inauorizado ")
@PAGOS.post("/")
async def RegistraPAgo(Pago:PagosEntity):
    
    trigger=core.registrarPago(Pago)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@PAGOS.post("/Abonos")
async def registrarAbono(Pago:PagosEntity,auten:str=Depends(aut))-> PagosEntity:
   trigger= core.registrarAbono(Pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])  
@PAGOS.post("/MultiPago")
async def registrarMultiPago(Pago:PagosEntity,auten:str=Depends(aut))-> PagosEntity:
   trigger= core.registroMultipago(Pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 

@PAGOS.get("/details/sede/{sede}")
async def getDetailPayBySede(sede:str)-> list[PagosDetailEntity]:
   trigger = core.getAllPayDetail(sede)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 

@PAGOS.put("/edit/{idUser}/{usuario}")
async def editPago(pago:PagosEntity,idUser,usuario)-> bool:
   actividad = ROOM.registrarActividad(AccionUserEntity(id="j",
                                                        idUsuario=int(idUser),
                                                        nombre=usuario,
                                                        idOperacion=pago.id,
                                                        accion="edicion de pago espacios",
                                                        fecha="fdff",
                                                        sede=pago.sede)) 
   trigger = core.editPay(pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 
   

