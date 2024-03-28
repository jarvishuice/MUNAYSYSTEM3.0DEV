import sqlite3
from core.Interface.config.DataBase.conectionsInterface import ConectionDbInterface
from core.config.ResponseInternal import ResponseInternal
from config.Logs.LogsActivity import Logs


class ConectionsSqliteInterface(ConectionDbInterface):

   
    def connect(self):
        try:
            # Replace this with your SQLite database path
            self.conn = sqlite3.connect("/home/munay/MUNAYSYSTEM3.0/APP/assets/userAccion/user.db")
            return ResponseInternal.responseInternal(status=True, mesagge="Conexión exitosa a la base de datos", response="conexión exitosa")
        except sqlite3.OperationalError as err:
            return ResponseInternal.responseInternal(status=False, mesagge=f"{self.ERROR} Error en la conexión a la base de datos: {err}", response=None)
        except sqlite3.DatabaseError as err:
            return ResponseInternal.responseInternal(status=False, mesagge=f"Error de base de datos al intentar conectar: {err}", response=None)

    def disconnect(self):
        if self.conn is not None:
            self.conn.close()
            Logs.WirterTask("Desconexión exitosa de la base de datos")
            self.conn = None
        else:
            Logs.WirterTask(f"{self.NOTE} No tiene conexión abierta en estos momentos")
