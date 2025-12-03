# Dockerfile for CRA Frontend 
#this is the first dockerfile i use and it was working perfectly
# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install
# # RUN npx update-browserslist-db@latest

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npx", "serve", "-s", "build", "-l", "3000"]







#now i want to work with nginx





# Step 1: Build the frontend

# Stage 1: build
# Step 1: Build frontend
FROM node:18 AS build

WORKDIR /app
# Accept build args
# Accept frontend env as build args
# ARG VITE_API_BASE_URL
# ARG VITE_API_EVENTS

# # Create .env dynamically for Vite
# RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env
# RUN echo "VITE_API_EVENTS=$VITE_API_EVENTS" >> .env
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs /etc/nginx/certs  
 # <-- copy your self-signed certs

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]






