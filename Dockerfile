# Use an appropriate base image that includes Node.js and npm
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build your Angular application (if needed)
# RUN ng build --prod

# Set the command to start your application
CMD ["npm", "start"]
