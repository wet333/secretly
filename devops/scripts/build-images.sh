#!/usr/bin/env bash
# Builds the frontend and API Docker images from source.
# Usage: ./build-images.sh [version]   (default: latest)
set -euo pipefail

# Resolve project paths relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Image naming
DOCKERHUB_USER="wetagustin"
FRONTEND_IMAGE="$DOCKERHUB_USER/secretly_frontend"
API_IMAGE="$DOCKERHUB_USER/secretly_api"
VERSION="${1:-latest}"

# Build the frontend image (multi-stage: Vite build + NGINX)
echo "Building $FRONTEND_IMAGE:$VERSION ..."
docker build -t "$FRONTEND_IMAGE:$VERSION" "$ROOT_DIR/frontend"

# Build the API image (multi-stage: Maven build + JRE)
echo "Building $API_IMAGE:$VERSION ..."
docker build -t "$API_IMAGE:$VERSION" "$ROOT_DIR/secretly_api"

echo "Done. Built images:"
echo "  $FRONTEND_IMAGE:$VERSION"
echo "  $API_IMAGE:$VERSION"
