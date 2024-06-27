
import threading
from core.Entities.facturas.facturaEntity import FacturaEntity
import locale

class PlantillaHTMLFactura():
    locale.setlocale(locale.LC_ALL, "")
    style = """<style>
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
        
      
        .total {
          font-weight: bold;
        }
         img{
          max-width:150px;
        }
        .fecha{
            max-width:400px;
            margin-top:220px;
            margin-left:70%;
        }
        .TablaCompleta{
          width: 800px;
          min-width:800px;
          max-width:800px;
          
        }
        .sinBorde  {border: 0; 
         }
        </style>"""
    piePg= f"""A los efectos de lo previsto en el Artículo 25 de la Ley de Impuesto al valor agregado (IVA) se establece  la conversión en moneda extranjera  según el cambio establecido por el Banco Central de venezuela(B.C.V) de Bs por (UN) 1.00$USD con fecha del dia  """

    html = None
    def __procesarDetalles(self,factura:FacturaEntity):
        self.tablaDetalles = ""
        item = 0
        #print( 'este es la longitud de los detalles ->'+str(len(factura.detalle)))
        
        for i in factura.detalle:
            item += 1 
            self.tablaDetalles += f"""
            <tr>
            <td>{item}</td>
            <td>{int(i.cantidad)}</td>
            <td colspan=3>{i.producto}</td>
            <td>{locale.format('%.2f',i.precioUnitarioD,grouping=True,monetary=True)}</td>
            <td>{locale.format('%.2f',i.totalD,grouping=True,monetary=True)}</td>
            <td>{locale.format('%.2f',i.precioUnitariobs,grouping=True,monetary=True)}</td>
            <td>{locale.format('%.2f',i.totalBs,grouping=True,monetary=True)}</td>
            </tr>
    
        
        
        """
        if len(factura.detalle) < 6:
           for i in range(6-len(factura.detalle)):
                item = item+1
                self.tablaDetalles += f"""
                 <tr>
            <td>{item}</td>
            <td></td>
            <td colspan=3></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>"""
            
        
    def __procesarEncabezado(self,factura:FacturaEntity):
        self.encabezado = None
        self.Fecha= None
        self.nFactura = None
        self.Fecha = f"<tr> <th class=sinBorde colspan=2></th><th class=sinBorde></th><th class=sinBorde></th><thclass=sinBorde></th><th >Fecha</th><td>{factura.encabezado.fecha[:11]}</td></tr>"
        self.nFactura = f"<tr><th class=sinBorde colspan=2></th><th class=sinBorde></th><th class=sinBorde></th><thclass=sinBorde></th><th >FACTURA°</th><td>{factura.encabezado.nFactura}</td></tr>"
        self.encabezado = f"""<tr>
                                    <th>Nombre o Razón social  </th>
                                    <td colspan=3><center>{factura.encabezado.nombre}</center></td>
                                    <th>C.I / Rif:</th> <td colspan=5>{factura.encabezado.ci.upper()}</td>
                              </tr>
                              <tr>
                              <th>Dirección</th>
                              <td colspan=3>{factura.encabezado.direcion}</td>
                              <th> Condiciones de pago</th>
                              <td>CONTADO</td>
                              </tr>"""
    def getHtml(self, factura: FacturaEntity):
        
        #inicio de los hilos para relleno de factura
        hiloDetalles = threading.Thread(target=self.__procesarDetalles(factura), args=(factura,))
        hiloEncabezado = threading.Thread(target=self.__procesarEncabezado(factura), args=(factura,))
        #ejecucion de hilos 
        hiloDetalles.start()
        hiloEncabezado.start()
        #cierre de los hilos
        hiloDetalles.join()
        hiloEncabezado.join()
        html = f"""
        <!DOCTYPE html >
        <html>
        <head>
        <meta charset="UTF-8"/>
        <link rel="icon" type="image/svg+xml" href="https://www.nestvzla.com/page/Home_files/i.png">
          <title>Reporte general</title>
        </head>
        {self.style}
        <body>
        <div >
        </br>
        </br>
        </br>  
        <table class=TablaCompleta>
       {self.nFactura}
        {self.Fecha}
        <tr><th colspan=6 class=sinBorde></th></tr>
        <tr><th colspan=6 class=sinBorde></th></tr>
        <tr><th colspan=6 class=sinBorde></th></tr>
         <tr><th colspan=6 class=sinBorde></th></tr>
        <tr><th colspan=6 class=sinBorde></th></tr>
        <tr><th colspan=6 class=sinBorde></th></tr>
        <tr><th colspan=6 class=sinBorde></th></tr>
        {self.encabezado}  
        
        </table>
    
        </br>
        </br>
        <table class=TablaCompleta>
        
        <tr>
        <th>Item</th>
        <th>Cant</th>
        <th colspan=3>Descripcion</th>
        <th>$USD Unitario</th>
        <th>$USD Total</th>
        <th>BS. Unitario</th>
        <th>BS. Total</th>
        </tr>
        {self.tablaDetalles}
        <tr>
         
          <td  class=sinBorde rowspan=2 colspan=5><small>{self.piePg + str(factura.encabezado.fecha[:10])+'  '+'  <b>'+str(locale.format('%.2f',factura.encabezado.tasa,grouping=True,monetary= True))+'.Bs </b>'}</small></td>
        <td class=sinBorde></td>
          <th>{locale.format('%.2f',factura.encabezado.baseDivisa,grouping=True,monetary=True)}</th> 
          <th>Base Imponible</th>
          <th>{locale.format('%.2f',factura.encabezado.baseBs,grouping=True,monetary=True)}</th>
          
          
        </tr>
       
        <tr>
          <td class=sinBorde></td>
          <th>{locale.format('%.2f',factura.encabezado.iva,grouping=True,monetary=True)}</th>
          <th>IVA 16%</th>
          <th>{locale.format('%.2f',factura.encabezado.ivaBS,grouping=True,monetary=True)}</th>
        </tr>
        <tr>
        <td  class=sinBorde rowspan=2 colspan=6></td>
        <th>{locale.format('%.2f',factura.encabezado.totalDivisa,grouping=True,monetary=True)} </th>
        <th>Total</th>
        <th>{locale.format('%.2f',factura.encabezado.totalBs,grouping=True,monetary=True)} </th>
        </tr>
        </table>
      
        </div>
        
        </body>
        </html>
        """
        return html.replace("\n", "")