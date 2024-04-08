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
       #archivo = trigger['response']
        return trigger["response"]
    else:
        raise HTTPException(400, f"{trigger['message']}")