# Stage 1: Build the React application
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application using serve
FROM node:14

# Install serve
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build files from the build stage to the current stage
COPY --from=build /app/build ./build

# Expose port 3000 for the serve module
EXPOSE 3000

# Command to serve the build directory
CMD ["serve", "-s", "build", "-l", "3000"]