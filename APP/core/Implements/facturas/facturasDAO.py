from core.Entities.facturas.facturaEncabezadoEntity import FacturaEncabezadoEntity
from core.Implements.facturas.facturasEspaciosDAO import FacturasEspaciosDAO
from core.Implements.facturas.facturaCoffeDAO import FacturasCoffeDAO


class FacturasDAO():
    facturasCoffe=FacturasCoffeDAO()
    facturasEspacios=FacturasEspaciosDAO()
    
    def __init__(self) -> None:
     ...
    
    def generarFacturaCoffe(self,idCliente:int,sede:str):
        return self.facturasCoffe.generarFactura(idCliente=idCliente,sede=sede)
   
   
    def generarFacturaEspacios(self,idCliente:int,sede:str):
        return self.facturasEspacios.generarFactura(idCliente=idCliente,sede=sede)   
    
    
    def updateFactura(self,encabezado: FacturaEncabezadoEntity,sede:str):
        return self.facturasCoffe.actualizarFactura(encabezado=encabezado,sede=sede)
    
    
    def getAllFacturas(self,sede:str):
        return self.facturasCoffe.getAllFacturas(sede=sede)
    
    
    def getHtmlFactura(self,sede:str,id:int): 
        return self.facturasCoffe.getHtmlFactura(sede=sede,id=id)
    
    

    def validarFactura(self,sede,encabezado:FacturaEncabezadoEntity):
        """genera el pdf de las facturas

        Parameters
        ----------
        sede : str
            sede de la factura
        id : int
            identificadore de la tabla donde se encuentra la factura
        Returns
        -------
        _type_
           bool
        """
        validacion = None
        encabezado.status = 3
        validacion = self.facturasCoffe.actualizarFactura(encabezado=encabezado,sede=sede)
        
        return self.facturasCoffe.generarPdfFactura(sede=sede,id=id)
    