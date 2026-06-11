# Development Guide

How to run Secretly locally with hot reload on both the API and the frontend.

## Requirements

- Docker and Docker Compose (for the dev database)
- Java 17 (the API runs on the host; Maven is provided by `mvnw`)
- Node.js 18+ and npm (frontend)

## 1. Environment file

Copy the example file to the project root and adjust it if needed:

```bash
cp devops/example.env .env
```

The defaults work out of the box for development. See [architecture.md](architecture.md#environment-variables) for what each variable does.

## 2. Start the API with hot reload

```bash
./devops/scripts/dev.sh
```

What the script does:

1. Loads the root `.env`.
2. Starts PostgreSQL in Docker ([docker-compose.dev.yml](../docker-compose.dev.yml)) and waits for the healthcheck.
3. Overrides `DB_HOST=localhost` (the API runs on the host, not inside Docker).
4. Runs the API with `./mvnw spring-boot:run`.

### How hot reload works

The API includes `spring-boot-devtools`. When running through `spring-boot:run`, devtools watches the classpath and restarts the application (~1-2s) whenever compiled classes change. To trigger it:

- **IntelliJ IDEA**: build the project (`Ctrl+F9`), or enable *Settings → Build, Execution, Deployment → Compiler → Build project automatically* to recompile on save.
- **VS Code**: the Java extension compiles on save automatically.
- **Terminal**: run `./mvnw compile` in `secretly_api/` from another shell.

No need to rebuild Docker images or restart compose during development.

## 3. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite serves the UI with HMR. In dev mode the frontend points to `http://localhost:8080/api/` (see `frontend/src/lib/constants.ts`).

## URLs and default credentials

| Service | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:5173 |
| API | http://localhost:8080/api/ |
| PostgreSQL | localhost:5432 |

API credentials (development): `admin` / `adminpass`. The frontend sends them automatically; if you change them in the backend, update `frontend/src/lib/constants.ts` too.

## Stopping the environment

- API: `Ctrl+C` in the terminal running `dev.sh`.
- Database: `./devops/scripts/dev-down.sh` (add `--volumes` to also wipe the data).

## Testing the production build locally

To validate the Docker images and the full stack before publishing:

```bash
./devops/scripts/prod-local.sh        # build from source and start everything
./devops/scripts/prod-local.sh down   # stop the stack
```

Then open http://localhost:3000. This uses [docker-compose.build.yml](../docker-compose.build.yml) and builds both images from source.

## Useful commands

```bash
# Frontend
cd frontend
npm run dev          # dev server with HMR
npm run build        # production build
npm run lint         # ESLint
npm run format       # Prettier

# Dev database
docker compose --env-file .env -f devops/docker-compose.dev.yml logs -f db
docker compose --env-file .env -f devops/docker-compose.dev.yml down

# API (from secretly_api/, with the .env vars exported and DB_HOST=localhost)
./mvnw test          # run tests
./mvnw clean package # build the JAR locally
```
