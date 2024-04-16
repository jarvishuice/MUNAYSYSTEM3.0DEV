import threading
from core.Entities.reports.coffeshop.cofeshopReportEntity import ReporteCoffeshopEntity
import datetime
from config.Logs.LogsActivity import Logs
from core.Entities.reports.espacios.reporteEspaciosEntity import ReporteEspaciosEntity
class PlantillaHtmlUnificado():

    def __init__(self):
        pass
    def procesarVentasProductosCoffe(self,datos:ReporteCoffeshopEntity):
        self.ventasProductosCoffe=''
      
        self.totalventasProductosCoffe=0
        if datos.ventasPorProductos is not None:
           for i in datos.ventasPorProductos:
            print(f"debug line 16 plantillahtml {i}")    
            self.ventasProductosCoffe+=f"""<tr> <td colspan=3>{i.producto} </td><td>{i.cantidad} </td> <td>{i.total}$</td></tr>"""
            self.totalventasProductosCoffe+=i.total
        #print(type(datos.ventasPorProductos))
    def procesarVentasPorProductoEspacios(self,datos:ReporteEspaciosEntity):
        self.ventasPorProductoEspacios=''
        self.totalVentasPorProductosEspacios =0
        if datos.ventasPorProductos is not None:
            for i in datos.ventasPorProductos:
                self.ventasPorProductoEspacios+= f"""<tr> <td colspan=3>{i.producto} </td><td>{i.cantidad} </td> <td>{i.total}$</td></tr>"""
                self.totalVentasPorProductosEspacios+= i.total
                #print(i)

    def procesarOrdenesAbiertasCoffe(self,datos:ReporteCoffeshopEntity):
        self.TotalOrdenesAbiertasCoffe=0
        if datos.ordenesAbiertas is not None:
          for i in datos.ordenesAbiertas:
            self.TotalOrdenesAbiertasCoffe+= i.total
    def procesarOrdenesAbiertasEspacios(self,datos:ReporteEspaciosEntity):
        self.TotalOrdenesAbiertasEspacios=0
        if datos.ordenesAbiertas is not None:
          for i in datos.ordenesAbiertas:
            self.TotalOrdenesAbiertasEspacios+= i.total
    def procesarPagosCoffe(self,datos:ReporteCoffeshopEntity):
        self.totalPagosCoffe=0
        if datos.detallePagos is not None:
          for i in datos.detallePagos:
             self.totalPagosCoffe +=i.monto
        
    def procesarPagosEspacios(self,datos:ReporteEspaciosEntity):
      self.totalPagosEspacios=0
      if datos.detallePagos is not None:
        for i in datos.detallePagos:
           self.totalPagosEspacios+=i.monto
    def procesarDeudasClientesCoffe(self,datos:ReporteCoffeshopEntity):
      self.deudasClientesCoffe= ""
      if datos.deudaCliente is not None:
        for i in  datos.deudaCliente :
           self.deudasClientesCoffe+= f"<tr><td>{i.cliente}</td><td>{i.deuda}</td></tr>"
    def procesarDeudasClientesEspacios(self,datos:ReporteEspaciosEntity):
      self.deudasClientesEspacios= ""
      if datos.deudaCliente is not None:
        for i in  datos.deudaCliente :
           self.deudasClientesEspacios+= f"<tr><td>{i.cliente}</td><td>{i.deuda}</td></tr>"
    def getHTML(self, coffe: ReporteCoffeshopEntity,espacios:ReporteEspaciosEntity,sede:str,inicio:str,fin:str):
        #inicializando los hilos 
        hilo_ventasProductoCoffe =threading.Thread(target=self.procesarVentasProductosCoffe, args=(coffe,))
        hilo_ventasPorProductosEspacios=threading.Thread(target=self.procesarVentasPorProductoEspacios, args=(espacios,))
        hilo_ordenesAbiertasCoffe=threading.Thread(target=self.procesarOrdenesAbiertasCoffe, args=(coffe,))
        hilo_ordenesAbiertasEspacios=threading.Thread(target=self.procesarOrdenesAbiertasEspacios, args=(espacios,))
        hilo_pagosCoffe=threading.Thread(target=self.procesarPagosCoffe, args=(coffe,))
        hilo_pagosEspacios=threading.Thread(target=self.procesarPagosEspacios, args=(espacios,))
        hilo_deudasCoffe=threading.Thread(target=self.procesarDeudasClientesCoffe, args=(coffe,))
        hilo_deudasEspacios=threading.Thread(target=self.procesarDeudasClientesEspacios, args=(espacios,))
        #arranque de los hilos 
        hilo_ventasProductoCoffe.start()
        hilo_ventasPorProductosEspacios.start()
        hilo_ordenesAbiertasCoffe.start()
        hilo_ordenesAbiertasEspacios.start()
        hilo_pagosCoffe.start()
        hilo_pagosEspacios.start()
        hilo_deudasCoffe.start()
        hilo_deudasEspacios.start()

        #coordinacion de los hilos
        hilo_ventasProductoCoffe.join()
        hilo_ventasPorProductosEspacios.join()
        hilo_ordenesAbiertasCoffe.join()
        hilo_ordenesAbiertasEspacios.join()
        hilo_pagosCoffe.join()
        hilo_pagosEspacios.join()
        hilo_deudasCoffe.join()
        hilo_deudasEspacios.join()
        
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
        
        </style>"""
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <link rel="icon" type="image/svg+xml" href="https://www.nestvzla.com/page/Home_files/i.png">
          <title>Reporte general</title>
        </head>
        {self.style}
        <body>
        <div>
        <img src="http://www.nestvzla.com/page/Home_files/i.png"/>
        <p> fecha de emision: {datetime.datetime.today()}</p>
         <center> <h1> Reporte General desde {inicio} hasta {fin} {sede.upper()}</h1> 
                
                <table>
                <tr><th colspan=2>TOTALES DE VENTAS</th></tr>
                <tr><td>Total Ventas Coffeshop</td><td>{round(float(self.totalventasProductosCoffe),2)}$</td></tr>
                <tr><td>Total Ventas Espacios</td><td>{round(float(self.totalVentasPorProductosEspacios),2)}$</td></tr>
                <tr><td colspan=2 class="total"> TOTAL DE VENTAS  {round(float(self.totalventasProductosCoffe+self.totalVentasPorProductosEspacios),2)}$</td></tr>
                
                </table>
                </br>
                <table>
                <tr>
                <th colspan=3> TOTALES POR  COBRAR</th> </tr>
                <tr><td> Total Por Cobrar Coffeshop</td><td>{round(float(self.TotalOrdenesAbiertasCoffe),2)}$</td></tr>
                <tr><td> Total Por Cobrar Espacios </td><td>{round(float(self.TotalOrdenesAbiertasEspacios),2)}$</td></tr>
                <tr><td colspan=2 class="total"> TOTAL POR COBRAR   {round(float(self.TotalOrdenesAbiertasCoffe+self.TotalOrdenesAbiertasEspacios),2)}$</td></tr>
                </table>
                  </br>
                 <table>
                 <tr> <th colspan=3>VENTAS CONSOLIDADAS</th></tr>
                 <tr><td> Consolidado Coffeshop </td><td>{round(float(self.totalventasProductosCoffe -self.TotalOrdenesAbiertasCoffe),2)}$</td></tr>
                  <tr><td> Consolidado Espacios </td><td>{round(float(self.totalVentasPorProductosEspacios -self.TotalOrdenesAbiertasEspacios),2)}$</td></tr>
                  <tr><td colspan=2 class="total"> TOTAL CONSOLIDADO  {round(((float(self.totalventasProductosCoffe -self.TotalOrdenesAbiertasCoffe))+(float(self.totalVentasPorProductosEspacios -self.TotalOrdenesAbiertasEspacios))),2)}$</td></tr>
                  </table> 
                  </br>
                  <table>
                  <tr >  
                  <th colspan=3> TOTAL PAGOS  RECIBIDOS </th> 
                  </tr>
                  <tr> <td> Total Pagos Recibidos Coffeshop </td><td>{round(float(self.totalPagosCoffe),2)}$</td></tr>
                  <tr> <td> Total Pagos Recibidos Espacios </td><td>{round(float(self.totalPagosEspacios),2)}$</td></tr>
                  <tr><td colspan=2 class="total"> TOTAL PAGOS RECIBIDOS {round(float(self.totalPagosCoffe+self.totalPagosEspacios),2)}$ </td> </tr>
                  </table>
                         </br>

                  <center><h2>VENTAS POR PRODUCTOS COFFESHOP</h2></center>
                  <table>
                  <tr><th colspan=3> producto</th>
                     <th> cantidad</th>
                    <th> total</th>
                  </tr>
                  {self.ventasProductosCoffe}
                  </table> </br>
                  <center><h2>VENTAS POR PRODUCTOS ESPACIOS</h2></center>
                  <table>
                  <tr><th colspan=3> producto</th>
                     <th> cantidad</th>
                    <th> total</th>
                  </tr>
                  {self.ventasPorProductoEspacios}
                  </table> </br>
                  <center><h2> DEUDAS  POR CLIENTES COFFESHOP</h2></center>
                  <table>
                  <tr><th> cliente</th><th>deuda</th> </tr>
                  {self.deudasClientesCoffe}

                  </table>
                  </br>
                  <center><h2> DEUDAS  POR CLIENTES ESPACIOS</h2></center>
                  <table>
                  <tr><th> cliente</th><th>deuda</th> </tr>
                  {self.deudasClientesEspacios}

                  </table>



        </div>
        </body>
        </html>
        """
        print(html)
        return html