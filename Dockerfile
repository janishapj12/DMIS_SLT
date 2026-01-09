# Use Node.js 20 LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
