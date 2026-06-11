#!/usr/bin/env bash
# Builds and runs the full production stack locally
# (frontend + API + PostgreSQL) to validate the images before publishing.
# Usage: ./prod-local.sh [down]
set -euo pipefail

# Resolve project paths relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
COMPOSE_FILE="$ROOT_DIR/devops/docker-compose.build.yml"

# Fail early if the .env file is missing
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: $ENV_FILE not found. Copy devops/example.env to .env and adjust it." >&2
    exit 1
fi

# 'down' stops and removes the stack
if [ "${1:-}" = "down" ]; then
    docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down
    exit 0
fi

# Build the images from source and start the full stack
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up --build -d

echo "Production stack running:"
echo "  Frontend: http://localhost:3000"
echo "  API:      http://localhost:8080/api/"
