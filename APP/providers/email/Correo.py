import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
def send_email(recipient, subject, html_content, pdf_path,titleFile):
    """Sends an email with HTML content and a PDF attachment.

    Args:
        recipient (str): The recipient's email address.
        subject (str): The email subject.
        html_content (str): The HTML content of the email.
        pdf_path (str): The path to the PDF file.
    """

    try:
        msg = MIMEMultipart("alternative")
        msg['Subject'] = subject
        msg['From'] = "munaysys@nestvzla.com"
        msg['To'] = recipient

        # Create the HTML part
        part1 = MIMEText(html_content, 'html')
        msg.attach(part1)

        # Create the PDF part
        with open(pdf_path, 'rb') as pdf_file:
            pdf_data = pdf_file.read()
        part2 = MIMEBase('application', 'octet-stream')
        part2.set_payload(pdf_data)
        encoders.encode_base64(part2)
        part2.add_header('Content-Disposition', f'attachment; filename="{titleFile}.pdf"')
        msg.attach(part2)

        # Send the email
        server = smtplib.SMTP('mail.nestvzla.com', 587)
        server.starttls()
        server.login("munaysys@nestvzla.com", "C4r4c4s2023**")  # Replace with secure password storage
        text = msg.as_string()
        server.sendmail("munaysys@nestvzla.com", [recipient], text)
        server.quit()
        print("Email sent successfully to ") 
        logging.info(f"Email sent successfully to {recipient}")
        return True   
    except Exception as e:
        logging.error(f"Error sending email: {e}")
        return False
   