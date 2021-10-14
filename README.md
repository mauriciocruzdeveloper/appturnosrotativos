# TPfinal
Para instalar la app se debe entrar por consola y ejecutar "npm i" en la carpeta TPfinal/backend para el servidor y TPfinal/frontend/appturnosrotativos para la aplicación.
Una vez instalada, ejecutar "npm start" para la aplicación y "npm run nodemon" para el servidor.

Cuando iniciamos la app se abre la pantalla de login. Para empezar a usarla como administrador se debe ingresar "mauricio@mauricio.com" en el campo de email y "mauricio" en el campo del password (Es como una puerta trasera). Luego dentro, como administrador, se pueden dar de alta otros usuarios administradores y/o usuarios normales.

El usuario normal sólo puede acceder a la grilla de turnos. Allí podrá dar click al día que desea seleccionar su turno según la disponibilidad.

El admnistrador puede dar de alta usuarios y tipos de Jornada, aunque falta terminar la app para que funcione correctamente si borro los tipo de jornada que sí o sí tienen que estar como por ejemplo el Turno Normal o el Día Libre.

Está hecho lo que tiene que ver con protección de rutas. Si el usuario no está logueado, no pasa de la pantalla de login. Tampoco puede ingresar una ruta y saltearse la pantalla de login. Si el uruario es administrador va a ver ciertas pantallas, y si es usuario común, otras pantallas.

La app respeta las siguientes consideraciones del TP.

-Cada empleado solo puede ingresar a la pantalla de carga de jornada laboral
-Tener un perfil para administrar toda la aplicación
-Cada empleado no puede trabajar más de 48 horas semanales
-Cada empleado no puede tener más de un turno normal más un turno extra consecutivo
-Por cada turno no puede haber más que 2 empleados.
-Si un empleado cargó “Dia libre” son 24 horas que no puede trabajar
-En el mes cada empleado debería tener al menos 2 días libres

Para correr la app se tiene que tener instalada la base de datos mongoDB. No usé un servicio en la nube porque el TP dice que hay que usar lo que se aprendió en clase. Por otro lado pide que la base de datos sea remota, pero por una cuestión de que levante fácilmente la app. En definitiva, corrí el servidor localmente para poder hacer el backend. Si usaba una base de datos en la nube no podía hacer el backend.

Usé redux para el manejo de los estados. La persistencia se hace en la base de datos, y en la app se manejan datos necesarios para el funcionamiento mediante redux. Los eventos se manejan como acciones que luego terminan en el reducer. El reducer modifica los estados y los componentes leen esos estados para presentar lo que tienen que presentar. Hay un reducer, un archivo de acciones, y otro de tipos de acciones para cada entidad (Turnos, Empleados, etc...).

Si no funciona bootstrap, instalar npm i @popperjs/core.

La encriptación del password al dar de alta un empleado se hace del lado del servidor, como corresponde.
Se usa "npm install bcrypt" para instalar el complemento en el backend.

Para solucionar cualquier inconveniente o duda, escribir a mauricio11111@gmail.com





