from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion

from core.Implements.auth.authDAO import AuthDAO
core=  RegisterAccion()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
Actividad=APIRouter(prefix=f"{urlBase}/Actividad", tags=["Actividad"])

@Actividad.get("/get/all/actividad")
async def GetAllActividades():
    trigger = core.getAllActivity
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Actividad.get("/get/all/actividad/{sede}")
async def GetAllActividadBySede(sede):
    trigger = core.getAllActivityBySede(sede)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Actividad.get("/get/all/actividad/{sede}/today")
async def GetAllActivityTodayBySede(sede):

    trigger = core.getAllActivityTodaySede(sede)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])
@Actividad.get("/get/all/actividad/today/alamacen/{alamacen}/sede/{sede}")
async def GetAllActivityTodaySedeAlmacen(almacen,sede):
    trigger = core.getAllActivityByAlmacenToday(sede,almacen)
    if trigger['status'] ==True:
       respuesta= trigger['response']
       return respuesta
    else:
       raise HTTPException(400,trigger['mesagge'])