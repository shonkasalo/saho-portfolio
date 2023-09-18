FROM node:20-alpine AS builder
WORKDIR /app
# Cache and install deps
COPY package*.json ./
RUN npm install
# Copy app files
COPY . ./
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine3.18 as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]