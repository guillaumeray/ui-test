# Use the official Cypress Docker image as the base
FROM cypress/base:18.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . ./

# Specify environment variables for Cypress
ENV CYPRESS_VIDEO=false
ENV CYPRESS_SCREENSHOT=true

# Run tests using the Cypress CLI
CMD ["npx", "cypress", "run"]