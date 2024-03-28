from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.reports.coffeshop.HTMLCIERREDAO import ReportCierreDAO
from fastapi.responses import HTMLResponse
from fastapi.responses import FileResponse

core= ReportCierreDAO()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
ReportCierreHTML=APIRouter(prefix=f"{urlBase}/Reports/coffeshop/cierre/html", tags=["Reports"])
@ReportCierreHTML.get("/{sede}",response_class=HTMLResponse)
async def reporteInventario(sede):
     trigger=core.generarCierre(sede)
     archivo =trigger['response']
     if trigger['status']==True:
        archivo=trigger['response']
        return trigger['response']
     else:
         raise HTTPException(400,f"{trigger['mesagge']}")