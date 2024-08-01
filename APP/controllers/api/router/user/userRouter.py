import shutil
from fastapi import APIRouter, Depends,Request,HTTPException,UploadFile,File,Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from core.Implements.auth.authDAO import AuthDAO
from core.Interface.User.Iuser import IUser
from core.Implements.user.userDAO import UserDAO
from core.Entities.user.usersEntity import UsersEntity
core= UserDAO()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
usuarios=APIRouter(prefix=f"{urlBase}/User", tags=["User"])

def aut(credendentials:HTTPAuthorizationCredentials= Depends(security)):
   token= credendentials.credentials
   validacion=validator.validarToken(token)
   if validacion['response']  == True:
      return True
   else:
     raise HTTPException(401,detail="acceso denengado token no valido  ")
@usuarios.get("/all")
async def getAllUsers():
    trigger=core.getAllUsers
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@usuarios.post("/")
async def crearUsuario(User:UsersEntity):

    trigger=core.crearUser(User)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@usuarios.get("/{username}") #hay que borrar este end point porqu ees para probar la funcion 
async def BuscarUsuario(username:str)-> UsersEntity:
    trigger=core.busquedaUsuario(username)
    
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@usuarios.put("/status/{status}/")
async def ActualizarStatusUser(status,credential:UsersEntity):
   trigger=core.cambiarEstatus(credential,status)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])


@usuarios.put("/update/password/{idUser}/{password}")
async def ActualizarPassword(idUser,password,auten:str=Depends(aut))-> bool:
   trigger=core.ActualizarPassword(idUser,password)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])

@usuarios.post("/upImageProfile/{idUser}")
async def upload_image(idUser:int,image: UploadFile = File(...)):
   try:
      print(f"iniciando la carga de la imagen de perfil del usuario -> {idUser}") 
      save_path = f"views/img/assets/{image.filename}"
      UrlFile=f"http://191.97.17.26:8011/v3.0/assets/img/{image.filename}"
      with open(save_path, "wb") as buffer:
         shutil.copyfileobj(image.file, buffer) 
      print(f"imagen guardada en ->{save_path}")
      trigger=core.actualizarImageProfile(idUser=idUser,path=UrlFile)
   except Exception as e:
         raise HTTPException(400,e)

   return True

      

@usuarios.put("/")
async def updateUser(user:UsersEntity,auten:str=Depends(aut)) ->bool:
   trigger=core.actualizarUsuario(user)
   if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
   else:
       raise HTTPException(400,trigger['mesagge'])
      

      
 