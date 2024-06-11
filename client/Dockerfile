# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

# FROM node:${NODE_VERSION}-alpine
FROM node:16.20-alpine3.18

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Ensure the node user owns the working directory *BEFORE* copying the code

# Copy the rest of the source files into the image
COPY . .

# Switch to the non-root user

# Expose the port the application listens on
EXPOSE 8080

# Run the application
CMD ["npm", "run", "dev"]