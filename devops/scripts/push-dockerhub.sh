#!/usr/bin/env bash
# Builds both images and publishes them to DockerHub,
# tagged with the given version and also as 'latest'.
# Usage: ./push-dockerhub.sh <version>   (e.g. ./push-dockerhub.sh v1.0.3)
set -euo pipefail

# Resolve project paths relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Image naming
DOCKERHUB_USER="wetagustin"
FRONTEND_IMAGE="$DOCKERHUB_USER/secretly_frontend"
API_IMAGE="$DOCKERHUB_USER/secretly_api"

# A version argument is required to avoid accidental pushes
if [ $# -lt 1 ]; then
    echo "Usage: $0 <version>   (e.g. $0 v1.0.3)" >&2
    exit 1
fi
VERSION="$1"

# Authenticate against DockerHub
echo "Logging in to DockerHub..."
docker login

# Build both images with the requested version tag
"$SCRIPT_DIR/build-images.sh" "$VERSION"

# Also tag the images as 'latest'
docker tag "$FRONTEND_IMAGE:$VERSION" "$FRONTEND_IMAGE:latest"
docker tag "$API_IMAGE:$VERSION" "$API_IMAGE:latest"

# Push every tag to DockerHub
echo "Pushing images..."
docker push "$FRONTEND_IMAGE:$VERSION"
docker push "$FRONTEND_IMAGE:latest"
docker push "$API_IMAGE:$VERSION"
docker push "$API_IMAGE:latest"

echo "Done. Published $VERSION and latest for both images."
