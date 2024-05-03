import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from PaqEnviadoEmail.Extractor import ExtarctorPDF
import datetime

class Correo:
    def __init__(self):
        pass 

    def EnviarPDF(self, destinatario, rutaArchivo, mensaje, Asunto):
        # Configuración del servidor SMTP y credenciales
        smtp_server = 'mail.nestvzla.com'
        smtp_port = 26
        smtp_username = 'munaysys@nestvzla.com'
        smtp_password = 'C4r4c4s2023**'

        # Crear objeto de mensaje
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = destinatario
        msg['Subject'] = Asunto
        
        # Adjuntar el archivo PDF
        nombre_archivo = rutaArchivo
        nombre= f'reporteCierreJornada{datetime.date.today()}'
        with open(nombre_archivo, 'rb') as archivo:
            adjunto = MIMEBase('application', 'pdf')
            adjunto.set_payload(archivo.read())
        encoders.encode_base64(adjunto)
        adjunto.add_header('Content-Disposition', f'attachment; filename={nombre}')
        msg.attach(adjunto)

        # Crear conexión segura con el servidor SMTP
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)

            # Enviar correo electrónico
            server.send_message(msg)
            
        print('Correo enviado exitosamente.')

