from core.Implements.clientes.deudaClientesEspaciosDAO import DeudaCientesEspaciosDAO
from core.Entities.facturas.facturaEntity import FacturaEntity, FacturaEncabezadoEntity, FacturaContenidoEntity
from core.Entities.facturas.clientDeatilFActuraEntity import ClientDetailFacturaEntity
from config.Logs.LogsActivity import Logs
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from core.Interface.facturas.IFacturas import IFactura


class FacturasEspaciosDAO(ConectionsPsqlInterface, IFactura):
    __deudasCore = DeudaCientesEspaciosDAO()
    __tasa:float = 0.00
    
    def __init__(self) -> None:
        super().__init__()
        self.__tasa = self.__obtenerTaza['response']
        print(self.__tasa)
            
    
    @property
    def __obtenerTaza(self):
        res = 0
        try:
             conexion = self.connect()
             if conexion['status'] != True:
                 return ResponseInternal.responseInternal(status = False, mesagge="error de conexion a la base de datos",response = 0.00)
             with self.conn.cursor() as cur:
                 cur.execute(f"select precio from tazadollar t  order by id desc limit 1 ")
                 for i in cur:
                     res = float(i[0])
                 return ResponseInternal.responseInternal(status = True, mesagge="tasa obtenida con exito",response = res)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()
        
        
        """
        
        genera el codigo para la factura 
        a partir de un numero dado 
        
        """
        
    def __generator_code(self,number):
        code = str(number).zfill(8)
        return code
    
    """           
    Obtiene el precio base descontando el iva        
    """    
    def __FactorPercentIVA(self, precio):
        return round(float(precio) / float(1.16), 2)

    """
    
    ESTE METODO AGRUPA LOS DETALLES DEL LAS FACTURAS 
    CUANDO LOS PRODUCTOS SON IGUALES  AJUSTA LAS PROPIEDADES
    
    """

    def __filter_detalles(self, data: list[FacturaContenidoEntity]) -> list[FacturaContenidoEntity]:
        res = {}
        for i in data:
            if i.producto not in res:
                res[i.producto] = i
            else:
                res[i.producto].cantidad += i.cantidad
                res[i.producto].totalBs += i.totalBs
                res[i.producto].totalD += i.totalD

        return list(res.values())

    """ 
        GENERA EL ID DE LA FACTURA 
        TOAMANDO ENCUENTA LA SECUENCIAS DE ID DE 
        LAS FACTURAS ANERIORES EN LA DIVERSAS SEDES
        
    """

    def __generatorID(self, sede):
        try:
            data = None
            conexion = self.connect()
            if conexion['status'] == False:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
            with self.conn.cursor() as cur:
                cur.execute(
                    f"select * from id_factura_{sede}_espacios_generate;")
                for i in cur:
                    data = i[0]
                    #print(i[0])

                return ResponseInternal.responseInternal(status=True, mesagge="id genernerado con exito ", response=data)

        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    """
    ESTRAE TODOS LOS PEDIDOS DE LAS DEUDAS DEL CLIENTE 
    PARA CONVERTIRLO EN LOS DETALLES DE LA FACTURAS
    """

    def __getDetallePedidos(self, idCliente: int, sede: str, idFactura: int, ):
        deudas = None
        tasa=self.__tasa
        deudas = self.__deudasCore.getDetalleDeudaClienteBySede(
            idCliente=idCliente, sede=sede)["response"]
        # print(deudas)

        res = []
        for i in deudas:
            res.append(FacturaContenidoEntity(idFactura=idFactura,
                                              cantidad=float(i.cantidad),
                                              producto=i.producto,
                                              precioUnitariobs=round(float(
                                                  self.__FactorPercentIVA(i.precio)) * float(tasa), 2),
                                              precioUnitarioD=float(
                                                  self.__FactorPercentIVA(i.precio)),
                                              totalBs=float(
                                                  float(self.__FactorPercentIVA(i.total))) * float(tasa),
                                              totalD=float(
                                                  self.__FactorPercentIVA(i.total))

                                              ))
        # FILTRO PARA AGRUPAR TODOS LOS DATOS DE PRODUCTOS SIMILARES
        x = self.__filter_detalles(res)

        return ResponseInternal.responseInternal(status=True,
                                                 mesagge="lectura",
                                                 response=x)

    """
    GENERA EL ENCABEZADO DE LA FACTURA 
    """

    def _generarEncabezado(self, id: int, idCliente: int, IVA: float, base: float):
        tasa=self.__tasa
        dataCliente = self.__getClienteDetalles(idCliente)['response']
        return ResponseInternal.responseInternal(status=True,
                                                 mesagge="lectura",
                                                 response=FacturaEncabezadoEntity(id=int(id),
                                                                                  nFactura=self.__generator_code(id),
                                                                                  ci=dataCliente.ci,
                                                                                  nombre=dataCliente.nombre,
                                                                                  totalDivisa=round(float(
                                                                                      base)+(0.16 * base), 2),
                                                                                  iva=round(
                                                                                      float(IVA), 2),
                                                                                  ivaBS=round(
                                                     float(IVA)*float(tasa), 2),
                                                     baseBs=round(
                                                     float(base)*float(tasa), 2),
                                                     baseDivisa=base,
                                                     fecha='now()',
                                                     tasa=float(
                                                                                      tasa),
                                                     status=1,
                                                     direcion="CARACAS VENEZUELA"
                                                 ))

    """
    EXTRAE LOS DATOS PERSONALES NECESARIO 
    DEL CLIENTE PARA PLASMARLO EN LA FACTURA
    """

    def __getClienteDetalles(self, idCliente: int):
        try:
            data = None
            conexion = self.connect()
            if conexion['status'] == False:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
            with self.conn.cursor() as cur:
                cur.execute(
                    f"select nombre,correo,tlf,ci from clientes  where id = {idCliente}")
                for i in cur:
                    data = ClientDetailFacturaEntity(
                        id=int(idCliente),
                        nombre=i[0],
                        correo=i[1],
                        tlf=i[2],
                        ci=i[3])
                return ResponseInternal.responseInternal(status=True, mesagge="cliente leido con exito", response=data)

        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()


    def generarFactura(self, idCliente: int, sede: str,):
        encabezado = None
        contenido = None
        idFactura = None
        BdataClient = None
        totalDivisa = 0
        IVA = 0
        sqlEncabezado = None
        sqlContenido = None
        tasa = None
        tasa=self.__tasa
        containerContenido = ''
        query = '\n'

        try:

            BdataClient = self.__getClienteDetalles(idCliente)['response']
            idFactura = self.__generatorID(sede)['response']
            # print(idFactura)

            contenido = self.__getDetallePedidos(idCliente=idCliente,
                                                 sede=sede,
                                                 idFactura=int(idFactura),
                                                )['response']
            #print(contenido)
            for i in contenido:
                totalDivisa = totalDivisa + i.totalD

            IVA = float(0.16) * float(totalDivisa)
            encabezado = self._generarEncabezado(id=int(idFactura),
                                                 idCliente=int(idCliente),
                                                 IVA=IVA,
                                                 
                                                 base=totalDivisa)['response']

            data = FacturaEntity(encabezado=encabezado, detalle=contenido)
            sqlEncabezado = f"""INSERT INTO public.facturas_espacios_{sede}
                                (id_table, n_factura, ci_cliente, nombre_cliente, 
                                total_divisa, iva, total_bs, iva_bs, base_bs, 
                                base_divisa, fecha, tasa_dollar, status, direccion_fiscal) 
                                VALUES({encabezado.id}, '{encabezado.nFactura}', 
                                {encabezado.ci}, '{encabezado.nombre}', 
                                {encabezado.totalDivisa}, {round(IVA,2)},
                                {round(encabezado.totalDivisa * tasa,2)} ,
                                {encabezado.ivaBS}, {encabezado.baseBs}, 
                                {encabezado.baseDivisa}, now(), {tasa}, 1, 
                                '{encabezado.direcion}')"""
                            
            for i  in contenido :
                #print(f"contenido -> {i}")
                containerContenido =str(containerContenido)+f"""
                                        ({i.idFactura},'{i.producto}',{i.cantidad},
                                        {i.precioUnitariobs},{i.totalBs},
                                        {i.precioUnitarioD},{i.totalD}),"""
            containerContenido = containerContenido[:-1]
            sqlContenido= f"""
                                INSERT INTO public.detalle_facturas_espacios_{sede}
                                (id_factura, producto, cantidad, p_unitario_bs, 
                                total_bs, p_unitario_divisa, total_divisa) 
                                VALUES {containerContenido}""" 
                                     
            query =f"{sqlEncabezado} {sqlContenido}" 
          
            #print(query)
            conexion = self.connect()
            if conexion['status'] == False:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
            with self.conn.cursor() as cur:
                cur.execute(sqlEncabezado)
                cur.execute(sqlContenido)
            self.conn.commit()
            cur.close()
            return ResponseInternal.responseInternal(status=True, mesagge="cliente leido con exito", response=data)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    """
     Extraccion y validacion de facturas 
         
    """

    def __getDetailFacutraByid(self,idFactura:int,sede:str):
        data=[]
        try:
            conexion=self.connect()
            if conexion['status'] != True:
                return ResponseInternal.responseInternal(status=False,
                                                         mesagge="ERROR DE CONEXION A LA BASE DE DATOS...",
                                                         response=data)
            with self.conn.cursor() as cur :
                cur.execute(f"""
                            select * from  detalle_facturas_espacios_{sede} where id_factura = {idFactura}
                            """)
                for i in cur :
                    data.append(FacturaContenidoEntity( idFactura= int(i[0]),                                                       
                                                        producto= i[1],
                                                        cantidad= float(i[2]),
                                                        precioUnitariobs=round(float(i[3]),2),
                                                        totalBs=round(float(i[4]),2),
                                                        precioUnitarioD=round(float(i[5]),2),
                                                        totalD=round(float(i[6]),2)
                                                     ))
                cur.close()
            return ResponseInternal.responseInternal(status=True,
                                                      mesagge="deatlles de orden extraido con exito",
                                                      response = data)    
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()
    def __getEncabezadoByid(self,id,sede):
        data=[]
        try:
            conexion=self.connect()
            if conexion['status'] != True:
                return ResponseInternal.responseInternal(status=False,
                                                         mesagge="ERROR DE CONEXION A LA BASE DE DATOS...",
                                                         response=data)
            with self.conn.cursor() as cur :
                cur.execute(f"""
                            select * from  facturas_espacios_{sede} where id_table = {id}
                            """)
                count = cur.rowcount
                if count <=0:
                    return ResponseInternal.responseInternal(False,f"no se ha encontrado ninguna factura con el id {id}",None)
                for i in cur :
                    data.append(FacturaEncabezadoEntity(id= int(i[0]),                                                       
                                                        nFactura= i[1],
                                                        ci = i[2],
                                                        nombre=i[3].upper(),
                                                        totalDivisa=round(float(i[4]),2),
                                                        iva=round(float(i[5]),2),
                                                        totalBs=round(float(i[6]),2),
                                                        ivaBS=round(float(i[7]),2),
                                                        baseBs=round(float(i[8]),2),
                                                        baseDivisa=round(float(i[9]),2),
                                                        fecha=str(i[10])[:19],# se recorta la fecha la hora,                                                    
                                                        tasa=round(float(i[11]),2),
                                                        status = int(i[12]),
                                                        direcion=i[13].upper()
                                                        
                                                     ))
                cur.close()
            return ResponseInternal.responseInternal(status=True,
                                                      mesagge="encabezado de factura extraido con exito",
                                                      response = data)    
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()
        
    def getFacturaById(self,id,sede):
         detalle= self.__getDetailFacutraByid(idFactura=id,sede=sede)
         encabezado= self.__getEncabezadoByid(id=id,sede=sede)
         if encabezado['status'] ==False:
             return ResponseInternal.responseInternal(status = False,
                                                  mesagge= "no se ha encontrado la factura",
                                                  response = None)
             
         return ResponseInternal.responseInternal(status = True,
                                                  mesagge= "exitor al extraer la factura",
                                                  response = FacturaEntity(
                                                      encabezado=encabezado['response'][0],
                                                      detalle=detalle['response']
                                                  ))
    def filterFacturaByStatus(self,sede:str,status:int):
        data =[]
        try: 
            conexion= self.connect()
            if conexion['status']==False:
                return ResponseInternal.responseInternal(status=False,
                                                         mesagge="ERROR DE CONEXION A LA BASE DE DATOS...",
                                                         response=data)
            with self.conn.cursor() as cur:
                cur.execute(f"""
                            select id_table from facturas_espacios_{sede} 
                            where status = {status} order by fecha asc;
                            """)
                count = cur.rowcount
                if count <=0:
                    return ResponseInternal.responseInternal(True,f"no se ha encontrado ninguna factura con el status {status}",data)
                for i in cur :
                    data.append(self.getFacturaById(int(i[0]),sede)['response'])
                cur.close()
            return ResponseInternal.responseInternal(True,"facturas flitradas con exito",data)
                
                    
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()