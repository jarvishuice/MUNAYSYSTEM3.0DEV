import pdfkit
import time
import datetime
from core.config.ResponseInternal import ResponseInternal
from config.Db.conectionsPsqlInterface import ConectionsPsqlInterface
from core.Implements.reports.coffeshop.cierreByTemporalidadDAO import ReportCierreByTemporalidadDAO
from core.Implements.reports.espacios.cierreByFechaDAO import ReportCierreDAO as espacios 
from core.utils.plantillaHtmlUnificadoFechas import PlantillaHtmlUnificado

class ReporteUnificadoByFechasDAO(ConectionsPsqlInterface):
    OPTIONS = {
                      'page-size': 'Letter', 
      'margin-top': '0.75in',
      'margin-right': '0.75in',
      'margin-bottom': '0.75in', 
      'margin-left': '0.75in'
                    }
    __coreCoffe= ReportCierreByTemporalidadDAO()
    plantilla = PlantillaHtmlUnificado()
    __coreEspacios= espacios()
    def __init__(self):
        super().__init__()
    def __coffe(self,sede,inicio,fin):
        core= self.__coreCoffe.integracion(sede,inicio,fin)
        return core["response"]
    def __espacios(self,sede,inicio,fin):
        core=self.__coreEspacios.integracion(sede,inicio,fin)
        return core["response"]
    def generar(self,sede,inicio,fin):
        COFFE = self.__coffe(sede,inicio,fin)
        ESPACIOS = self.__espacios(sede,inicio,fin)
        html = self.plantilla.getHTML(coffe=COFFE,espacios=ESPACIOS,sede=sede,inicio=inicio,fin=fin)
        output_path =f"assets/reports/unificado/unificado{inicio+fin+sede}.pdf"
        pdf=pdfkit.from_string(html,output_path,options=self.OPTIONS)
        return ResponseInternal.responseInternal(True,"reporte unificado generado con exito",output_path)
    def html(self,sede,inicio,fin):
        COFFE = self.__coffe(sede,inicio,fin)
        ESPACIOS = self.__espacios(sede,inicio,fin)
        html = self.plantilla.getHTML(coffe=COFFE,espacios=ESPACIOS,sede=sede,inicio=inicio,fin=fin)
        #output_path =f"assets/reports/unificado/unificado{sede}{datetime.datetime.today()}.pdf"
        #pdf=pdfkit.from_string(html,output_path,options=self.OPTIONS)
        print(html)
        return ResponseInternal.responseInternal(True,"reporte unificado generado con exito",html)
