# Use official Node.js image as the base
FROM node:18-alpine

# Install Redis
RUN apk add --no-cache redis

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose ports
EXPOSE 3000 6379

# Start both Redis and the app
CMD sh -c "redis-server --daemonize yes && npm start"