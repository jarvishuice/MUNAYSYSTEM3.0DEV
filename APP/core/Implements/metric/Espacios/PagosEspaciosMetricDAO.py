from core.Entities.reports.coffeshop.cofeshopReportEntity import DetallePagos
from core.Entities.metric.coffeshop.CoffeshopMetrictEntity import CoffeshopMetrictEntity,VentasPorProductosEntity
from core.Interface.metric.coffeshop.ICoffeshopMetric import ImMtericsCoffeshop
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
import time
import datetime
from config.Logs.LogsActivity import Logs
from core.Entities.metric.coffeshop.CoffeshopMetrictEntity import PagosMetrictEntity,FormaPagoEntity
class PagosEspaciosMetricDAO(ConectionsPsqlInterface):
    def __init__(self):
        super().__init__()
    def __filterPaysByMethodForm(self,pagos:list[DetallePagos]):
        pagoMovil=0
        Punto=0
        divisa=0
        wallet=0
        zelle=0
        efectivoBs=0
        total=0
        
        if pagos.__len__() >0:
            for i in pagos:
                if i.metodo =="PAGO MOVIL":
                    pagoMovil=i.monto + pagoMovil
                     
                if i.metodo =="PUNTO DE VENTA":
                    Punto=i.monto + Punto
                     
                if i.metodo =="EFECTIVO $":
                    divisa=i.monto + divisa
                if i.metodo =="wallet":
                    wallet=i.monto + wallet
                if i.metodo =="ZELLE":
                    zelle=i.monto + zelle
                if i.metodo =="EFECTIVO BS":
                    efectivoBs=i.monto + efectivoBs
                total = total +i.monto
            return FormaPagoEntity(pagoMovil=pagoMovil,Punto=Punto,divisa=divisa,wallet=wallet,total=total,efectivoBS=efectivoBs,zelle=zelle)    
        else:
            return FormaPagoEntity(pagoMovil=0,Punto=0,divisa=0,wallet=0,zelle=0,efectivoBS=0,total=0)    
            
    def getPayToday(self,sede):
        data=[]
        try:
            conexion=self.connect()
       
            if conexion['status'] == True:
              with self.conn.cursor() as cur :
                  
                    cur.execute(f"""
                           select nombre,monto,precio,motivo, referencia,date(p.fechapago) as fecha,to_char(p.fechapago  ,'hh12:MI:SS AM') as hora,banco,metodo from pagos_espacios p 
inner join clientes c on nombre=c.nombre
inner join fromadepago f on banco=f.banco and metodo=f.metodo
inner join tazadollar t ON precio=t.precio 
where c.id=p.idcliente 
and date(p.fechapago) =' {datetime.date.today()} ' and monto > 0 and f.id=p.idformadepago and t.id=p.idtaza  and p.sede = '{sede}'    
              
                                """)
              
             
                    self.conn.commit()
                    count= cur.rowcount
                    x=0
                    if count > 0 :
                        for i in cur :
                         data.append(DetallePagos(cliente=str(i[0]),
                                                  monto=float(i[1]),
                                                  cotizacion=float(i[2]),
                                                  motivo=str(i[3]),
                                                  referencia=str(i[4]),
                                                  fecha=str(i[5]),
                                                  hora=str(i[6]),
                                                  banco=str(i[7]),
                                                  metodo=str(i[8])))
                        x=PagosMetrictEntity(resumen=self.__filterPaysByMethodForm(data),detalles=data)     
                        return  ResponseInternal.responseInternal(True,f"Pagos extraida de manera correcta",x)
                    else:
                        Logs.WirterTask(f"{self.NOTE } no se enmcontraron registros de los pagos de l dia  ")
                        return ResponseInternal.responseInternal(True, "No se encontraron registros de pagos el dia de hoy",[])
            else:
                   return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
        
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            Logs.WirterTask("Finalizada la ejecucion de registros de productos ")
            self.disconnect()
            

    
