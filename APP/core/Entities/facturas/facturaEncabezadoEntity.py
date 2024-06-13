from typing import Optional
from pydantic import BaseModel


class FacturaEncabezadoEntity(BaseModel):
    id: int
    nFactura: str
    ci: str
    nombre: str
    totalDivisa: float
    iva: float
    ivaBS: float
    baseBs: float
    baseDivisa: float
    fecha: str
    tasa:  float
    status: int
    direcion: str
    totalBs:Optional[float]
