# Arquitectura (C4 Nivel 1)

Diagrama (sencillo)

Usuario -> Frontend (Netlify) -> Backend (Render) -> DB (MongoDB)

Representación (texto)

- Usuario: Interactúa con la interfaz web (frontend).
- Frontend (Netlify): SPA que consume la API REST del backend.
- Backend (Render): API REST (Express) con autenticación JWT.
- DB (MongoDB): Persistencia de usuarios y tareas.

Componentes y responsabilidades

- Frontend
  - Presenta pantallas: Login / Registro, Lista de tareas, Crear/Editar tarea.
  - Gestiona token JWT en `localStorage` y añade `Authorization: Bearer <token>` a las peticiones.

- Backend
  - Capas: Rutas → Controladores (lógica en rutas) → Modelos (Mongoose).
  - Rutas principales: `/api/auth/*`, `/api/todos/*`.
  - Middleware: `protect` valida JWT y añade `req.user`.

- Base de datos
  - Colección `users` (modelo `User`): `name`, `email`, `password(hash)`, `createdAt`.
  - Colección `todos` (modelo `Todo`): `text`, `completed`, `user` (ref a `users`), `createdAt`.

Modelo de datos (resumen)

- `User`:
  - `name`: String
  - `email`: String (único)
  - `password`: String (hash)
  - `createdAt`: Date

- `Todo`:
  - `text`: String
  - `completed`: Boolean
  - `user`: ObjectId -> `User`
  - `createdAt`: Date

Flujo típico: Crear una tarea

1. Usuario autenticado en frontend completa el formulario y hace POST a `/api/todos` con `Authorization: Bearer <token>` y body `{ text }`.
2. Backend (middleware `protect`) verifica JWT, obtiene `req.user`.
3. Controlador crea `Todo` con `user: req.user._id` y guarda en MongoDB.
4. Respuesta 201 con el recurso creado; frontend actualiza la UI.

Pipeline de CI (breve)

- On push a `main`:
  - Ejecutar linters
  - Ejecutar tests (si existen)
  - Build (si aplica)
  - Deploy a Render (backend) y Vercel (frontend) mediante integraciones o workflows.

Notas

- Para diagramas visuales en Draw.io: exportar como PNG/PDF y añadirlo al repo o incluir archivo `.drawio` junto al `ARCHITECTURA.m