#!/usr/bin/env bash
# Starts the development environment:
# PostgreSQL in Docker + the API on the host with hot reload (Spring devtools).
set -euo pipefail

# Resolve project paths relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
COMPOSE_FILE="$ROOT_DIR/devops/docker-compose.dev.yml"

# Fail early if the .env file is missing
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: $ENV_FILE not found. Copy devops/example.env to .env and adjust it." >&2
    exit 1
fi

# Export every variable defined in .env to this shell
set -a
. "$ENV_FILE"
set +a

# Start the database container and wait until its healthcheck passes.
# --remove-orphans cleans up containers from older compose setups.
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --wait --remove-orphans

# The API runs on the host, so it reaches the DB through localhost
export DB_HOST=localhost

# Run the API with Maven. spring-boot-devtools restarts the app
# automatically whenever the IDE recompiles classes on save.
cd "$ROOT_DIR/secretly_api"
./mvnw spring-boot:run
