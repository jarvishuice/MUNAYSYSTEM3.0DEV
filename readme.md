# MunaySystem v3.0

MunaySystem es una aplicación web diseñada para gestionar un cafetín y facilitar el alquiler de espacios. La versión 3.0 trae consigo emocionantes mejoras:
## Novedades en la Versión 3.0

     Gestión de Deudas con Concepto de “Abono”:
        Ahora, MunaySystem permite registrar y rastrear deudas de manera más precisa. Se ha introducido el concepto de abono, lo que facilita el seguimiento de pagos parciales o adelantos.
        Los usuarios pueden registrar abonos a las deudas existentes, lo que mejora la gestión financiera.
        al igual que al cambiar la fecha de un pago se actualiza automaticamente la fecha de pago de la orden vinculada directamente con dicho pago 

    Navegación Mejorada:
        En lugar de redirigir siempre al punto de venta (POS), la versión 3.0 permite que los usuarios continúen en la pestaña actual. Esto agiliza la experiencia de navegación y evita interrupciones innecesarias.

    Interfaz Gráfica Amigable y Organizada:
        Hemos rediseñado la interfaz para que sea más intuitiva y fácil de usar.
        Los elementos están organizados de manera lógica, lo que facilita la navegación y la realización de tareas.

## Tecnologías Utilizadas

    Backend:
        Python: Lenguaje de programación principal.
        PostgreSQL: Base de datos relacional para almacenar datos.
        Sqllite3:BAse de dato relacion paara almacenar datos internos del core de la aplicacion .
        Patrón DAO: Separación de la lógica de acceso a datos.
        Patrón MVC: Organización de la estructura del proyecto.

    Frontend:
        React: Biblioteca de JavaScript para construir interfaces de usuario.
        TypeScript: Superset de JavaScript para agregar tipos estáticos.
        Material-UI: Componentes predefinidos para una apariencia moderna.

Configuración

    Clona este repositorio:

    git clone https://github.com/tuusuario/munaysystem.git

    Instala las dependencias:

    cd munaysystem
    npm install

    Configura la conexión a la base de datos en server/config.py.

    Ejecuta el servidor:

    python server.py

    Inicia la aplicación frontend:

    npm start

# imagen del POS en  el area de cafetin
![alt text][def]



[def]: image.png