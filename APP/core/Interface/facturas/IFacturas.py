from core.Entities.facturas.facturaEntity import FacturaEntity


class IFactura():
    def __init__(self) -> None:
        pass

    def generarFactura(self, data: FacturaEntity, sede: str): ...

    def getFacturaById(self, id: int, sede: str): ...

    def __getDetallePedidos(self, idOrden: str,sede:str): ...

    def __getClienteDetalles(self, idCliente: str): ...
