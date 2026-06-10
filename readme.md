# Secretly

Un gestor de secretos local para guardar API keys, tokens y variables de entorno de forma organizada y cifrada. Pensado para quien trabaja con varios proyectos y necesita un lugar central donde consultar, copiar y actualizar credenciales sin perder el rastro de los cambios.

---

## Qué hace

Secretly organiza tus secretos por **proyectos**. Cada proyecto funciona como una bóveda independiente: ahí guardás pares clave-valor (por ejemplo `STRIPE_API_KEY` o `DATABASE_URL`) y los consultás cuando los necesitás.

La interfaz está pensada para el uso diario:

- **Barra lateral** con todos tus proyectos, búsqueda rápida y acceso directo para crear uno nuevo.
- **Panel principal** que muestra el proyecto activo, cuántos secretos tiene y una tabla con todas las claves.
- **Valores enmascarados** por defecto. Podés revelarlos, copiarlos al portapapeles, editarlos en línea o eliminarlos con confirmación.
- **Indicador de estado** en el encabezado que muestra si la API está online u offline.
- **Registro de actividad** en el pie de página con las últimas acciones realizadas en la bóveda.
- **Ajustes** para exportar un backup en JSON de todos tus proyectos y secretos.

Todo se almacena cifrado en una base de datos PostgreSQL. La API está protegida con autenticación HTTP Basic.

---

## Captura

<img alt="Secretly UI Screenshot" src=".\secretly_screnshot.png" title="Secretly UI Screenshot"/>

---

## Cómo usarlo

### 1. Crear un proyecto

En la barra lateral, hacé clic en **Add Project**. Elegí un nombre y confirmá. El proyecto aparece en la lista y queda seleccionado automáticamente.

### 2. Agregar secretos

Con un proyecto activo, usá **Add Secret** en el banner superior. Ingresá el nombre de la clave y su valor, luego guardá. El secreto aparece en la tabla del panel principal.

### 3. Gestionar secretos

Cada fila de la tabla tiene acciones rápidas:

| Acción | Qué hace |
|--------|----------|
| Ojo | Muestra u oculta el valor |
| Copiar | Copia el valor al portapapeles |
| Editar | Habilita edición en línea del valor |
| Eliminar | Borra el secreto (pide confirmación) |

También podés filtrar secretos por nombre de clave usando el campo de búsqueda del panel.

### 4. Cambiar de proyecto

Hacé clic en cualquier proyecto de la barra lateral. El panel principal se actualiza con sus secretos y el contador correspondiente.

### 5. Revisar actividad

El registro en el pie de página muestra las últimas acciones: creaciones, ediciones y eliminaciones. Sirve para saber qué cambió y cuándo.

### 6. Exportar un backup

Abrí **Settings** (ícono de engranaje en el encabezado) y usá **Export Secrets** para descargar un JSON con todos tus proyectos. Guardalo en un lugar seguro.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Backend | Spring Boot 3.4, Java 17 |
| Base de datos | PostgreSQL 16 |
| Contenedores | Docker / Docker Compose |

---

## Para desarrolladores

### Requisitos

- **Docker** y **Docker Compose** (para backend y base de datos)
- **Node.js** 18+ y **npm** (para el frontend en modo desarrollo)
- **Java 17** y **Maven 3.8+** (solo si querés compilar el backend localmente)

### Variables de entorno

Creá un archivo `.env` en la raíz del proyecto. Podés partir de este ejemplo:

```env
API_SECRET=dev-secret-key-change-in-production
DB_HOST=db
DB_PORT=5432
DB_NAME=secretly
DB_USER=secretly
DB_PASS=secretly_dev_password
DB_DLL_MODE=update
LOGGING_LEVEL=DEBUG
CORS_HOST=localhost
```

