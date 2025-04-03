#!/bin/sh

echo "Replacing \$API_URL in /usr/share/nginx/html/config.js.template..."
envsubst '${API_URL}' \
  < /usr/share/nginx/html/config.js.template \
  > /usr/share/nginx/html/config.js

echo "Starting Nginx..."
exec "$@"
