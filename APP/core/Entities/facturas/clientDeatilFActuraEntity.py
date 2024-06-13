from pydantic import BaseModel


class ClientDetailFacturaEntity(BaseModel):
    id:int
    nombre :str
    correo:str
    tlf:str
    ci:str