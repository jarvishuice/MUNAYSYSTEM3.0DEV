from core.Implements.auth.authDAO import AuthDAO
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.Implements.reports.gerenciales.reporteUnificadoDAO import ReporteUnificadoDAO
from core.Implements.reports.gerenciales.reporteUNificadoByFechasDAO import ReporteUnificadoByFechasDAO
from fastapi.responses import FileResponse
from fastapi.responses import HTMLResponse
core= ReporteUnificadoDAO()
coreFechas=ReporteUnificadoByFechasDAO()
security = HTTPBearer()
validator=AuthDAO()
urlBase = "/MUNAY/nest"
GERENCIA = APIRouter(prefix=f"{urlBase}/gerencia/reporte", tags=["gerencia"])
@GERENCIA.get("/{sede}")
async def reporteUnificado(sede):
    trigger= core.generar(sede)
   
    if trigger['status']==True:
        archivo=trigger['response']
        return FileResponse(path=archivo,media_type='application/pdf', filename=f'ReporteUnificado{sede}.pdf')
    else:
         raise HTTPException(400,f"{trigger['mesagge']}")
@GERENCIA.get("/html/{sede}",response_class=HTMLResponse)
async def reporteUnificadoHTML(sede):
    trigger= core.html(sede)
   
    if trigger['status']==True:
        archivo=trigger['response']
        return archivo
    else:
         raise HTTPException(400,f"{trigger['mesagge']}")
@GERENCIA.get("/html/filter/range/{sede}/{inicio}/{fin}",response_class=HTMLResponse)
async def ReporteUnificadoBYfecha(sede,inicio,fin):
    trigger= coreFechas.html(sede,inicio,fin)
   
    if trigger['status']==True:
        archivo=trigger['response']
        #print(archivo)
        return archivo
    else:
         raise HTTPException(400,f"{trigger['mesagge']}")
@GERENCIA.get("/filter/range/{sede}/{inicio}/{fin}")
async def reporteUnificado(sede,inicio,fin):
    trigger= coreFechas.generar(sede,inicio,fin)
   
    if trigger['status']==True:
        archivo=trigger['response']
        return FileResponse(path=archivo,media_type='application/pdf', filename=f'ReporteUnificado{sede+inicio+fin}.pdf')
    else:
         raise HTTPException(400,f"{trigger['mesagge']}")
