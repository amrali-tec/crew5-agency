# ==============================================================================
# Crew5 Agency - Multi-Stage Production Dockerfile
# ==============================================================================

# Stage 1: Build the React + Vite Frontend
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Production Server Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built frontend assets and server backend
COPY --from=builder /app/dist ./dist
COPY server ./server
COPY public ./public

# Expose port
EXPOSE 5000

# Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the full-stack server
CMD ["node", "server/index.js"]
