# MANUAL TÉCNICO - SISTEMA DE NÓMINA PAYMA

## ÍNDICE

1. [INTRODUCCIÓN Y CONTEXTO](#1-introducción-y-contexto)
2. [ARQUITECTURA DEL SISTEMA](#2-arquitectura-del-sistema)
3. [INSTALACIÓN Y CONFIGURACIÓN](#3-instalación-y-configuración)
4. [ESTRUCTURA DE LA BASE DE DATOS](#4-estructura-de-la-base-de-datos)
5. [API Y ENDPOINTS](#5-api-y-endpoints)
6. [FRONTEND Y COMPONENTES](#6-frontend-y-componentes)
7. [SEGURIDAD Y AUTENTICACIÓN](#7-seguridad-y-autenticación)
8. [TESTING Y CALIDAD](#8-testing-y-calidad)
9. [DESPLIEGUE Y OPERACIONES](#9-despliegue-y-operaciones)
10. [MANTENIMIENTO Y SOPORTE](#10-mantenimiento-y-soporte)

---

## 1. INTRODUCCIÓN Y CONTEXTO

### 1.1 Propósito del Sistema

El Sistema de Nómina PAYMA es una aplicación web completa diseñada para gestionar la liquidación de nómina de empleados. El sistema permite administrar empleados, conceptos de nómina, novedades, períodos de liquidación y generar liquidaciones automáticas.

### 1.2 Alcance Funcional

**Funcionalidades Implementadas:**
- Gestión completa de empleados (CRUD)
- Administración de conceptos de nómina
- Registro y gestión de novedades
- Creación y gestión de períodos de liquidación
- Generación automática de liquidaciones
- Sistema de autenticación y autorización
- Interfaz web responsiva

### 1.3 Tecnologías Utilizadas

**Backend:**
- Node.js 22 (LTS)
- Express.js 5.1.0
- Prisma ORM 6.6.0
- MySQL/MariaDB
- JWT para autenticación
- Jest para testing

**Frontend:**
- React 19.1.0
- React Router DOM 7.6.2
- Bootstrap 5.3.7
- Axios para HTTP
- Vite como bundler

**Herramientas de Desarrollo:**
- ESLint para linting
- JSDoc para documentación
- Swagger/OpenAPI para documentación de API
- Docker para containerización

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Arquitectura General

El sistema sigue una arquitectura cliente-servidor con separación clara entre frontend y backend:

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │    Backend      │
│   (React)       │                 │   (Node.js)     │
└─────────────────┘                 └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   Base de       │
                                    │   Datos MySQL   │
                                    └─────────────────┘
```

### 2.2 Arquitectura de Backend

**Patrón MVC Implementado:**

```
src/
├── controllers/     # Controladores (lógica de presentación)
├── services/        # Servicios (lógica de negocio)
├── routes/          # Rutas (definición de endpoints)
├── middlewares/     # Middlewares (autenticación, logging, errores)
├── utils/           # Utilidades y helpers
├── config/          # Configuración de base de datos
└── prisma/          # Esquema y migraciones de BD
```

**Flujo de Peticiones:**
1. Cliente envía petición HTTP
2. Middleware de logging registra la petición
3. Middleware de autenticación valida el token JWT
4. Router dirige la petición al controlador correspondiente
5. Controlador llama al servicio apropiado
6. Servicio interactúa con la base de datos
7. Respuesta se envía al cliente

### 2.3 Arquitectura de Frontend

**Estructura de Componentes:**
```
src/
├── components/      # Componentes React organizados por módulo
│   ├── auth/        # Componentes de autenticación
│   ├── employees/   # Gestión de empleados
│   ├── novelties/   # Gestión de novedades
│   ├── settlements/ # Gestión de períodos
│   ├── concepts/    # Gestión de conceptos
│   └── users/       # Gestión de usuarios
├── layout/          # Componente de layout principal
├── routes/          # Configuración de rutas protegidas
└── utils/           # Utilidades y configuración de API
```

**Gestión de Estado:**
- Estado local con React hooks
- Almacenamiento de token en localStorage
- Interceptores de Axios para manejo de errores

---

## 3. INSTALACIÓN Y CONFIGURACIÓN

### 3.1 Requisitos del Sistema

**Software Requerido:**
- Node.js >= 22 (LTS)
- NPM (incluido con Node.js)
- MySQL >= 5.7 o MariaDB >= 10.2
- Git para clonar el repositorio

**Requisitos de Hardware:**
- Mínimo 4GB RAM
- 2GB espacio en disco
- Conexión a internet para descargar dependencias

### 3.2 Proceso de Instalación

**1. Clonar el Repositorio:**
```bash
git clone https://github.com/mariofhdez/proyecto-sena.git
cd proyecto-sena
```

**2. Instalar Dependencias:**
```bash
npm run install:all
```

**3. Configurar Variables de Entorno:**
Crear archivo `.env` en el directorio backend:
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de base de datos
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nomina_db"

# Configuración de seguridad
JWT_SECRET="tu_clave_secreta_jwt"
```

**4. Configurar Base de Datos:**
```bash
npm run db:setup
```

**5. Iniciar el Sistema:**
```bash
npm run dev
```

### 3.3 Configuración de Desarrollo

**Scripts Disponibles:**
- `npm run dev`: Inicia frontend y backend en modo desarrollo
- `npm run db:setup`: Configura la base de datos inicial
- `npm run db:reset`: Resetea la base de datos
- `npm test`: Ejecuta tests del backend
- `npm run test:coverage`: Genera reporte de cobertura

**Puertos por Defecto:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Documentación API: http://localhost:3000/api-docs

---

## 4. ESTRUCTURA DE LA BASE DE DATOS

### 4.1 Modelo de Datos

El sistema utiliza Prisma ORM con MySQL como base de datos. La estructura incluye 7 entidades principales:

**Entidades Principales:**
1. **Users**: Gestión de usuarios y autenticación
2. **Employees**: Información de empleados
3. **Concepts**: Conceptos de nómina
4. **Periods**: Períodos de liquidación
5. **Novelties**: Novedades de empleados
6. **Settlements**: Liquidaciones generadas
7. **SettlementDetails**: Detalle de conceptos en liquidaciones

### 4.2 Relaciones entre Entidades

**Diagrama de Relaciones:**
- Un empleado puede tener múltiples liquidaciones
- Un empleado puede tener múltiples novedades
- Un concepto puede aplicarse en múltiples novedades y detalles
- Un período puede contener múltiples liquidaciones y novedades
- Una liquidación puede tener múltiples detalles

### 4.3 Índices y Optimización

**Índices Implementados:**
- Identificación de empleados (búsquedas rápidas)
- Códigos de conceptos (filtrado eficiente)
- Estados de períodos y liquidaciones
- Fechas para consultas por rangos
- Relaciones compuestas para consultas complejas

---

## 5. API Y ENDPOINTS

### 5.1 Documentación de API

La API está documentada usando Swagger/OpenAPI 3.0 y está disponible en:
`http://localhost:3000/api-docs`

### 5.2 Estructura de Endpoints

**Autenticación (`/api/auth`):**
- POST `/register`: Registro de usuarios
- POST `/login`: Autenticación de usuarios
- POST `/validate`: Validación de tokens
- GET `/me`: Información del usuario autenticado

**Empleados (`/api/employees`):**
- GET `/`: Listar todos los empleados
- GET `/active`: Listar empleados activos
- GET `/:id`: Obtener empleado por ID
- POST `/`: Crear nuevo empleado
- PATCH `/:id`: Actualizar empleado
- DELETE `/:id`: Eliminar empleado
- POST `/status/:id`: Cambiar estado de empleado

**Conceptos (`/api/concepts`):**
- GET `/`: Listar todos los conceptos
- GET `/:id`: Obtener concepto por ID
- GET `/code/:code`: Obtener concepto por código

**Novedades (`/api/novelties`):**
- GET `/`: Listar todas las novedades
- GET `/:id`: Obtener novedad por ID
- GET `/employee/:id`: Novedades por empleado
- GET `/period/:id`: Novedades por período
- POST `/`: Crear nueva novedad
- PATCH `/:id`: Actualizar novedad
- DELETE `/:id`: Eliminar novedad

**Períodos (`/api/periods`):**
- GET `/`: Listar todos los períodos
- GET `/:id`: Obtener período por ID
- POST `/`: Crear nuevo período
- POST `/:id/open`: Abrir período
- POST `/:id/settle`: Liquidar período
- POST `/:id/close`: Cerrar período
- DELETE `/:id`: Eliminar período

**Liquidaciones (`/api/settlements`):**
- GET `/`: Listar todas las liquidaciones
- GET `/:id`: Obtener liquidación por ID
- GET `/employeeId/:id`: Liquidaciones por empleado
- POST `/`: Crear nueva liquidación
- POST `/settle`: Liquidar liquidación
- POST `/close`: Cerrar liquidación
- DELETE `/:id`: Eliminar liquidación

### 5.3 Códigos de Respuesta HTTP

**Códigos Implementados:**
- 200: Operación exitosa
- 201: Recurso creado exitosamente
- 400: Error de validación
- 401: No autorizado
- 403: Acceso prohibido
- 404: Recurso no encontrado
- 500: Error interno del servidor

---

## 6. FRONTEND Y COMPONENTES

### 6.1 Estructura de Componentes

**Componentes por Módulo:**

**Autenticación:**
- `Login.jsx`: Formulario de inicio de sesión

**Empleados:**
- `ShowEmployees.jsx`: Lista de empleados
- `CreateEmployee.jsx`: Formulario de creación
- `EditEmployee.jsx`: Formulario de edición

**Novedades:**
- `ShowNovelties.jsx`: Lista de novedades
- `CreateNovelty.jsx`: Formulario de creación
- `EditNovelty.jsx`: Formulario de edición

**Períodos:**
- `ShowPeriods.jsx`: Lista de períodos
- `CreatePeriod.jsx`: Formulario de creación
- `DetailPeriod.jsx`: Detalle de período
- `OpenPeriod.jsx`: Apertura de período

**Configuración:**
- `ShowConcepts.jsx`: Lista de conceptos
- `ShowUsers.jsx`: Lista de usuarios
- `CreateUser.jsx`: Formulario de creación de usuario
- `EditUser.jsx`: Formulario de edición de usuario

### 6.2 Enrutamiento

**Configuración de Rutas:**
- Rutas públicas: `/login`
- Rutas protegidas: Todas las demás
- Redirección automática a login si no hay token
- Navegación basada en roles (ADMIN/USER)

**Protección de Rutas:**
- Middleware `ProtectedRoute` verifica autenticación
- Decodificación automática de token JWT
- Redirección automática en caso de token expirado

### 6.3 Gestión de Estado

**Estado Local:**
- Hooks de React para estado de componentes
- `useState` para datos de formularios
- `useEffect` para efectos secundarios
- `useNavigate` para navegación programática

**Persistencia:**
- Token JWT almacenado en localStorage
- Información de usuario decodificada del token
- Manejo automático de expiración de sesión

---

## 7. SEGURIDAD Y AUTENTICACIÓN

### 7.1 Sistema de Autenticación JWT

**Flujo de Autenticación:**
1. Usuario envía credenciales (email/password)
2. Servidor valida credenciales contra base de datos
3. Si son válidas, genera token JWT
4. Token se envía al cliente
5. Cliente almacena token en localStorage
6. Token se incluye en cabecera Authorization en peticiones posteriores

**Características del Token:**
- Algoritmo: HS256
- Duración: 1 hora
- Payload: ID, email, rol, estado activo
- Firma: Clave secreta configurable

### 7.2 Control de Acceso

**Roles Implementados:**
- **ADMIN**: Acceso completo al sistema
- **USER**: Acceso limitado a funcionalidades básicas

**Middleware de Autorización:**
- Verificación de token en cada petición protegida
- Validación de rol para endpoints específicos
- Control de usuarios activos/inactivos
- Bloqueo por intentos fallidos de login

### 7.3 Medidas de Seguridad

**Validación de Entrada:**
- Sanitización de datos en frontend y backend
- Validación de tipos de datos
- Prevención de inyección SQL (Prisma ORM)
- Validación de esquemas de datos

**Protección de Datos:**
- Contraseñas encriptadas con bcrypt
- Tokens JWT con tiempo de expiración
- Control de sesiones sin estado
- Headers de seguridad configurados

---

## 8. TESTING Y CALIDAD

### 8.1 Estrategia de Testing

**Framework Utilizado:**
- Jest como framework principal
- Supertest para testing de API
- Base de datos separada para tests
- Cobertura de código automática

**Tipos de Tests Implementados:**
- Tests unitarios de servicios
- Tests de integración de API
- Tests de autenticación
- Tests de validación de datos

### 8.2 Configuración de Testing

**Entorno de Testing:**
- Base de datos separada (`proyecto_test`)
- Variables de entorno específicas
- Limpieza automática de datos
- Timeout de 30 segundos por test

**Scripts de Testing:**
- `npm test`: Ejecuta todos los tests
- `npm run test:watch`: Modo watch para desarrollo
- `npm run test:coverage`: Genera reporte de cobertura
- `npm run test:db:setup`: Configura BD de testing

### 8.3 Cobertura de Código

**Métricas Implementadas:**
- Cobertura de líneas de código
- Cobertura de funciones
- Cobertura de ramas
- Reporte HTML generado automáticamente

**Áreas Cubiertas:**
- Controladores de API
- Servicios de negocio
- Middlewares de autenticación
- Utilidades y helpers

---

## 9. DESPLIEGUE Y OPERACIONES

### 9.1 Containerización

**Docker Implementado:**
- Dockerfile para containerización
- Docker Compose para orquestación
- Configuración multi-servicio
- Variables de entorno por contenedor

**Servicios Configurados:**
- Servicio de aplicación Node.js
- Servicio de base de datos MySQL
- Red interna para comunicación
- Volúmenes para persistencia de datos

### 9.2 Variables de Entorno

**Configuración por Ambiente:**
- Desarrollo: `.env` local
- Testing: Variables específicas de test
- Producción: Variables de entorno del servidor

**Variables Críticas:**
- `DATABASE_URL`: Conexión a base de datos
- `JWT_SECRET`: Clave para firmar tokens
- `PORT`: Puerto de la aplicación
- `NODE_ENV`: Entorno de ejecución

### 9.3 Monitoreo y Logging

**Sistema de Logging:**
- Middleware de logging automático
- Registro de peticiones HTTP
- Logs de errores estructurados
- Timestamps en formato ISO

**Métricas Básicas:**
- Tiempo de respuesta de peticiones
- Códigos de estado HTTP
- Rutas más utilizadas
- Errores más frecuentes

---

## 10. MANTENIMIENTO Y SOPORTE

### 10.1 Mantenimiento Preventivo

**Tareas Regulares:**
- Actualización de dependencias
- Backup de base de datos
- Limpieza de logs antiguos
- Verificación de integridad de datos

**Scripts de Mantenimiento:**
- `npm run db:reset`: Reset completo de BD
- `npm run seed:static`: Recarga datos estáticos
- `npm run seed:demo`: Carga datos de demostración

### 10.2 Troubleshooting

**Problemas Comunes:**

**Error de Conexión a Base de Datos:**
- Verificar que MySQL esté ejecutándose
- Confirmar credenciales en `.env`
- Verificar que la base de datos exista
- Ejecutar `npm run db:setup`

**Error de Autenticación:**
- Verificar que `JWT_SECRET` esté configurado
- Confirmar que el token no haya expirado
- Verificar formato de cabecera Authorization
- Revisar logs de autenticación

**Error en Tests:**
- Verificar configuración de BD de test
- Ejecutar `npm run test:db:setup`
- Confirmar variables de entorno de test
- Revisar logs de Jest

### 10.3 Actualizaciones

**Proceso de Actualización:**
1. Backup de base de datos
2. Actualización de código
3. Instalación de nuevas dependencias
4. Ejecución de migraciones
5. Verificación de funcionalidad
6. Tests de regresión

**Versionado:**
- Control de versiones con Git
- Tags para releases estables
- Changelog de cambios
- Documentación de breaking changes

---

## APÉNDICES

### A. Glosario de Términos

**Conceptos de Nómina:**
- **Devengado**: Concepto que suma al salario
- **Deducción**: Concepto que resta del salario
- **IBC**: Base de cotización para seguridad social
- **Novedad**: Ajuste o evento que afecta la nómina

**Estados del Sistema:**
- **DRAFT**: Borrador, permite modificaciones
- **OPEN**: Abierto, permite novedades
- **SETTLED**: Liquidado, cálculos completados
- **CLOSED**: Cerrado, no permite modificaciones

### B. Referencias Técnicas

**Documentación Externa:**
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

**Estándares Aplicados:**
- RESTful API Design
- JWT Authentication
- OpenAPI 3.0 Specification
- Semantic Versioning
- Git Flow Workflow

---

*Este manual técnico debe actualizarse cuando se realicen cambios significativos en el sistema.* 