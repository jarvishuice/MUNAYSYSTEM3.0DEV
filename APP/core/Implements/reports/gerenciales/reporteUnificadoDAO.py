import pdfkit
import time
import datetime
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from core.Implements.reports.coffeshop.cierreDAO import ReportCierreDAO
from core.Implements.reports.espacios.cierreDAO import ReportCierreDAO as espacios
from core.utils.plantillaHtmlUnificado import PlantillaHtmlUnificado
class ReporteUnificadoDAO(ConectionsPsqlInterface):
    OPTIONS = {
                      'page-size': 'Letter', 
      'margin-top': '0.75in',
      'margin-right': '0.75in',
      'margin-bottom': '0.75in', 
      'margin-left': '0.75in'
                    }
    __coreCoffe= ReportCierreDAO()
    plantilla = PlantillaHtmlUnificado()
    __coreEspacios= espacios()
    def __init__(self):
        super().__init__()
    def __coffe(self,sede):
        core= self.__coreCoffe.integracion(sede)
        return core["response"]
    def __espacios(self,sede):
        core=self.__coreEspacios.integracion(sede)
        return core["response"]
    def generar(self,sede):
        COFFE = self.__coffe(sede)
        ESPACIOS = self.__espacios(sede)
        html = self.plantilla.getHTML(coffe=COFFE,espacios=ESPACIOS,sede=sede)
        output_path =f"assets/reports/unificado/unificado{sede}{datetime.datetime.today()}.pdf"
        pdf=pdfkit.from_string(html,output_path,options=self.OPTIONS)
        return ResponseInternal.responseInternal(True,"reporte unificado generado con exito",output_path)

    def html(self,sede):
        COFFE = self.__coffe(sede)
        ESPACIOS = self.__espacios(sede)
        html = self.plantilla.getHTML(coffe=COFFE,espacios=ESPACIOS,sede=sede)
        #output_path =f"assets/reports/unificado/unificado{sede}{datetime.datetime.today()}.pdf"
        #pdf=pdfkit.from_string(html,output_path,options=self.OPTIONS)
        return ResponseInternal.responseInternal(True,"reporte unificado generado con exito",html)

    


