""" 
Este es el procesador de pagos desde el api 
su implementacion puede variar dependiendo del entorno de produccion
"""
from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.pagos.pagosDAO import PagosDAO
from core.Entities.pagos.pagosEntity import PagosEntity,PagosDetailEntity
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion
ROOM = RegisterAccion()
core= PagosDAO()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
Pagos=APIRouter(prefix=f"{urlBase}/Pagos", tags=["Pagos"])
def aut(credendentials:HTTPAuthorizationCredentials= Depends(security)):
   token= credendentials.credentials
   validacion=validator.validarToken(token)
   if validacion['response']  == True:
      return True
   else:
     raise HTTPException(401,detail="token inauorizado ")

@Pagos.post("/")
async def RegistraPAgo(Pago:PagosEntity,auten:str=Depends(aut)):
    
    trigger=core.registrarPago(Pago)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
   
@Pagos.post("/Abonos")
async def registrarAbono(Pago:PagosEntity,auten:str=Depends(aut))-> PagosEntity:
   trigger= core.registrarAbono(Pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])  
   
@Pagos.post("/MultiPago")
async def registrarMultiPago(Pago:PagosEntity,auten:str=Depends(aut))-> PagosEntity:
   trigger= core.registroMultipago(Pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 
@Pagos.get("/details/sede/{sede}")
async def getDetailPayBySede(sede:str)-> list[PagosDetailEntity]:
    
   trigger = core.getAllPayDetail(sede)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 

@Pagos.put("/edit/{idUser}/{usuario}")
async def editPago(pago:PagosEntity,idUser,usuario)-> bool:
   actividad = ROOM.registrarActividad(AccionUserEntity(id="j",
                                                        idUsuario=int(idUser),
                                                        nombre=usuario,
                                                        idOperacion=pago.id,
                                                        accion="edicion de pago coffeshop",
                                                        fecha="fdff",
                                                        sede=pago.sede)) 
   trigger = core.editPay(pago)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge']) 
   
