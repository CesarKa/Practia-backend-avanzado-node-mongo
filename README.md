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

---

🛠️ Requisitos previos
Node.js (>= 18.x)
npm
MongoDB en local. Descargar de: https://www.mongodb.com/try/download/community

---

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
MongoDB
Download MongoDB Community Server
Download MongoDB Community Server non-relational database to take your next big project to a higher level!
Download MongoDB Community Server

 GET /products/
Descripción:
Obtiene una lista paginada de productos filtrados.

Middlewares:
isAuthenticated
validateProductFilters

Parámetros de consulta (query):
category (opcional): categoría del producto
priceMin, priceMax (opcional): rango de precio
page (opcional): número de página
limit (opcional): cantidad de resultados por página
Otros filtros definidos en validateProductFilters

Respuesta:
Renderiza la vista products con:
products, currentPage, totalPages, totalProducts, limit

---

GET /products/add
Descripción:
Renderiza el formulario para añadir un nuevo producto.

Middlewares:
isAuthenticated

---

POST /products/add
Descripción:
Crea un nuevo producto.

Middlewares:
isAuthenticated
upload.single("image")

Body (form-data):
name: nombre del producto
price: precio
category: categoría
image: archivo de imagen (campo: image)

Respuesta:
Redirección o render según el resultado.

---

GET /products/:id
Descripción:
Muestra detalles de un producto específico.

Middlewares:
isAuthenticated

URL Params:
id: ID del producto

---

POST /products/:id/delete
Descripción:
Elimina un producto específico.

Middlewares:
isAuthenticated

URL Params:
id: ID del producto a eliminar

---

🔐 Auth API
Rutas responsables del flujo de autenticación de usuarios. Algunas rutas aplican validaciones de campos mediante validateUserFields.

---

GET /auth/login
Descripción:
Renderiza el formulario de login.

---

POST /auth/login
Descripción:
Procesa el login del usuario.

Middlewares:
validateUserFields

Body (form-urlencoded / JSON):
email: email del usuario
password: contraseña del usuario

Respuesta:
Redirección a la vista protegida en caso de éxito
Render de errores en caso de validación fallida o credenciales incorrectas

---

GET /auth/signup
Descripción:
Renderiza el formulario de registro de usuario.

---

POST /auth/signup
Descripción:
Registra un nuevo usuario.

Middlewares:
validateUserFields

Body (form-urlencoded / JSON):
email: email del usuario
password: contraseña
confirmPassword: confirmación de la contraseña
Otros campos requeridos según validateUserFields

Respuesta:
Registro exitoso: redirección a login o sesión iniciada
Registro fallido: render con errores

---

GET /auth/logout
Descripción:
Cierra la sesión del usuario actual.

Respuesta:
Redirección al login o página pública

