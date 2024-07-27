from core.Implements.login.loginDao2 import LoginDao2
from core.Entities.user.usersEntity import UsersEntity
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response
from core.Implements.login.loginDAO import LogginDAO
from core.Entities.user.loginEntity import LoginEntity
core= LogginDAO()

urlBase = "/MUNAY/nest"
Loggin=APIRouter(prefix=f"{urlBase}/Loggin", tags=["Loggin"])

@Loggin.post("/")
async def IniciarSeccion(Loggin:LoginEntity):
    
    trigger=core.IniciarSeccion(Loggin)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Loggin.post("/logout/")
def Logout(user:UsersEntity):
    trigger=core.cerrarSeccion(user)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Loggin.post("/2")
async def IniciarSeccion(Loggin:LoginEntity):
    core2 = LoginDao2()
    trigger=core2.login(username= Loggin.nombreUsuario,password=Loggin.password)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Loggin.post("/2/logout/{idUser}")
async def Cerrar(idUser:int):
    core2 = LoginDao2()
    trigger=core2.logout(idUser= idUser)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])