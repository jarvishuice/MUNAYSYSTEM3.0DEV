import time
from core.ROOM.userAccion.registerAccion import AccionUserEntity,RegisterAccion

def testSQlite():
    core = RegisterAccion()
    response=core.registrarActividad(AccionUserEntity(id=str(time.time()),idUsuario=8,nombre="jarvis",idOperacion="prueba",accion="probadera sistema",fecha="x"))
    print(response)
y= testSQlite()