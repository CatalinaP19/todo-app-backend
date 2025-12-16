# API — Documentación

Base URL (local): `http://localhost:5000/api`

Autenticación
- JWT
- Enviar header: `Authorization: Bearer <token>`

---

## Auth

### POST /api/auth/register
- Descripción: Registrar nuevo usuario
- Body (JSON):
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- Respuesta 201:
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```
- Errores: 400 (campos faltantes / email ya registrado), 500

### POST /api/auth/login
- Descripción: Iniciar sesión
- Body (JSON): `email`, `password`
- Respuesta 200:
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```
- Errores: 400 (campos faltantes), 401 (credenciales inválidas)

### GET /api/auth/me
- Descripción: Obtener datos del usuario autenticado
- Headers: `Authorization: Bearer <token>`
- Respuesta 200:
```json
{
  "success": true,
  "user": { "id": "...", "name": "...", "email": "..." }
}
```
- Errores: 401 (no autorizado), 404 (usuario no encontrado)

---

## Todos (protegido)

Todas las rutas en `/api/todos` requieren el header `Authorization`.

### GET /api/todos
- Descripción: Obtener todas las tareas del usuario
- Respuesta 200: Array de objetos `Todo`

### POST /api/todos
- Descripción: Crear nueva tarea
- Body (JSON): `{ "text": "tarea" }`
- Respuesta 201: Objeto `Todo` creado
- Errores: 400 (texto requerido)

Ejemplo curl:
```
curl -X POST http://localhost:5000/api/todos \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Comprar leche"}'
```

### PUT /api/todos/:id
- Descripción: Actualizar tarea (texto y/o completed)
- Body (JSON): `{ "text": "nuevo", "completed": true }` (ambos opcionales)
- Respuesta 200: Objeto `Todo` actualizado
- Errores: 400 (ID inválido), 404 (no encontrada)

### DELETE /api/todos/:id
- Descripción: Eliminar tarea
- Respuesta 200:
```json
{ "message": "Tarea eliminada correctamente", "todo": { ... } }
```
- Errores: 400 (ID inválido), 404 (no encontrada)

---

Códigos de estado comunes
- 200 OK — petición correcta
- 201 Created — recurso creado
- 400 Bad Request — entrada inválida
- 401 Unauthorized — credenciales faltantes o inválidas
- 404 Not Found — recurso no encontrado
- 500 Internal Server Error — error en servidor

---

Notas
- Asegúrate de enviar `Content-Type: application/json` en requests con body.
- Para pruebas rápidas, usar `Postman` o `curl` y crear un usuario, hacer login y usar el token.
