import threading
from PaqEnviadoEmail.Extractor import ExtarctorPDF
from PaqEnviadoEmail.Correo import Correo
import datetime
import time
import schedule

# Diccionario de contactos
CORREOS = {
    'jalisco': 'impresionestjalisco@nestvzla.com',
    'cfm': 'impresiones@nestvzla.com'
}

def extarctorJalisco():
    route = ''
    correo = Correo()
    extractor = ExtarctorPDF()
    trigger = extractor.downloadPDF('jalisco')
    if trigger['status'] == True:
        
        route = trigger['response']
        print(route)
        time.sleep(20)
        print("enviando el reporte")
        correo.EnviarPDF(CORREOS['jalisco'], route, f"reporte  cierre de jornada jalisco {datetime.date.today()}", f"reporte de pre cierre  dejornada jalisco {datetime.date.today()}")
    else:
        print('error al descargar el pdf')

def extarctorCfm():
    route = ''
    correo = Correo()
    extractor = ExtarctorPDF()
    trigger = extractor.downloadPDF('cfm')
    if trigger['status'] == True:
        route = trigger['response']
        time.sleep(20)
        print("enviando el reporte")
        correo.EnviarPDF(CORREOS['cfm'], route, f"reporte de cierre de jornada  cfm {datetime.date.today()}", f"reporte de pre cierre de jornada cfm {datetime.date.today()}")
    else:
        print('error al descargar el pdf')

def ejecutar_tareas():
    hiloJalisco = threading.Thread(target=extarctorJalisco, args=())
    hiloCfm = threading.Thread(target=extarctorCfm, args=())
    hiloJalisco.start()
    hiloCfm.start()
    hiloJalisco.join()
    hiloCfm.join()
    print("Se han enviado los correos !!!")

def programar_tareas():
    print("iniciando el software ")
    #schedule.every().day.at("18:30").do(ejecutar_tareas)
    schedule.every().day.at("10:40").do(ejecutar_tareas)

def main():
    programar_tareas()
    while True:
        schedule.run_pending()
        
        time.sleep(1)

main()
