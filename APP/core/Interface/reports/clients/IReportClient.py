from core.Entities.reports.client.clientReporteEntity import ClientReporteEntity,wallet,Ordenes,pagos,Reportes,Pedidos
from abc import ABC,abstractmethod

class IReportClient(ABC):
    
    def __init__(self) -> None:
        super().__init__()
    @abstractmethod
    def getOrdenesAbiertasCoffe(self, sede:str,idCliente:int): ...
    @abstractmethod
    def getOrdenesCerradasCoffe(self, sede:str,idCliente):...
    @abstractmethod
    def getPagosCoffe(self,sede:str,idCliente):...
  
    @abstractmethod
    def getWalletOperacionesCoffe(self,sede:str,idCliente):...
    @abstractmethod
    def getPedidosCoffe(self,sede:str,idCliente):...
    @abstractmethod
    def getOrdenesAbiertasEspacios(self,sede:str,idCliente):...
    @abstractmethod
    def getOrdenesCerradasEspacios(self,sede:str,idCliente):...
    @abstractmethod
    def getPagosEspacios(self,sede:str,idCliente):...
    @abstractmethod
    def getWalletOperacionesEspacios(self,sede:str,idCliente):...
    @abstractmethod
    def getPedidosEspacios(self,sede:str,idCliente):...
    @abstractmethod 
    def generarReporteClientUnificado(self,sede:str,idCliente:int):... 
    @abstractmethod
    def generarReporteClientCoffe(self,sede:str,idCliente:int):... 
    @abstractmethod
    def generarReporteClientEspacio(self,sede:str,idCliente:int):...  
    @abstractmethod
    def generarReporteClientUnificadoHTML(self,sede:str,idCliente:int): ...
    @abstractmethod
    def generarReporteClientCoffeHTML(self,sede:str,idCliente:int): ...
    @abstractmethod
    def generarReporteClientEspacioHTML(self,sede:str,idCliente:int): ...