# ── Stage 1: Build React App ──────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Set API URL for production build
ENV REACT_APP_API_URL=http://98.92.164.169:5000/api

# Build React app
RUN npm run build

# ── Stage 2: Serve with Nginx ─────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Copy build files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]