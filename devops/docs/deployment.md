# Deployment Guide

How to publish the Docker images and deploy Secretly, both for generic users and on the Traefik-based VPS.

## 1. Publishing images to DockerHub

Images are published under `wetagustin/secretly_frontend` and `wetagustin/secretly_api`.

```bash
./devops/scripts/push-dockerhub.sh v1.0.3
```

What the script does:

1. Logs in to DockerHub (`docker login`).
2. Builds both images from source via [build-images.sh](../scripts/build-images.sh). Both Dockerfiles are multi-stage and self-contained: no local Maven or npm build is needed beforehand.
3. Tags each image with the given version **and** `latest`.
4. Pushes all tags.

To only build locally without pushing:

```bash
./devops/scripts/build-images.sh v1.0.3   # or no argument for 'latest'
```

## 2. Generic deployment (any Docker host)

For anyone who wants to run Secretly from the published images, [docker-compose.yml](../docker-compose.yml) is the starting point.

1. Copy the file to your server.
2. Set the environment variables (inline, in a `.env` next to it, or through your platform's UI):

```env
VERSION=latest
API_SECRET=a-long-random-secret
DB_HOST=your-db-host          # or 'db' if you enable the bundled database
DB_NAME=secretly
DB_USER=secretly
DB_PASS=your-db-password
CORS_HOST=YOUR_HOST_IP        # host the browser uses to open the frontend
FRONTEND_PORT=9000
API_PORT=9001
```

3. Edit `API_URL` in the file: it must be the API address **as seen from the user's browser** (host IP or domain plus `API_PORT`), never the Docker service name.
4. If you don't have a PostgreSQL instance, uncomment the `db` service and the `volumes` section.
5. Start it:

```bash
docker compose up -d
```

| Service | Default port |
|---------|--------------|
| Frontend | 9000 |
| API | 9001 |

## 3. VPS deployment (Traefik + HTTPS)

The VPS runs the shared Traefik proxy from [wet333/Infrastructure](https://github.com/wet333/Infrastructure) (`VPS/traefik-proxy`). Traefik terminates TLS with Let's Encrypt and routes by hostname through the external `traefik-net` network. See [architecture.md](architecture.md#vps-production-topology-traefik) for the topology.

### Prerequisites (once per VPS)

- Traefik running: `docker compose up -d` in `traefik-proxy/`.
- External network created: `docker network create traefik-net`.

### Steps

1. **DNS**: create two A records pointing to the VPS IP:
   - `FRONTEND_HOST` (e.g. `secretly.example.com`)
   - `API_HOST` (e.g. `api.secretly.example.com`)

2. **Project folder on the VPS**:

```bash
mkdir -p ~/apps/secretly && cd ~/apps/secretly
```

3. **Copy the deploy files** from this repo:
   - [docker-compose.traefik.yml](../docker-compose.traefik.yml)
   - [example.deploy.env](../example.deploy.env) → rename it to `.env` and fill in real values (hosts, `API_SECRET`, database credentials).

4. **Database**: by default the compose expects an external PostgreSQL (`DB_HOST` in `.env`). For a self-contained deployment, uncomment the `db` service and the `postgres_data` volume in the compose file and set `DB_HOST=db`.

5. **Start the services**:

```bash
docker compose -f docker-compose.traefik.yml up -d
```

Traefik picks up the new containers automatically (no Traefik restart needed) and issues the TLS certificates on first request.

6. **Verify**: open `https://FRONTEND_HOST`. The header status indicator should show the API online (it calls `https://API_HOST/api/health`).

### Updating to a new version

```bash
# on the VPS, in the project folder
sed -i 's/^VERSION=.*/VERSION=v1.0.4/' .env    # or edit .env manually
docker compose -f docker-compose.traefik.yml pull
docker compose -f docker-compose.traefik.yml up -d
```

### Troubleshooting

| Symptom | What to check |
|---------|----------------|
| 502 Bad Gateway | Containers attached to `traefik-net`? `loadbalancer.server.port` labels match the internal ports (80 frontend, 8080 API)? |
| No TLS certificate | DNS A records point to the VPS? Ports 80/443 open? Check `docker logs traefik`. |
| 404 / wrong site | `Host(...)` labels match the URLs exactly? Router names unique on the VPS? |
| Frontend loads but API offline | `API_URL` correct in the frontend container (`docker exec secretly-frontend cat /usr/share/nginx/html/config.js`)? CORS: `CORS_HOST` must equal `FRONTEND_HOST`. |
| API cannot reach the DB | External DB reachable from the container? If using the bundled DB: `DB_HOST=db` and the service uncommented? |
