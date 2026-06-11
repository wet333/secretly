#!/usr/bin/env bash
# Stops the development database.
# Pass --volumes to also delete the persisted database data.
set -euo pipefail

# Resolve project paths relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
COMPOSE_FILE="$ROOT_DIR/devops/docker-compose.dev.yml"

# Forward --volumes to docker compose when requested
EXTRA_ARGS=()
if [ "${1:-}" = "--volumes" ]; then
    EXTRA_ARGS+=("--volumes")
fi

# Stop and remove the dev containers (and volumes if asked)
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down "${EXTRA_ARGS[@]}"
