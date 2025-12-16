# TODO App — Backend

Descripción
- Backend simple para una aplicación de lista de tareas (TODO) usando Node.js, Express y MongoDB.

Stack tecnológico
- Node.js
- Express
- MongoDB (Mongoose)
- JWT para autenticación
- bcryptjs para hash de contraseñas

Requisitos previos
- Node.js >= 16
- npm
- MongoDB (puede usarse un servicio como Railway)

Variables de entorno
- Copia `.env.example` a `.env` y completa los valores.

Cómo ejecutar el backend en local
1. Instalar dependencias:

```
npm install
```

2. Crear `.env` a partir de `.env.example` y configurar `MONGO_URI` y `JWT_SECRET`.

3. Ejecutar en modo desarrollo:

```
npm run dev
```

4. Ejecutar en producción:

```
npm start
```

Cómo ejecutar el frontend en local
- Este repositorio contiene solo el backend. Para el frontend, clonar el repo del frontend (si aplica) y seguir sus instrucciones. En producción el frontend debería desplegarse en Vercel.

Ejemplo de `.env` (ver `.env.example`)

Links de despliegue (rellenar):
- Frontend (Vercel): https://<tu-frontend>.vercel.app
- Backend (Render): https://<tu-backend>.onrender.com
- Base de datos (Railway): https://railway.app/project/<tu-proyecto>

CI / Pipeline (breve)
- Al hacer push a `main` se ejecutan: lint y tests (si existen), build y deploy automático a Render/Vercel según configuración del repo.

Archivos de interés
- `src/server.js` - punto de entrada
- `src/routes/auth.js` - rutas de autenticación
- `src/routes/todos.js` - rutas de tareas
- `src/models/User.js` y `src/models/Todo.js` - modelos de datos

Contacto
- Mantén este README actualizado con links reales y pasos adicionales.

Licencia
- Copyright (c) 2025 Catalina Perez Losada
- Este proyecto está licenciado bajo la licencia MIT — ver archivo `LICENSE`.
