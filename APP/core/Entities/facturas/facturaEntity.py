from pydantic import BaseModel
from core.Entities.facturas.facturaContenidoEntity import FacturaContenidoEntity
from core.Entities.facturas.facturaEncabezadoEntity import FacturaEncabezadoEntity


class FacturaEntity(BaseModel):
    encabezado: FacturaEncabezadoEntity
    detalle: list[FacturaContenidoEntity]
