import datetime
from core.config.ResponseInternal import ResponseInternal
from config.Logs.LogsActivity import Logs
from core.Entities.reports.client.clientReporteEntity import *
from core.Interface.reports.clients.IReportClient import IReportClient
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
import pdfkit
import traceback

class HistorialClientReport(ConectionsPsqlInterface,IReportClient):
    OPTIONS = {
                      'page-size': 'Letter', 
      'margin-top': '0.75in',
      'margin-right': '0.75in',
      'margin-bottom': '0.75in', 
      'margin-left': '0.75in'
                    }
    WARNING=Logs.Warnings
    def __init__(self):
        super().__init__() 
    def __getOrdenesAbiertasCoffe(self, sede: str, idCliente: int):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""SELECT id,sede,total as monto ,status, fechapedido as fpedido, 
                                FROM ordenes where idCliente={idCliente} and sede='{sede}' 
                                and status='por pagar' order by fechapedido desc;""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Ordenes(id=str(i[0]),total=float(i[1]),sede=str(i[2]),fechapedido=str(i[3]),status=str(i[5])))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) en la sede {sede}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron ordenes abiertas del cliente {idCliente} en la sede {sede} ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la abse de datos en la funcion {self.__getOrdenesAbiertasCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getOrdenesAbiertasCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getOrdenesAbiertasCoffe.__name__ }")
            self.disconnect()
    def __getOrdenesCerradasCoffe(self, sede: str, idCliente):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""SELECT id,sede,total as monto ,status, fechapedido as fpedido, 
                                FROM ordenes where idCliente={idCliente} and sede='{sede}' 
                                and status='pagado' order by fechapedido desc;""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Ordenes(id=str(i[0]),total=float(i[1]),sede=str(i[2]),fechapedido=str(i[3]),status=str(i[5])))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) en la sede {sede}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron ordenes cerradas del cliente {idCliente} en la sede {sede} ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} \t error de interface en la abse de datos en la funcion {self.__getOrdenesAbiertasCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getOrdenesAbiertasCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getOrdenesCerradasCoffe.__name__ }")
            self.disconnect()
    def __getPagosCoffe(self, sede: str, idCliente):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""SELECT id,sede,total as monto ,status, fechapedido as fpedido, 
                                FROM ordenes where idCliente={idCliente} and sede='{sede}' 
                                and status='por pagar' order by fechapedido desc;""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Ordenes(id=str(i[0]),total=float(i[1]),sede=str(i[2]),fechapedido=str(i[3]),status=str(i[5])))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) en la sede {sede}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron ordenes abiertas del cliente {idCliente} en la sede {sede} ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la abse de datos en la funcion {self.__getOrdenesAbiertasCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getOrdenesAbiertasCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getOrdenesAbiertasCoffe.__name__ }")
            self.disconnect()
    def __getPedidosCoffe(self, sede: str, idCliente):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""select c.nombre,pe.idorden ,o.fechapedido,o.sede,p.nombre,pe.cantidad,pe.total,o.status from ordenes o 
inner join clientes c on c.nombre = c.nombre
inner join productos p on p.nombre = p.nombre
inner join pedidos pe on pe.cantidad = pe.cantidad and pe.total = pe.total and pe.idorden =pe.idorden 
where c.id = {idCliente} and o.sede = '{sede}' and  o.idcliente = {idCliente} and pe.idorden = o.id and p.id = pe.idproducto 
order by o.fechapedido  desc""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Pedidos(idOrden=str(i[1]),fPedido=str(i[2]),producto=str(i[4]),cantidad=round(float(i[5]),2)),total=round(float(i[6])),status=str(i[7]))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) pedidos en la sede {sede}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron pedidos del cliente {idCliente} en la sede {sede} ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la abse de datos en la funcion {self.__getPedidosCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getPedidosCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getPedidosCoffe.__name__ }")
            self.disconnect()
    def __getWalletOperacionesCoffe(self, sede: str, idCliente):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""select id,monto from wallet where idcliente = {idCliente}  and monto <> 0""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Wallet(id=str(i[0]),monto=round(float(i[1]),2)))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) operaciones de wallet  de cliente # {idCliente}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron operaciones de wallet del cliente {idCliente}  ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la abse de datos en la funcion {self.__getWalletOperacionesCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getWalletOperacionesCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getWalletOperacionesCoffe.__name__ }")
            self.disconnect()