## 📋 Requisitos

- Requiere **Node.js** >= 22 (LTS) puede obtenerse fácilmente desde la página oficial https://nodejs.org/en
- Requiere el gestor de paquetes **NPM** que también puede ser obtenido desde la página oficial de Node.
- Requiere Base de Datos **MariaDB** >= 10.2 o **MySQL** >= 5.7
- El uso de Apache **XAMPP** es opcional.

---

## 🛠️ Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/mariofhdez/proyecto-sena.git
   cd proyecto-sena
   ```

2. Instala las dependencias globales:
   ```
   npm install
   ```
3. Instala las dependencias globales:
   ```
   npm run install:all
   ```   

4. Configura las variables de entorno del backend:

   Crea un archivo .env en `./backend/.env`
   ```
   // En Windows
   echo > .env
   // En Linux o Mac
   touch .env
   ```

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
   echo > .env
   // En Linux o Mac
   touch .env
   ```

   Luego,se deben agregar las variables necesarias para configurar el servidor:
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
