# como iniciar el core del sistema 
``` shell
# accesso a la carpeta de la aplicacion
cd MUNAYSYSTEM"version"
#acceso al core de la aplicacion  
cd APP 
#activacvion del entrono virtual de python 
source ven/bin/activate 
#puesta en marcha del core 
uvicorn main:app --reload --port=8010 --host="ip del servidor "
```
