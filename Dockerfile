# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./
# Instalamos dependencias
RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Eliminamos la página por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos compilados de Vue (usualmente van a la carpeta 'dist')
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el estándar web)
EXPOSE 80

# Comando por defecto para arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]