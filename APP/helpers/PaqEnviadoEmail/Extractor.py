import datetime
import requests



class ExtarctorPDF:
    def __inti__():
    
        pass
    def downloadPDF(self,sede) ->dict:
        nombre_archivo=''
        
        nombre_archivo=f'preCierre{sede}{datetime.date.today()}.pdf'
        route=f"assets/{nombre_archivo}"
        url=f'http://191.97.17.26:8011/MUNAY/nest/Reports/coffeshop/cierre/{sede}'
        response  = requests.get(url)
        if response.status_code == 200:
            with open(route, 'wb') as archivo:
                archivo.write(response.content)
                print('Archivo descargado exitosamente.')
                return{"status":True,"mesagge":"Archivo descargado de manera exitosa","response":route}
        else:
            return{"status":False,"mesagge":f"error en la solicitud al servidor{response.status_code} ","response":None}