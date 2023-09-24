# Dockerizing the Application

To dockerize the application, we will be using Docker Compose to define and run a multi-container Docker application. This will help in managing both the MongoDB database and the backend Node.js application.

## Step 1: Create `docker-compose.yml`

Create a file named `docker-compose.yml` in the root directory of your project. This file will define the services required for the application.

```yaml
version: '3'

services:
  mongo_db:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    volumes:
      - cakepals-mongo-data:/data/db
  backend:
    build:
      context: .
      dockerfile: backend.Dockerfile
    ports:
      - 8080:8080
    volumes:
      - .:/usr/src/app
    environment:
      NODE_ENV: development
      MONGO_IP: mongo_db
      MONGO_PORT: 27017
      MONGO_DB_NAME: cakepals
      DOMAIN_NAME: example.com
      PORT: 8080
      JWT_SECRET: your_secret_key_here
      JWT_EXPIRE_TIME: 1h
      VERIFICATION_TOKEN_EXPIRE_TIME: 1h
      EMAIL_SERVICE: your_email_service
      EMAIL_USER: your_email_username
      EMAIL_PASS: your_email_password
    depends_on:
      - mongo_db

volumes:
  cakepals-mongo-data: {}
```

This configuration sets up two services: `mongo_db` for the MongoDB database and `backend` for the Node.js application. It also specifies the necessary environment variables for the backend.

## Step 2: Create `backend.Dockerfile`

Create a file named `backend.Dockerfile` in the root directory of your project. This file will contain instructions to build the Docker image for the backend.

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
# Copy the rest of the application code to the container
COPY . .

# Expose the port that Node.js application will run on
EXPOSE 8080

# Command to start your application
# CMD [ "npm", "start" ]
CMD [ "npm", "run", "dev" ]
```

This Dockerfile sets up a Node.js environment, copies the package files, installs dependencies, and copies the rest of the application code. It also exposes port 8080 and specifies the command to run the application.

## Step 3: Build and Run

Run this command to build and run the Docker containers:

```sh
# Build
docker-compose build
# Run
docker-compose up

# Or build and run in one command
docker-compose up --build
```

This will create and start the containers defined in the `docker-compose.yml` file. The backend will be accessible at `http://localhost:8080`.
