from fastapi.responses import FileResponse, HTMLResponse
from core.Implements.reports.clients.historialConsumoClientDAO import HistorialClientReport
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response

core = HistorialClientReport()
urlBase = "/MUNAY/nest"
ReportClientConsumo=APIRouter(prefix=f"{urlBase}/Reports/Clients")
@ReportClientConsumo.get("/coffe/{idCliente}/{sede}")
async def REportClientCoffe(idCliente:int, sede:str):
    trigger = core.generarReporteClientCoffe(sede, idCliente)
    #archivo = trigger['response']
    if trigger['status'] == True:
        archivo = trigger['response']
        return FileResponse(path=archivo,media_type='application/pdf',filename=f"historialCoffeshopCliente{idCliente}{sede}.pdf")
    else:
        raise HTTPException(400, f"{trigger['message']}")
@ReportClientConsumo.get("/coffe/html/{idCliente}/{sede}",response_class=HTMLResponse)
async def REportClientCoffehtml(idCliente:int, sede:str):
    trigger = core.generarReporteClientCoffeHTML(sede, idCliente)
    #archivo = trigger['response']
    if trigger['status'] == True:
       #archivo = trigger['response']
        return trigger["response"]
    else:
        raise HTTPException(400, f"{trigger['message']}")