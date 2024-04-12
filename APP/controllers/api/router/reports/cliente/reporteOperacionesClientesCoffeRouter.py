from fastapi.responses import FileResponse, HTMLResponse
from core.Implements.reports.clients.historialConsumoClientDAO import HistorialClientReport
from core.Implements.reports.clients.historialConsumoClientRFechaDAO import  HistorialClientRFechaReport as COREFECHA
from fastapi import APIRouter,Request,HTTPException,UploadFile,File,Response

core = HistorialClientReport()
coreFecha= COREFECHA()
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
@ReportClientConsumo.get("/coffe/html/filter/range/{idCliente}/{sede}/{fInicio}/{fFin}",response_class=HTMLResponse)
async def REportClientCoffeHTML(sede:str,idCliente,fInicio:str,fFin:str):
    trigger = coreFecha.generarReporteClientCoffeHTML(sede,idCliente,fInicio,fFin)
    #archivo = trigger['response']
    if trigger['status'] == True:
       #archivo = trigger['response']
        return trigger["response"]
    else:
        raise HTTPException(400, f"{trigger['message']}")
@ReportClientConsumo.get("/coffe/pdf/filter/range/{idCliente}/{sede}/{fInicio}/{fFin}")
async def REportClientCoffepdf(idCliente:int, sede:str,fInicio,fFin):
    trigger = coreFecha.generarReporteClientCoffe(sede, idCliente, fInicio, fFin)
    if trigger["status"] == True:
        archivo= trigger["response"]
        return FileResponse(path=archivo,media_type='application/pdf',filename=f"historialCoffeshopCliente{idCliente}{sede}.pdf")
    else:
        raise HTTPException(400, f"{trigger['message']}")