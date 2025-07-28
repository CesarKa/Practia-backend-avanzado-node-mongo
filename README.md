Nodepop
Nodepop es una aplicación web SSR construida con Node.js, Express.js, EJS y MongoDB, que permite a los usuarios logueados visualizar, crear y gestionar sus propios productos de manera sencilla y eficiente.

Este proyecto forma parte del módulo de Desarrollo backend con Node js del bootcamp Desarrollo Web de Keepcoding, donde se aplican conceptos clave como autenticación, rutas protegidas, gestión de datos con MongoDB y renderizado en el servidor utilizando EJS

---

Descripción del proyecto
Nodepop es un servicio donde los usuarios pueden:
Autenticarse usando su email y password
Registrar usuarios
Buscar productos filtrando por tags, precio y nombre.
Ver solo sus propios productos.
Crear y eliminar sus propios anuncios.

---

Tecnologías utilizadas
Node.js
Express.js
MongoDB / Mongoose
EJS (SSR)
Express-session
bcrypt
ESLint
JWT
RabbitMQ
Websockets

---

🛠️ Requisitos previos
Node.js (>= 18.x)
npm
MongoDB en local. Descargar de: https://www.mongodb.com/try/download/community

---

Demo de la aplicación
https://kc-nodepop.onrender.com/

Instalación paso a paso
Clonar el repositorio
git clone git@github.com:virgulilla/kc-nodepop.git
cd nodepop

Instalar dependencias
npm install

Variables de entorno
Renombra .env.example a .env

Pon tus datos de configuración en archivo .env para arrancar el entorno.

Inicialización de la base de datos
Si descargaste e instalaste MongoDB asegurate de que está el servicio corriendo.
  Entra en la consola dentro del proyecto y ejecuta:

npm run initDB


Arrancar el servidor
npm start


o con nodemon

npm run dev



Usuarios de prueba
admin@exmple.com Contraseña: 1234
user1@example.com Contraseña: 1234
user2@example.com Contraseña: 1234

Documentación de la API
Con Swagger: http://localhost:3000/api-doc/
Con Redoc: http://localhost:3000/redoc-static.html
MongoDB
Download MongoDB Community Server
Download MongoDB Community Server non-relational database to take your next big project to a higher level!
Download MongoDB Community Server
﻿
