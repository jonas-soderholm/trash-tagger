# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of your application's code to the working directory
COPY . .

# Copy the environment file into the image
COPY .env ./.env

# Expose port 5000 on the container to allow communication to/from the server
EXPOSE 5000

# Command to run your application
CMD ["node", "server.js"]