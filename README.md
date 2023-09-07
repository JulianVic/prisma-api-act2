﻿# Ejecuta la aplicacion

Primeramente tenemos que clonar el siguiente repositorio con el comento git clone seguido de la url del repositorio.

Dentro de la carpeta de este proyecto debemos abrir una terminal y ejecutar el comando npm install para instalar todas las dependencias que esten dentro del package json para que el programa funcione correctamente.

Despues tenemos que agregar un archivo .env con una variable de entorno llamada DATABASE_URL, que tendra el valor de una base de datos en local de mysql.

una vez hecho todos estos pasos podemos ejecutar el comando npx prisma generate en nuestra terminal ubicados en la raiz del proyecto. para que prisma pueda leer los modelos de nuestra base de datos.

para correr el servidor podemos usar el comando disponible en nuestro package json: npm run dev.

para poder ver el codigo de este proyecto necesitamos un entorno de desarrollo o un editor de codigo.
