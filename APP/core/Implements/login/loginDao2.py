import time
from config.Logs.LogsActivity import Logs
from core.config.ResponseInternal import ResponseInternal
from core.Entities.user.usersEntity import UsersEntity
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from core.utils.security.cipher import Cypher


class LoginDao2(ConectionsPsqlInterface):
    def __init__(self):
        print("inicio de unidad de inicio de sesion ... ")
    def login(self, username, password):

        conexion =  self.connect()
        result = None
        encipt = Cypher()
        if conexion['status'] == True:
            try:
                with self.conn.cursor() as cur:
                    print("Busqueda de usuario ")
                    cur.execute(f"SELECT * FROM usuarios WHERE nombreusuario = '{username.upper()}' OR ci= '{username.upper()}' AND password = '{encipt.encriptar(password)}'")
                    count = cur.rowcount
                    if count > 0:
                        for i in cur :
                            result = UsersEntity(id=int(i[0]), nombre=str(i[1]), apellido=str(i[2]), ci=str(i[3]), 
                                                 nombreusuario=str(i[4]), password=str(i[5]), token=str(i[6]), 
                                                 tipoUsuario=int(i[7]) , urlImagen=str(i[8]), status=str(i[9]),
                                                 ultimaSesion=str(i[10]))
                        print("asignacion del token ")    
                        cur.execute(f"update usuarios set token='{time.time()}',ultima_sesion=now(),status='CONECTADO' where id ={result.id}")
                        self.conn.commit()
                        print("lectura del token")
                        cur.execute(f"select token,ultima_sesion from usuarios where id ={result.id}")
                        for i in cur :
                            result.token = str(i[0])
                            result.ultimaSesion = str(i[1])
                        cur.close()
                        return ResponseInternal.responseInternal(True, f"usuario {username} ha iniciado session de manera correcta  !!!", result)
                    else:
                        return ResponseInternal.responseInternal(True, f"usuario contado con exito con exito !!!", result)
            except self.INTEGRIDAD_ERROR as e:
                Logs.WirterTask(
                f"{self.ERROR} error de integridad en la base de datos {e}")
                return ResponseInternal.responseInternal(False, f"error de bido a que ya existe un usuario con las mismas caracteristicas {username} ", None)
            except self.INTERFACE_ERROR as e:
                Logs.WirterTask(f"{self.ERROR} error de interface {e}")
                return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
            except self.DATABASE_ERROR as e:
                Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
                return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
            finally:
                self.disconnect()
    def logout(self,idUser:int):
        print(f"inicio de sesion {idUser}")
        result =False
        conexion =  self.connect()
       
   
        if conexion['status'] == True:
            try:
                with self.conn.cursor() as cur:
                    print("Busqueda de usuario ")
                    cur.execute(f"update usuarios set token ='NO POSEE TOKEN ACTIVO',status='ACTIVO' where id ={idUser}")
                    
                    self.conn.commit()
                    result = True
                    return ResponseInternal.responseInternal(True, f"usuario {id} ha cerrado sesion de manera correcta  !!!", result)
                    
          
            except self.INTERFACE_ERROR as e:
                Logs.WirterTask(f"{self.ERROR} error de interface {e}")
                return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
            except self.DATABASE_ERROR as e:
                Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
                return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
            finally:
                self.disconnect()