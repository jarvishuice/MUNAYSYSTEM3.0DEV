from fastapi.responses import HTMLResponse
from core.Implements.facturas.facturasDAO import FacturasDAO
from core.Entities.facturas.facturaEntity import FacturaEntity,FacturaEncabezadoEntity
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion

urlBase = "/MUNAY/nest"
FACTURAS = APIRouter(prefix=f"{urlBase}/facturas", tags=["INVOICES"])
core = FacturasDAO()
@FACTURAS.get("/all/{sede}")
async def getAll(sede:str):
    trigger = core.getAllFacturas(sede)
    if trigger['status'] ==True:
        respuesta= trigger['response']
        return respuesta
    else:
        raise HTTPException(400,trigger['mesagge'])
@FACTURAS.put("/update/{sede}")
async def update(encabezado:FacturaEncabezadoEntity,sede:str):
    trigger = core.updateFactura(encabezado=encabezado,sede=sede)
    if trigger['status'] ==True:
        respuesta= trigger['response']
        return respuesta
    else:
        raise HTTPException(400,trigger['mesagge'])

@FACTURAS.get("/html/{sede}/{id}",response_class=HTMLResponse)
async def getHtml(sede:str,id:int):
    trigger = core.getHtmlFactura(sede=sede,id=id)
    if trigger['status'] ==True:
        respuesta= trigger['response']
        return respuesta
    else:
        raise HTTPException(400,trigger['mesagge'])
