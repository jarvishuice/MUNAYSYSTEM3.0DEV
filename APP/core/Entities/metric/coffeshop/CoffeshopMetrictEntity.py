from pydantic import BaseModel
from typing import Optional

from core.Entities.reports.coffeshop.cofeshopReportEntity import DetallePagos

class CoffeshopMetrictEntity(BaseModel):
    ventasDiarias:float
    ventasMensual:float
    deudas:float
    
class VentasPorProductosEntity(BaseModel):
    nombre:str
    cantidad:float
    total:float

class FormaPagoEntity(BaseModel):
        pagoMovil:float
        Punto:float
        divisa:float
        wallet:float
        zelle:float
        efectivoBS:float
        total:float
class PagosMetrictEntity(BaseModel):
    resumen:FormaPagoEntity
    detalles:list[DetallePagos]

