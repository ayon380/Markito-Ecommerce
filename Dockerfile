# Use Node.js LTS version as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json /app/

# Install the frontend dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app/

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js application will run (adjust this port based on your Next.js app configuration)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
