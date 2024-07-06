from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.pedidos.pedidosDAO import PedidosDAO
from core.Entities.pedidos.pedidosEntity import PedidosEntity
from core.Implements.auth.authDAO import AuthDAO
from fastapi.responses import HTMLResponse,FileResponse

urlBase = "/MUNAY/nest"
VIEWS=APIRouter(prefix=f"{urlBase}/VIEWS", tags=["VIEWS"])
   

@VIEWS.get("/{perfilType}/{nameFile}")
async def getVista(perfilType:str,nameFile:str,):
    return  FileResponse( f"views/{perfilType}/{nameFile}")
@VIEWS.get("/assets/{perfilType}/{nameFile}")
async def getAssets(perfilType:str, nameFile:str,):
    return  FileResponse( f"views/{perfilType}/assets/{nameFile}")

@VIEWS.get("/{perfilType}/{nameFile}/{t}/{s}")
async def getVista(perfilType:str,nameFile:str,):
    return  FileResponse( f"views/{perfilType}/{nameFile}")

@VIEWS.get("/{perfilType}/{nameFile}/{t}")
async def getVista(perfilType:str,nameFile:str,):
    return  FileResponse( f"views/{perfilType}/{nameFile}")

