from pydantic import BaseModel
from typing import Optional

class Ordenes(BaseModel):
    id:str
    sede:str
    monto:float
    status:str
    fpedido:str
    fpagado:Optional[str]
class Pagos(BaseModel):
    id:str
    monto:str
    fecha:str
    hora:str
    metodo:str
    sede:str
    motivo:str
    tasa:float
class Wallet(BaseModel):
    id:str
    monto:str   
class Pedidos(BaseModel):
    idOrden: str
    fPedido:str
    producto:str
    cantidad:float
    total:float
    status:str
    
        
class ClientReportEntity(BaseModel):
    ordenesAbiertas:Optional[list[Ordenes]]
    ordenesCerradas:Optional[list[Ordenes]]
    pagos:Optional[list[Pagos]]
    walletOperaciones:Optional[list[Wallet]]
    pedidos:Optional[list[Pedidos]]
class Reportes:
    coffe:Optional[ClientReportEntity]
    espacios:Optional[ClientReportEntity]
    
    