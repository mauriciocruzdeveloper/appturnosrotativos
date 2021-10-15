# TPfinal
Para instalar la app se debe entrar por consola y ejecutar "npm i" en la carpeta TPfinal/backend para el servidor y TPfinal/frontend/appturnosrotativos para la aplicación.
Una vez instalada, ejecutar "npm start" para la aplicación y "npm run nodemon" para el servidor.

Cuando iniciamos la app se abre la pantalla de login. Para empezar a usarla como administrador se debe ingresar "mauricio@mauricio.com" en el campo de email y "mauricio" en el campo del password (Es como una puerta trasera). Luego dentro, como administrador, se pueden dar de alta otros usuarios administradores y/o usuarios normales.

El usuario normal sólo puede acceder a la grilla de turnos. Allí podrá dar click al día que desea seleccionar su turno según la disponibilidad y las reglas.

El admnistrador puede dar de alta usuarios y tipos de Jornada, aunque falta terminar la app para que funcione correctamente si borro los tipo de jornada que sí o sí tienen que estar, como por ejemplo el Turno Normal o el Día Libre.

Está hecho lo que tiene que ver con protección de rutas. Si el usuario no está logueado, no pasa de la pantalla de login. Tampoco puede ingresar una ruta y saltearse la pantalla de login. Si el uruario es administrador va a ver ciertas pantallas, y si es usuario común, otras pantallas.

Si la app está fetcheando, aparece un mensaje de "cargando...".

Si hay algún problema con el token no me permite el acceso.


La app respeta las siguientes consideraciones del TP.

-Cada empleado solo puede ingresar a la pantalla de carga de jornada laboral
-Tener un perfil para administrar toda la aplicación
-Cada empleado no puede trabajar más de 48 horas semanales
-Cada empleado no puede tener más de un turno normal más un turno extra consecutivo
-Por cada turno no puede haber más que 2 empleados.
-Si un empleado cargó “Dia libre” son 24 horas que no puede trabajar
-En el mes cada empleado debería tener al menos 2 días libres

La base de datos es remota.

Usé redux para el manejo de los estados. La persistencia se hace en la base de datos, y en la app se manejan datos necesarios para el funcionamiento mediante redux. Los eventos se manejan como acciones que luego terminan en el reducer. El reducer modifica los estados y los componentes leen esos estados para presentar lo que tienen que presentar. Hay un reducer, un archivo de acciones, y otro de tipos de acciones para cada entidad (Turnos, Empleados, etc...).

Si no funciona bootstrap, instalar "npm i @popperjs/core".

La encriptación del password al dar de alta un empleado se hace del lado del servidor.
Se usa "npm install bcrypt" para instalar el complemento en el backend.

Uso JWT para autenticar al usuario cuando se conecta al backend para usar sus servicios. Se instala con "npm install jsonwebtoken".

Se usaron variables de entorno (dotenv).

Resumen de tecnologías usadas (unas más, otras menos, unas mejor y otras peor):
- Express
- MongoDB
- Mongoose
- dotenv
- styled-components
- react-router-dom
- redux thunk
- jwt
- bcrypt
- bootstrap
- react
- cors
- nodemon
- axios

TODO ES MEJORABLE Y REFACTORIZABLE.
Hay cosas que están hechas bien, otras no tanto, otras fueron consecuencia del apuro, etc. En general está la estructura, luego hay que mejorar algunas cosas. Es una primera iteración se podría decir.


Para solucionar cualquier inconveniente o duda, escribir a mauricio11111@gmail.com





