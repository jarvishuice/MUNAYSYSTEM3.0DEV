from core.utils.security.cipher import Cypher
from core.Entities.user.usersEntity import UsersEntity
from core.Interface.User.Iuser import IUser
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from werkzeug.security import generate_password_hash, check_password_hash
import time
from config.Logs.LogsActivity import Logs


class UserDAO(ConectionsPsqlInterface, IUser):

    def __init__(self):
        super().__init__()

    def crearUser(self, usuario: UsersEntity) -> UsersEntity:
        cifrate = Cypher()
        try:
            idUsuario = self.___ContarUsuarios__()
            if idUsuario['status'] == True:

                conexion = self.connect()
                usuario.password = cifrate.encriptar(usuario.password)
                if conexion['status'] == True:
                    with self.conn.cursor() as cur:
                        cur.execute(f"""insert into usuarios(id,nombre,apellido,ci,nombreusuario,password,token,tipouser,urlimg,status) values({idUsuario['response']},'{usuario.nombre.upper()}'
                                    ,'{usuario.apellido.upper()}','{usuario.ci}','{usuario.nombreusuario.upper()}','{usuario.password}',
                                    'NO POSEE TOKEN ACTIVO','{usuario.tipoUsuario}','{usuario.urlImagen}','activo')""")
                        self.conn.commit()
                        return ResponseInternal.responseInternal(True, f"usuario registrado con exito detail[{dict(usuario)}]", usuario)
                else:
                    return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
            else:
                return ResponseInternal.responseInternal(False, "ERROR al validar el ususario...", None)
        except self.INTEGRIDAD_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error de integridad en la base de datos {e}")
            return ResponseInternal.responseInternal(False, f"error de bido a que ya existe un usuario con las mismas caracteristicas {usuario} ", None)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    def ___ContarUsuarios__(self):
        try:
            respuesta = None
            conexion = self.connect()

            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(
                        f"""select id as cantidad  from usuarios  order by id desc limit 1; """)
                    for i in cur:
                        respuesta = i[0] + 1
                    return ResponseInternal.responseInternal(True, f"usuario contado con exito con exito !!!", respuesta)
            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
        except self.INTEGRIDAD_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error de integridad en la base de datos {e}")
            return ResponseInternal.responseInternal(False, f"error de bido a que ya existe un usuario con las mismas caracteristicas  ", None)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    def busquedaUsuario(self, userName: str) -> UsersEntity:
        try:

            conexion = self.connect()

            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(
                        f"""select *  from usuarios where nombreusuario = '{userName}' """)
                    count = cur.rowcount
                    if count > 0:
                        for i in cur:
                            respuesta = UsersEntity(id=int(i[0]), nombre=str(i[1]), apellido=str(i[2]), ci=str(i[3]), nombreusuario=str(
                                i[4]), password=str(i[5]), token=str(i[6]), tipoUsuario=int(i[7]) or 0, urlImagen=str(i[8]), status=str(i[9]))
                        return ResponseInternal.responseInternal(True, f"usuario contado con exito con exito !!!", respuesta)
                    else:
                        return ResponseInternal.responseInternal(False, "NO se ha encontrado ningun  usuario ({username})", None)
            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)

        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    def cambiarEstatus(self, credential: UsersEntity, newStatus: str) -> UsersEntity:
        try:
            credential.status = newStatus
            conexion = self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(
                        f"update usuarios set status='{newStatus}' where id={credential.id}")
                    self.conn.commit()
                    count = cur.rowcount
                    if count > 0:
                        return ResponseInternal.responseInternal(True, "estatus de usuario cambiando con exito ", credential)

            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)

        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    def actualizarToken(self, credential: UsersEntity) -> UsersEntity:
        try:
            credential.token = str(time.time())
            conexion = self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(
                        f"update usuarios set token='{credential.token}' where id={credential.id}")
                    self.conn.commit()
                    count = cur.rowcount
                    if count > 0:
                        return ResponseInternal.responseInternal(True, f"token del usuario {credential.nombreusuario} con exito ", credential)

            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
        except self.INTEGRIDAD_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error de integridad en la base de datos {e}")
            return ResponseInternal.responseInternal(False, f"error debido a que ya existe un usuario con las mismas caracteristicas {credential} ", None)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    @property
    def getAllUsers(self):
        data = []
        try:

            conexion = self.connect()

            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""
                                   select id,nombre,apellido,ci,nombreusuario,password ,token ,status,tipouser,urlimg,ultima_sesion ,creado from usuarios
                                        
                                    """)
                    for i in cur:
                        data.append(UsersEntity(id=int(i[0]), nombre=i[1], apellido=i[2], ci=i[3], nombreusuario=i[4], password=i[5],
                                    token=i[6], status=i[7], tipoUsuario=int(i[8]), urlImagen=i[9], ultimaSesion=str(i[10]), creado=str(i[11])))
                    self.conn.commit()
                    return ResponseInternal.responseInternal(True, f"usuario registrado con exito detail[{(data)}]", data)
            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)

        except self.INTEGRIDAD_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error de integridad en la base de datos {e}")
            return ResponseInternal.responseInternal(False, f"error de bido a que ya existe un usuario con las mismas caracteristicas {data} ", None)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()

    def ActualizarPassword(self, idUser: int, password: str):
        security = Cypher()
        result = False
        try:

            conexion = self.connect()
            if conexion['status'] == True:
                with self.conn.cursor() as cur:
                    cur.execute(f"""
                                   update usuarios set password = '{security.encriptar(password)}' where id = {idUser}                                        
                                    """)

                    self.conn.commit()
                    res = True
                    return ResponseInternal.responseInternal(True, f"password del usuario -> {idUser} actualizada con exito", result)
            else:
                return ResponseInternal.responseInternal(False, "ERROR DE CONEXION A LA BASE DE DATOS...", None)
        except self.INTERFACE_ERROR as e:
            Logs.WirterTask(f"{self.ERROR} error de interface {e}")
            return ResponseInternal.responseInternal(False, "ERROR de interface en la base de datos ", None)
        except self.DATABASE_ERROR as e:
            Logs.WirterTask(
                f"{self.ERROR} error en la base de datos detail{e}")
            return ResponseInternal.responseInternal(False, "ERROR EN LA BASE DE DATOS", None)
        finally:
            self.disconnect()
