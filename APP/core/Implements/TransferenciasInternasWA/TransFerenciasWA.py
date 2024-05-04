from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from core.Implements.pagos.pagosDAO import PagosDAO,PagosEntity,Logs
class TransferenciasWADAO(ConectionsPsqlInterface):
        def __init__(self):
            super().__init__()
        INTEGRACION=PagosDAO()    
        def TransFerirWalletByAbono(self,idCliente:int,monto:float,sede:str):
                try:
                    MONTO = 0
                    MONTO = -monto
                    pago = self.INTEGRACION.registrarPago(PagosEntity(id="s",monto=(MONTO),motivo=f"transferencia a  ABONO{sede}",idcliente=idCliente,idformadepago=10,sede=sede,referencia=f"idCliente"))
                    idPago = pago["response"].id
                    print(f"este es el id pago {idPago}")
                    if pago['status']==True:
                        conection = self.connect()
                        if conection['status']==True:
                            with self.conn.cursor() as cur:
                                cur.execute(f"""INSERT INTO public.wallet (idcliente, id, idpago, status, monto) VALUES({idCliente}, '{idPago}', '{idPago}', 'APLICADO', {MONTO});
                                            INSERT INTO public.abonos (id, idcliente, idpago, status, monto, sede) VALUES('{idPago}', {idCliente}, '{idPago}', 'APLICADO', {monto}, '{sede}');""")
                            self.conn.commit()
                            return ResponseInternal.responseInternal(True,"transferencia realizada con exito",pago['response'])
                        else:
                            return ResponseInternal.responseInternal(False,"error de conexion a la base de datos",None)
                    else:
                        return ResponseInternal.responseInternal(False,pago['mesagge'],None)
                except self.INTEGRIDAD_ERROR as err:
                    Logs.WirterTask(f"{self.ERROR} error de integridad en la base de datos {err}")
                    return ResponseInternal.responseInternal(False,"ERROR de integridad en la base de datos ",None)
                except self.INTERFACE_ERROR as err:
                    Logs.WirterTask(f"{self.ERROR} error de interface {err}")
                    return ResponseInternal.responseInternal(False,"ERROR de interface en la base de datos ",None)
                except self.OPERATIONAL_ERROR as err:
                    Logs.Error(f"error de operaciones en la base de datos [{err}]")
                except self.DATABASE_ERROR as err:
                    Logs.Error(f"error de databases en la base de datos [{err}]")
                finally:
                        self.disconnect()
                    
    