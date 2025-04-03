# ------------------------------------------------
# Stage 1: Build the Vite + React app with Node
# ------------------------------------------------
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build for production -> output goes to /app/dist because of Vite
RUN npm run build

# ------------------------------------------------
# Stage 2: Serve with NGINX
# ------------------------------------------------
FROM nginx:1.23-alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy build folder to NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Expose NGINX default port
EXPOSE 80

# Launch NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]