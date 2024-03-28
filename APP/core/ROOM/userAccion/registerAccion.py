import sqlite3
from pydantic import BaseModel
from config.Logs.LogsActivity import Logs
from core.config.ResponseInternal import ResponseInternal
from providers.DB.sqliteUserConection import ConectionsSqliteInterface
import time
import datetime
class AccionUserEntity(BaseModel):
    id:str
    idUsuario:int
    nombre:str
    idOperacion:str
    accion:str
    fecha:str
    sede :str
class RegisterAccion(ConectionsSqliteInterface):
    def __init__(self):
         super().__init__()
    def registrarActividad(self,datos:AccionUserEntity):
        
        
        try:
            datos.id=time.time()
            conection = self.connect()
            if conection['status']==True:
                cur = self.conn.cursor()  
                cur.execute(f""" insert into actividad_usuario(id,id_user,nombre,id_operacion,accion,fecha,sede) values ('{datos.id}',{datos.idUsuario},'{datos.nombre}','{datos.idOperacion}','{datos.accion}','{datetime.datetime.now()}','{datos.sede}') 
                """)
                self.conn.commit()
                return ResponseInternal.responseInternal(True,f"Accion registrada de manera exitosa con el id:[{datos.id}]",datos)
            else:
                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
        finally:
            self.disconnect()
       
       

      
            self.disconnect()
    @property
    def getAllActivity(self):
          data= []
          try:
            conection = self.connect()
            if conection['status']==True:
                cur = self.conn.cursor()  
                cur.execute(f""" 
                            select  * from actividad_usuario order by fecha desc;  
                """)
                for i in cur :
                  data.append(AccionUserEntity(id=i[0],
                                               idUsuario=int(i[1]),
                                               nombre=i[2],
                                               idOperacion=i[3],
                                               accion=i[4],
                                               fecha=str(i[5]),
                                               sede=str(i[6])
                                               ))
                        
                return ResponseInternal.responseInternal(True,f"lectura de acciones heca de manera correcta",data)
            else:
                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
          finally:
            self.disconnect()
    def getAllActivityBySede(self,sede):
        data=[]
        try:
            conection = self.connect()
            if conection['status']==True:
                cur = self.conn.cursor()  
                cur.execute(f""" select  * from actividad_usuario where sede = '{sede}' ORDER BY fecha DESC; """)
                for i in cur :
                  data.append(AccionUserEntity(id=i[0],
                                               idUsuario=int(i[1]),
                                               nombre=i[2],
                                               idOperacion=i[3],
                                               accion=i[4],
                                               fecha=str(i[5]),
                                               sede=str(i[6])
                                               ))
                        
                return ResponseInternal.responseInternal(True,f"lectura de acciones heca de manera correcta",data)
            else:
                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
        finally:
            self.disconnect()
    def getAllActivityTodaySede(self,sede):
        data=[]
        try:
            conection = self.connect()
            if conection['status']==True:
                cur = self.conn.cursor()  
                cur.execute(f""" select  * from actividad_usuario where sede = '{sede}'  and date(fecha)= date('now') ORDER BY fecha DESC; """)
                for i in cur :
                  data.append(AccionUserEntity(id=i[0],
                                               idUsuario=int(i[1]),
                                               nombre=i[2],
                                               idOperacion=i[3],
                                               accion=i[4],
                                               fecha=str(i[5]),
                                               sede=str(i[6])
                                               ))
                        
                return ResponseInternal.responseInternal(True,f"lectura de acciones heca de manera correcta",data)
            else:
                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
        finally:
            self.disconnect()

    def getAllActivityByAlmacenToday(self,sede,almacen):#retorna todas las actividades por el tipo de almacen espacios u coffeshop por la sede
        data=[]

        try:
            conection = self.connect()
            if conection['status']==True:
                cur = self.conn.cursor()  
               # sqlDEbug=f""" select  * from actividad_usuario where sede = '{sede}'  and date(fecha)= '{datetime.date.today()}' and accion like '%{almacen}%'  ORDER BY fecha DESC; """
                cur.execute(f""" select  * from actividad_usuario where sede = '{sede}'  and date(fecha)= '{datetime.date.today()}' and accion like '%{almacen}%'  ORDER BY fecha DESC; """)
                for i in cur :
                  #print(i)
                  data.append(AccionUserEntity(id=i[0],
                                               idUsuario=int(i[1]),
                                               nombre=i[2],
                                               idOperacion=i[3],
                                               accion=i[4],
                                               fecha=str(i[5]),
                                               sede=str(i[6])
                                               ))
                        
                return ResponseInternal.responseInternal(True,f"lectura de acciones heca de manera correcta",data)
            else:

                return ResponseInternal.responseInternal(False,"ERROR DE CONEXION A LA BASE DE DATOS...",None)
        finally:
            
            self.disconnect()

                      
    