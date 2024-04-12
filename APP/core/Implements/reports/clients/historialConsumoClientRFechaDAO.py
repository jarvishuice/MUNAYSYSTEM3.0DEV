import datetime
from core.utils.plantillaHTMLHistorialClienteFecha import PlantillaHTMLHistorialCliente
from core.config.ResponseInternal import ResponseInternal
from config.Logs.LogsActivity import Logs
from core.Entities.reports.client.clientReporteEntity import *
from core.Interface.reports.clients.IReportClient import IReportClient
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
import pdfkit
import traceback

class HistorialClientRFechaReport(ConectionsPsqlInterface):
    OPTIONS = {
                      'page-size': 'Letter', 
      'margin-top': '0.75in',
      'margin-right': '0.75in',
      'margin-bottom': '0.75in', 
      'margin-left': '0.75in'
                    }
    WARNING=Logs.Warnings
    plantilla=PlantillaHTMLHistorialCliente()
    def __init__(self):
        super().__init__() 
    def __getCliente(self,id):
        try:
            cliente = None
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""select nombre,ci,tlf,correo from clientes where id={id}""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            cliente=Cliente(id=id,nombre=str(i[0]),ci=str(i[1]),tlf=str(i[2]),correo=str(i[3]))
                        return ResponseInternal.responseInternal(True,f"se ecncontro  ningun cliente con el id:{id}",cliente)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontro al  cliente {id} ",None)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la abse de datos en la funcion {self.__getCliente.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getCliente.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getCliente.__name__ }")
            self.disconnect()   
    def __getOrdenesAbiertasCoffe(self, sede: str, idCliente: int,fInicio:str,fFin:str):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""SELECT id,sede,total as monto ,status, fechapedido as fpedido 
                                FROM ordenes where idcliente={idCliente} and sede='{sede}' 
                                and status='por pagar' and fechapedido >= '{fInicio}' and fechapedido <= DATE '{fFin}' + interval '1 day' order by fechapedido desc;""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Ordenes(id=str(i[0]),monto=float(i[2]),sede=str(i[1]),fpedido=str(i[4]),status=str(i[3])))
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
    def __getOrdenesCerradasCoffe(self, sede: str, idCliente,fInicio:str,fFin:str):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""SELECT id,sede,total as monto ,status, fechapedido as fpedido ,fechapago
                                FROM ordenes where idCliente={idCliente} and sede='{sede}' 
                                and status='pagado' and fechapedido>='{fInicio}' and fechapedido <= DATE '{fFin}' + interval '1 day' order by fechapedido desc;""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            
                            data.append(Ordenes(id=str(i[0]),sede=str(i[1]),monto=float(i[2]),status=i[3],fpedido=str(i[4]),fpagado=str(i[4])))
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
            
    def __getPagosCoffe(self, sede: str, idCliente,fInicio:str,fFin:str):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""select * from obtener_datos_pagos_by_cliente_rango_fecha({idCliente},'{sede}', '{fInicio}', '{fFin}') 
""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            data.append(Pagos(id=str(i[0]),monto=float(i[1]),fecha=str(i[2]),hora=str(i[3]),sede=str(i[4]),metodo=str(i[5]),referencia=str(i[6]),motivo=i[7],tasa=round(float(i[8]),2)))
                        return ResponseInternal.responseInternal(True,f"se ecncontraron ({count}) pagos  en la sede {sede}",data)
                    else:
                        return ResponseInternal.responseInternal(False,f" {self.WARNING}no se encontraron ordenes abiertas del cliente {idCliente} en la sede {sede} ",data)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR}{traceback.print_exc()} error de interface en la base de datos en la funcion {self.__getPagosCoffe.__name__ } details {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} {traceback.print_exc()}error en la base de datos  en {self.__getPagosCoffe.__name__}detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask(f"Finalizada la ejecucion de {self.__getPagosCoffe.__name__ }")
            self.disconnect()
    def __getPedidosCoffe(self, sede: str, idCliente,fInicio:str,fFin:str):
        data=[]
        try:
            
            conexion=self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""select c.nombre,pe.idorden ,o.fechapedido,p.nombre,pe.cantidad,pe.total,o.status from ordenes o 
inner join clientes c on c.nombre = c.nombre
inner join productos p on p.nombre = p.nombre
inner join pedidos pe on pe.cantidad = pe.cantidad and pe.total = pe.total and pe.idorden =pe.idorden 
where c.id = {idCliente} and o.sede = '{sede}' and  o.idcliente = {idCliente} and pe.idorden = o.id and p.id = pe.idproducto and o.fechapedido >= '{fInicio}' and o.fechapedido <= DATE '{fFin}' + interval '1 day' 
order by o.fechapedido  desc""")
                    count = cur.rowcount
                    if count > 0:
                        
                        for i in cur:
                            
                            data.append(Pedidos(idOrden=str(i[1]),fPedido=str(i[2]),producto=str(i[3]),cantidad=float(i[4]),total=float(i[5]),status=str(i[6])))
                            #data.append(Pedidos(idOrden=str(i[1]),fPedido=str(i[2]),producto=str(i[-4]),cantidad=round(float(i[-3]),2)),total=round(float(i[6])),status=str(i[-1]))
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
                    cur.execute(f"""select id,monto from wallet where idcliente = {idCliente} and monto <> 0  """)
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
    def generarReporteClientCoffeHTML(self, sede: str, idCliente: int,fInicio,fFin):
        datos= ClientReportEntity(cliente=self.__getCliente(idCliente)["response"],
                                  ordenesAbiertas=self.__getOrdenesAbiertasCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  ordenesCerradas=self.__getOrdenesCerradasCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  pagos=self.__getPagosCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  pedidos=self.__getPedidosCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  walletOperaciones=self.__getWalletOperacionesCoffe(sede,idCliente)["response"])
        html =self.plantilla.getHtml(sede,datos,fInicio,fFin)
        return ResponseInternal.responseInternal(True,f"se genero el reporte de cliente {idCliente}",html)
    def generarReporteClientCoffe(self,sede:str,idCliente:int,fInicio,fFin):
        datos= ClientReportEntity(cliente=self.__getCliente(idCliente)["response"],
                                  ordenesAbiertas=self.__getOrdenesAbiertasCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  ordenesCerradas=self.__getOrdenesCerradasCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  pagos=self.__getPagosCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  pedidos=self.__getPedidosCoffe(sede,idCliente,fInicio,fFin)["response"],
                                  walletOperaciones=self.__getWalletOperacionesCoffe(sede,idCliente)["response"])
        html =self.plantilla.getHtml(sede,datos,fInicio,fFin)
        output_path =f"assets/reports/coffeshop/cierre/HistoricoCliente{idCliente}{sede}{datetime.datetime.today()}.pdf"
        pdf=pdfkit.from_string(html,output_path,options=self.OPTIONS)
        return ResponseInternal.responseInternal(True,f"se genero el reporte de cliente {idCliente}",output_path)