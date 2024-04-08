import datetime
import threading
from core.Entities.reports.client.clientReporteEntity import ClientReportEntity



class PlantillaHTMLHistorialCliente():
    def __init__(self) -> None:
        pass
    def __procesarOrdenesAbiertas(self,datos:ClientReportEntity):
        self.OrdenesAbiertas = ''
        if datos.ordenesAbiertas is not None:
            for i in datos.ordenesAbiertas:
                self.OrdenesAbiertas+=f"""<tr><td >{i.id}</td><td>{i.monto}$</td><td>{i.fpedido}</td></tr>"""
        return self.OrdenesAbiertas
    def __procesarOrdenesCerradas(self,datos:ClientReportEntity):
        self.OrdenesCerradas=" "
        self.totalCerrado = 0
        if datos.ordenesCerradas is not None:
            for i in datos.ordenesCerradas:
                self.OrdenesCerradas+=f"""<tr><td >{i.id}</td><td>{i.monto}$</td><td>{i.fpedido}</td><td>{i.fpagado}</td></tr>"""
                self.totalCerrado+=i.monto
    def __procesarPagos(self,datos:ClientReportEntity):
        self.Pagos=""
        bolos = 0
        if datos.pagos is not None:
            for i in datos.pagos:
                bolos = round((float(i.monto) * float(i.tasa)),2)
                self.Pagos+=f"""<tr><td >{i.id}</td><td>{i.monto}$</td><td>{bolos}Bs</td><td>{i.fecha}</td><td>{i.hora}</td><td>{i.metodo.upper()}</td><td>{i.referencia}</td><td>{i.motivo}</td><td>{i.tasa}</td></tr>"""
    def getHtml(self,sede,datos:ClientReportEntity):
        self.style = """<style>
        body {
          font-family: Arial, sans-serif;
        }
        
        table {
          border-collapse: collapse;
          width: 90%;
          margin-left:5%;
        }
        
        th, td {
          border: 1px solid black;
          padding: 1px 1px 1px;
          text-align: center;
        }
        
        th {
          background-color: #4682b4;
        }
        
        .total {
          font-weight: bold;
        }
         img{
          max-width:150px;
        }
        .parrafo{
        display: flex;
        justify-content: flex-end;
        margin-top:0px;
        }
        .imagen{
            max-width:150px;
            display: inline;
        }
        </style>"""
        #definicion de hilos  de ejecucion para vaciado de data 
        hOrdenesAbiertas= threading.Thread(target=self.__procesarOrdenesAbiertas,args=(datos,))
        hOrdenesCerradas= threading.Thread(target=self.__procesarOrdenesCerradas,args=(datos,))
        hPagos= threading.Thread(target=self.__procesarPagos,args=(datos,))
        #puesta en marcha de los hilos 
        hOrdenesAbiertas.start()
        hOrdenesCerradas.start()
        hPagos.start()
        #cierre de los hilos 
        hOrdenesAbiertas.join()
        hOrdenesCerradas.join()
        hPagos.join()
        html= f"""<!DOCTYPE html>
        <html>
        <head>
          <title>Reporte del Fin de Jornada Espacios</title>
        </head>
        {self.style}
        <body>
        <div>
        <div class="imgen"><img src="https://www.nestvzla.com/page/Home_files/i.png"/></div>
       <div class="parrafo"> <p >cliente:{datos.cliente.nombre}</br>
             ci/rif:{datos.cliente.ci}</br>
             correo:{datos.cliente.correo}</br>
             tlf:{datos.cliente.tlf}</br>
             </p></div>
             
            
         <center> <h1> Historico de cliente en la sede {sede}</h1> 
          <h3> {datetime.date.today()}</h3><br/>
          
          <center><h2> RESUMEN DE OPERACIONES</h2></center> 
          <table>
          <tr><th>TOTAL ORDENES CERRADAS $</th><th>{self.totalCerrado}$</tr>
          </table>
          <center> <h2> ORDENES ABIERTAS</h2> </center>
          <table>
          <tr><th>id</th><th>monto</th><th>fecha apertura</th></tr>
          {self.OrdenesAbiertas}
          </table>
          <center> <h2> ORDENES CERRADAS</h2> </center>
          <table>
          <tr><th>id</th><th>Monto</th><th>Fecha apertura</th><th>Fecha de cierre</th></tr>
          {self.OrdenesCerradas}
          </table>
          
          <center><h2>PAGOS</h2></center>
          <table>
          <tr><th>Id</th><th>Monto $</th><th>Monto Bs</th><th>Fecha</th><th>Hora</th><th>Metodo</th><th> Referencia</th><th>Motivo</th><th>Tasa</th></tr>
          {self.Pagos}
          </table>
          </body>
        </html>"""
        return html     