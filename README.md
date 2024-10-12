# PROTA

## Descripción

Este proyecto corresponde a la **Prueba Técnica** para el puesto de **Desarrollador Frontend - Angular**. La aplicación está diseñada para gestionar proyectos y tareas, y utiliza Angular junto con un servidor JSON simulado para el manejo de datos.

## Requisitos

1. Clona el repositorio: **git clone https://github.com/karenyulierr/projects_tasks.git** o Descarga el .zip

2. Instala las dependencias del proyecto: **npm install**



## Ejecución de la Aplicación

Para ejecutar la aplicación, sigue estos pasos:


1. Inicia el servidor de desarrollo de Angular: **ng serve**

2. En otra terminal, asegúrate de estar en la raíz del proyecto y ejecuta el servidor JSON:

**npx json-server --watch -p 3001 db.json**


**Nota**: Si el puerto 3001 está ocupado, las APIs no funcionarán correctamente, ya que están configuradas para acceder a este puerto.


## Acceso a la Aplicación
Para ingresar al sistema, utiliza las siguientes credenciales:

Correo: **admin@gmail.com**
Contraseña: **1234**



## Notas Adicionales

1. Asegúrate de que el servidor JSON esté corriendo antes de intentar acceder a las APIs en el puerto 3001.

2. Puedes acceder a la aplicación a través de tu navegador en http://localhost:4200.
