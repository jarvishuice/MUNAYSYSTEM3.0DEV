from core.Entities.pagos.pagosEntity import PagosEntity
from core.Implements.wallet.walletDAO import WalletDAO
from core.Entities.wallet.walletEntity import WalletEntity
from core.Implements.pagos.pagosDAO import PagosDAO
from core.Interface.pagos.IpagosWallet import IPagosWallet
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
import time
from config.Logs.LogsActivity import Logs
""" Esta clase es la encargada de gestiionar todo lo  referentes a llas operaciones que se realizararn con el wallet contemplando la tabla de pagos 
esta complementa a wallet DAo 
el atrubuto wallet es la implementacion de walletDAO donde esta toda la lohgiaca para insertar en  la tabla wallet 

    """
class PagosWalletDAO(ConectionsPsqlInterface,IPagosWallet):

    wallet=WalletDAO()
    pagos=PagosDAO()
  
    def __init__(self):
        super().__init__()
    def registrarPagoConWallet(self,pagoData: PagosEntity) -> PagosEntity:
        try:
            pagoData.idformadepago=10
            registroPago=self.pagos.registrarPago(pagoData)
            if registroPago['status']==True:
                registroWallet=self.wallet.descuentowallet(WalletEntity(id=str(time.time()),idcliente=int(pagoData.idcliente),monto=float(pagoData.monto * -1),idpago=registroPago['response'].id,status='aplicado'))
                if registroWallet['status'] == True:
                    return ResponseInternal.responseInternal(True,"consumo de wallet realizado de manera satisfactoria",pagoData)              
                else: 
                    Logs.WirterTask(f"{self.ERROR} error al registrar el pago detail ( {registroPago['mesagge']})")
                    return ResponseInternal.responseInternal(False,{registroPago['mesagge']},None)           
            else : 
                Logs.WirterTask(f"{self.ERROR} error al registrar el pago detail ( {registroPago['mesagge']})")
                return ResponseInternal.responseInternal(False,{registroPago['mesagge']},None)
        finally:
            Logs.WirterTask("finalizada el registro de un consumo de wallet!!!")
    def RecargarWallet(self,pagosData: PagosEntity) -> PagosEntity:
         try:
             pagosData.motivo=f"Recarga wallet{pagosData.sede}"
             pago= self.pagos.registrarPago(pagosData)
             if pago['status'] ==True:
                 recarga=self.wallet.reacargarWallet(WalletEntity(id=str(time.time()),idcliente=int(pagosData.idcliente),monto=float(pagosData.monto),idpago=str(pago['response'].id),status=str('aplicado')))
                 if recarga['status'] ==True:
                     return ResponseInternal.responseInternal(True,f"Recarga de ({pagosData.monto} $) al  wallet  del cliente {pagosData.idcliente} realizada de manera satisfactoria",pago['response'])
                 else:
                     return ResponseInternal.responseInternal(False,recarga['mesagge'],None)
             else:
                 return ResponseInternal.responseInternal(False,f"error al procesar el pago detail [{pago['meagge']}]",None)            
         finally:
             Logs.WirterTask("finalizada  la recarga de wallet !!!")
    def recargaWalletEspacios(self,pagoData: PagosEntity):
        tazaSql="select id from tazadollar t  order by id desc limit 1 "
        conexion = self.connect()
        pagoData.id = time.time()
        try:
           conexion = self.connect()
           if conexion['status'] ==True:
               with self.conn.cursor() as cur :
                   cur.execute(f"""INSERT INTO public.pagos_espacios (id, idcliente, fechapago, motivo, idformadepago, 
                              referencia, monto, idtaza, sede)
                              VALUES('{pagoData.id}', '{pagoData.idcliente}', now(), 'recarga de wallet {pagoData.sede}',
                              {pagoData.idformadepago}, '{pagoData.referencia}', {round(pagoData.monto,2)}, 
                              ({tazaSql}), '{pagoData.sede}');""")
                   self.conn.commit()
                   cur.execute(f"""INSERT INTO public.wallet_espacios (idcliente, id, idpago, status, monto)
                               VALUES({pagoData.idcliente}, '{pagoData.id}', '{pagoData.id}', 'aplicado', {round(pagoData.monto,2)});""")
                   self.conn.commit()
               return ResponseInternal.responseInternal(True,f"Recarga de ({pagoData.monto} $) al  wallet  espacios del cliente {pagoData.idcliente} realizada de manera satisfactoria",pagoData)
           else:
                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)       
        except self.INTEGRIDAD_ERROR as e :
            Logs.WirterTask(f"{self.ERROR} error de integridad en la base de datos {e}")
            return ResponseInternal.responseInternal(False,f"error de bido a que ya existe un PAGO con estdo datos {pagoData} ",None)
        except self.INTERFACE_ERROR as e :
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False,"ERROR EN LA BASE DE DATOS",None)
        finally:
            self.disconnect()
            Logs.WirterTask(f"finalizado el registro del wallet espacios -> {pagoData.id}")
    

        