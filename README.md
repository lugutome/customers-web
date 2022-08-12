# CustomersWeb

Requisitos
----------
- Node 14
- Angular 10

Desarrollo
----------
* Descargar los fuentes del repositorio:
* En la consola ejecutar:
  - npm install -g @angular-devkit/core
  - npm install --save

* Importar el proyecto en Visual Studio Code
* Ejecutar con: ng serve

Instalación
-----------
* Descomprimir el archivo "nginx.rar" (servidor), en la ruta D:/CUSTOMERS
* Generar:
  ng build --prod 
  
* Copiar los archivos de la carpeta "dist" a la ruta "D:/CUSTOMERS/nginx/html" (reemplazar todos los archivos)
* Abrir una consola CMD, colocarse en la ruta  y luego levantar el servidor:
  D:/CUSTOMERS/nginx > nginx

* Ir al navegador y colocar: 
  http://localhost:4200

