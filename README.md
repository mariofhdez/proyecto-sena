## 🔗 URL de prueba

📺 [Demostración guiada](https://youtu.be/MQrkmRqF4H0)
- https://proyecto-sena-lyart.vercel.app/
- Base de datos desplegada en Clever
- Backend desplegado en Render
- Frontend desplegado en Vercel

## 📋 Requisitos

- Requiere **Node.js** >= 22 (LTS) puede obtenerse fácilmente desde la página oficial https://nodejs.org/en
- Requiere el gestor de paquetes **NPM** que también puede ser obtenido desde la página oficial de Node.
- Requiere Base de Datos **MariaDB** >= 10.2 o **MySQL** >= 5.7
- El uso de Apache **XAMPP** es opcional.

---

## 🛠️ Instalación

📺 [Guía de instalación local](https://www.loom.com/share/03801763ee38433cad8f3eb052a6af5f?sid=0b4d3c9a-dc27-470a-939b-0fc6754118cc)
1. Clona el repositorio:
   ```
   git clone https://github.com/mariofhdez/proyecto-sena.git
   cd proyecto-sena
   ```

2. Instala las dependencias globales desde consola ajecutando el comando:
   ```
   npm install
   ```
3. Instala las dependencias del back y del front desde consola ajecutando el comando:
   ```
   npm run install:all
   ```   

4. Configura las variables de entorno del backend:

   Crea un archivo .env en `./backend/.env`
   ```
   // En Windows
   Copy-Item .env.example .env
   // En Linux o Mac
   copy .env.example .env
   ```
   O puedes crearlo de forma manual.

   Luego, basado en .env-example se deben agregar las variables necesarias para configurar el servidor:
   ```
   // Configuración del servidor
   PORT=3000                # Puerto en el que se ejecutará la aplicación
   NODE_ENV=development     # Entorno de ejecución (development, production, test)   
   ```

   También las credenciales de conexión a la Base de Datos:
   ```
   // Configuración de la base de datos MySQL
   DATABASE_URL="mysql://usuario_db:contraseña@localhost:3306/nombre_db"  # Se compone de los elementos previos
   ```

   Por último, solo es necesario configurar una clave secreta para la firma del JWT:
   ```
   // Configuración de seguridad
   JWT_SECRET='tu_clave_secreta_jwt' # Clave secreta para firmar los tokens JWT ej. '$3n@'
   ```
5. Configura las variables de entorno del frontend:

   Crea un archivo .env en `./frontend/.env`
   ```
   // En Windows
   Copy-Item .env.example .env
   // En Linux o Mac
   copy .env.example .env
   ```
   O puedes crearlo de forma manual.

   Luego, se deben agregar las variables necesarias para apuntar al servidor:
   ```
   // Configuración del servidor backend
   VITE_BACKEND_BASE_URL=http://localhost:3000/api 
   ```
6. Ejecuta los scripts de configuración:
   Desde la línea de comandos ejecuta la siguiente instrucción para crear la base de datos.
   ```
   npm run db:setup
   ```

7. Inicia el servidor en desarrollo:
   ```  
   npm run dev
   ```
---

## 🐳 Despliegue con Docker

⚠️ **Requerido** Docker y Docker Compose

📺 [Guía de despliegue con Docker y Docker-compose](https://www.loom.com/share/bd055aa821f740ba8ac7517de0e1f37f?sid=c293b245-0d19-4c57-a920-cd95bd764e88)
1. Clona el repositorio:
   ```
   git clone https://github.com/mariofhdez/proyecto-sena.git
   cd proyecto-sena
   ```

2. Crea las variables de entorno como en la sección aterior. (Puntos 4 y 5)
3. Levanta los servicios
   ```
   docker-compose up
   ```
