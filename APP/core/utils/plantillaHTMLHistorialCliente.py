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
    def __procesarPedidos(self,datos:ClientReportEntity):
        self.PedidosAbiertos=""
        self.pedidos = ""
        if datos.pedidos is not None:
            for i in datos.pedidos:
                if i.status == "por pagar":
                    self.PedidosAbiertos+=f"""<tr><td>{i.idOrden}</td><td>{i.fPedido}</td><td>{i.producto}</td><td>{i.cantidad}</td><td>{i.total}$</td></tr>"""
                self.pedidos+=f""" <tr><td>{i.idOrden}</td><td>{i.fPedido}</td><td>{i.producto}</td><td>{i.cantidad}</td><td>{i.total}$</td><td>{i.status}</td></tr>"""
    def __procesarWallet(self,datos:ClientReportEntity):
       self.wallet = ""
       self.totalWallet = 0
       if datos.walletOperaciones is not None:
           for i in datos.walletOperaciones:
               self.wallet+=f"""<tr><td>{i.id}</td><td>{i.monto}$</td></tr>"""
               self.totalWallet +=round(float(i.monto),2)
               
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
         img {
    display: flex;
    max-width: 100%;
    height: auto;
}
        .parrafo{
        display: flex;
        justify-content: flex-end;
        margin-top:0px;
        }
       
        </style>"""
        #definicion de hilos  de ejecucion para vaciado de data 
        hOrdenesAbiertas= threading.Thread(target=self.__procesarOrdenesAbiertas,args=(datos,))
        hOrdenesCerradas= threading.Thread(target=self.__procesarOrdenesCerradas,args=(datos,))
        hPagos= threading.Thread(target=self.__procesarPagos,args=(datos,))
        hPedidos = threading.Thread(target=self.__procesarPedidos,args=(datos,))
        hWallet = threading.Thread(target=self.__procesarWallet,args=(datos,))
        #puesta en marcha de los hilos 
        hOrdenesAbiertas.start()
        hOrdenesCerradas.start()
        hPagos.start()
        hPedidos.start()
        hWallet.start()
        #cierre de los hilos 
        hOrdenesAbiertas.join()
        hOrdenesCerradas.join()
        hPagos.join()
        hPedidos.join()
        hWallet.join()
        html= f"""<!DOCTYPE html>
        <html>
        <head>
          <title>Reporte del Fin de Jornada Espacios</title>
        </head>
        {self.style}
        <body>
        <div>
        <div class="imagen"></div>
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
          <tr><th>SALDO WALLET</th><th>{self.totalWallet}$</th><tr>
          </table>
          <center> <h2> ORDENES ABIERTAS</h2> </center>
          <table>
          <tr><th>id</th><th>monto</th><th>fecha apertura</th></tr>
          {self.OrdenesAbiertas}
          </table>
          <center><h2>DETALLES DE ORDENES POR PAGAR</h2></center>
          <table>
          <tr><th>Id Orden</th><th>Fecha</th><th>Producto</th><th>Cantidad</th><th>Total$</th></tr>
          {self.PedidosAbiertos}
          </table>
          <center> <h2> ORDENES CERRADAS</h2> </center>
          <table>
          <tr><th>id</th><th>Monto</th><th>Fecha apertura</th><th>Fecha de cierre</th></tr>
          {self.OrdenesCerradas}
          </table>
          <center><h2>DETALLES DE ORDENES </h2></center>
          <table>
          <tr><th>Id Orden</th><th>Fecha</th><th>Producto</th><th>Cantidad</th><th>Total$</th><th>Status</th></tr>
          {self.pedidos}
          </table>
          <center><h2>PAGOS</h2></center>
          <table>
          <tr><th>Id</th><th>Monto $</th><th>Monto Bs</th><th>Fecha</th><th>Hora</th><th>Metodo</th><th> Referencia</th><th>Motivo</th><th>Tasa</th></tr>
          {self.Pagos}
          </table>
          <center><h2> OPERACION </h2></center>
          <table>
          <tr><th>Id</th><th>Monto $</th></tr>
          {self.wallet}
          </table>
          </body>
        </html>"""
        return html     