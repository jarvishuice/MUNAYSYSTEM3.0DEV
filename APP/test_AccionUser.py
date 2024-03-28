import unittest
import time
from core.ROOM.userAccion.registerAccion import AccionUserEntity, RegisterAccion
from colorama import Fore, init

init()

class TestRegisterAccion(unittest.TestCase):
    def test_registrarActividad(self):
        # Crea una instancia de RegisterAccion
        core = RegisterAccion()

        # Crea una instancia de AccionUserEntity con datos de prueba
        accion = AccionUserEntity(
            id=str(time.time()),
            idUsuario=8,
            nombre="jarvis",
            idOperacion="prueba",
            accion="probadera sistema",
            fecha="x",
            sede="cfm"
        )

        # Llama al método registrarActividad y verifica si devuelve una respuesta
        response = core.registrarActividad(accion)
        self.assertIsNotNone(response)

    def test_getAllActivity(self):
        # Crea una instancia de RegisterAccion
        core = RegisterAccion()

        # Llama al método getAllActivity y verifica si devuelve una respuesta
        response = core.getAllActivity
        self.assertIsNotNone(response)
        print(Fore.GREEN + f"{response['response']}")
    def test_getActivdadTodaySede(self):
        core = RegisterAccion()
        sede = "cfm"
        print(sede)
        response = core.getActivdadTodaySede(sede)
        print(Fore.GREEN + f"{response['response']}")
        self.assertIsNotNone(response)
        print(":\n \n Actividad por dia y sede  \n \n")
        print(Fore.GREEN + f"{response['response']}")
if __name__ == "__main__":
    unittest.main()
