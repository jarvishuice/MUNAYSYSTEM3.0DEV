from pydantic import BaseModel


class FacturaContenidoEntity(BaseModel):
    idFactura: int
    cantidad: float
    producto: str
    precioUnitariobs: float
    precioUnitarioD: float
    totalBs: float
    totalD: float