| Variable | Descripción |
|----------|-------------|
| `API_SECRET` | Clave privada para cifrar y descifrar secretos. **Cambiala en producción.** |
| `DB_HOST` | Host de PostgreSQL. Usá `db` con Docker Compose, o `localhost` si la DB corre fuera del contenedor. |
| `DB_PORT` | Puerto de PostgreSQL (por defecto `5432`). |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_USER` / `DB_PASS` | Credenciales de PostgreSQL. |
| `DB_DLL_MODE` | Modo de esquema Hibernate. Usá `update` en desarrollo; `create-drop` solo si querés recrear la DB desde cero. |
| `LOGGING_LEVEL` | Nivel de logs de Spring Security (`DEBUG`, `INFO`, `TRACE`, etc.). |
| `CORS_HOST` | Host del frontend permitido por CORS. En desarrollo local, `localhost`. |

### Arrancar el entorno de desarrollo

El flujo típico levanta el backend y la base de datos en Docker, y corre el frontend con Vite para tener hot-reload.

#### Opción A — Script automatizado (Windows / PowerShell)

```powershell
.\script_build_dev.ps1
```

Esto compila el backend con Maven, levanta los contenedores con `docker compose` y deja la API lista en el puerto **8080**.

Después, en otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

#### Opción B — Pasos manuales (Linux / macOS / WSL)

```bash
# 1. Compilar el backend
cd secretly_api
mvn clean package
cd ..

# 2. Levantar backend + base de datos
docker compose up --build -d

# 3. Instalar dependencias y arrancar el frontend
cd frontend
npm install
npm run dev
```

### URLs y credenciales por defecto

| Servicio | URL |
|----------|-----|
| Frontend (Vite) | http://localhost:5173 |
| API | http://localhost:8080/api/ |
| PostgreSQL | localhost:5432 |

Credenciales de la API (desarrollo):

- Usuario: `admin`
- Contraseña: `adminpass`

El frontend las envía automáticamente en cada request. Si cambiás las credenciales en el backend, actualizá también `frontend/src/lib/constants.ts`.

### Comandos útiles

```bash
# Frontend
cd frontend
npm run dev          # Servidor de desarrollo con hot-reload
npm run build        # Build de producción
npm run lint         # ESLint
npm run format       # Prettier (formatea todo el repo)

# Backend + DB
docker compose up --build -d    # Levantar servicios
docker compose down             # Detener y remover contenedores
docker compose logs -f backend  # Ver logs del backend en tiempo real

# Build completo de producción (frontend + backend en Docker)
.\script_build_prod.ps1         # PowerShell — usa docker-compose-prod.yml
```

### Estructura del proyecto

```
secretly/
├── frontend/          # UI en React + Vite
├── secretly_api/      # API REST en Spring Boot
├── docker-compose.yml         # Dev: backend + PostgreSQL
├── docker-compose-prod.yml    # Prod: frontend + backend
├── docker-compose-user.yml    # Despliegue con imágenes de DockerHub
└── .env                       # Variables de entorno (no commitear)
```

### Notas para desarrollo

- El frontend en modo dev apunta a `http://localhost:8080/api/` por defecto (ver `frontend/src/lib/constants.ts`).
- `CORS_HOST` debe coincidir con el host desde donde accedés al frontend. Si Vite corre en `localhost:5173`, usá `localhost`.
- El endpoint `/api/health` es público y lo usa el indicador de estado de la API en el encabezado.
- Para probar el build de producción del frontend sin publicar imágenes, usá `script_build_prod.ps1` y accedé a http://localhost:3000.

---

## Para usuarios (despliegue)

Si solo querés usar Secretly sin tocar código, usá `docker-compose-user.yml`. Está preparado para plataformas como Coolify: reemplazá las variables de conexión a la base de datos y los hosts según tu entorno.

```yaml
# Ejemplo de variables a configurar:
API_URL=http://TU_IP:PUERTO_BACKEND/api/
DB_HOST=...
DB_NAME=...
DB_USER=...
DB_PASS=...
CORS_HOST=...
```

Las imágenes publicadas están en DockerHub bajo `wetagustin/secretly_frontend` y `wetagustin/secretly_api`.
