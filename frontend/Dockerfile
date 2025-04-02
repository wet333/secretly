# ------------------------------------------------
# Stage 1: Build the React app with Node
# ------------------------------------------------
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build for production -> output goes to /app/build
RUN npm run build

# ------------------------------------------------
# Stage 2: Serve with NGINX
# ------------------------------------------------
FROM nginx:1.23-alpine
# Copy build folder to NGINX html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose NGINX default port
EXPOSE 80

# Launch NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]