# CakePals Project Plan

This document outlines the plan for building the CakePals application, a platform where users can order cakes online. This plan provides an overview of the tools, technologies, and initial steps involved in bringing the CakePals project to life.

## Tools & Tech Stack

### Programming Language: TypeScript

Using TypeScript will add static typing to your JavaScript code, which can help catch errors during development.

### Backend Framework: Node.js with Express.js

Node.js is a powerful runtime for building scalable and efficient server-side applications. Express.js is a popular framework for building web applications with Node.js, providing a robust set of features for routing and middleware.

### Database Engine: MongoDB

MongoDB is a NoSQL database that is well-suited for this type of application where flexibility in data structure is important.

### Authentication: Passport.js

Passport.js is a widely used authentication middleware for Node.js applications. It supports various authentication strategies like local, OAuth, etc.

### Testing Framework: Jest

Jest is a popular testing framework for JavaScript and TypeScript applications. It provides a comprehensive set of tools for writing unit tests, integration tests, and more.

### Docker and Docker Compose

Using Docker can make it easier to manage dependencies and ensure consistent environments across development and deployment.

## Initial Steps

1. [**Setting Up the Project Structure**](./step-01-setting-up-the-project-structure)

   - Create a new directory for the project.
   - Initialize a new TypeScript project using `npm init -y` and install necessary dependencies (`express`, `mongoose`, `passport`, etc.).
   - Set up a TypeScript configuration file (`tsconfig.json`).

2. **Dockerizing the Application**

   - Create a Dockerfile and a docker-compose.yml file to containerize the application.

3. [**Designing the Data Models**](./step-03-designing-the-data-models.md)

   - Define the data models for Users, Bakers, Products, Orders, and Ratings.
   - Implement the models using Mongoose

4. **Implementing Authentication**

   - Set up Passport.js to handle user authentication. Create routes for registration, login, and authentication middleware.

5. **Creating API Endpoints**

   - Define routes and controllers for each of the required features (e.g., registration, authentication, adding products, listing products, placing orders, etc.).

6. **Implementing Business Logic**

   - Implement the logic for calculating available collection times based on the baking time and existing orders.

7. **Testing**

   - Write unit tests and integration tests using Jest to ensure the functionality of the endpoints and business logic.

8. **Adding Bonus Features (Time Permitting)**

   - Consider adding features like database caching, setting up CI/CD, or deploying the application to the cloud.

9. **Writing the Readme File**
   - Describe the tech stack you used, the reasoning behind the design decisions, implementation challenges, and any additional thoughts you'd like to share.

## Project Structure

```plaintext
CakePals-Node/
├── development/
│   ├── api-docs/
│   ├── requirements/
│   ├── project-plan/
│   └── ...
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── config/
│   ├── middleware/
│   ├── settings/
│   ├── notifications/
│   ├── plugins/
│   ├── services/
│   ├── types/
│   ├── models/
│   │   ├── BaseModel.ts
│   │   └── ...
│   ├── modules/
│   │   ├── first-module/
│   │   │   ├── first-module.controllers.ts
│   │   │   ├── first-module.models.ts
│   │   │   ├── first-module.routes.ts
│   │   │   ├── tests/
│   │   │   └── ...
│   │   ├── second-module/
│   │   │   ├── first-module.controllers.ts
│   │   │   ├── first-module.models.ts
│   │   │   ├── first-module.routes.ts
│   │   │   ├── tests/
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── types/
│   ├── ...
│   └── ...
├── .env
├── .git
├── .gitignore
├── backend.Dockerfile
├── mongo.Dockerfile
├── docker-compose.yml
├── jest.config
├── tsconfig.json
└── README.md
```

1. **`development/` Directory**:

   - Contains folders like `api-docs/`, `requirements/`, and `project-plan/`. Track of project-related documentation and planning.

2. **`src/` Directory**:

   - **`index.ts`**: Entry point of the application.
   - **`server.ts`**: This is where the server is initialized and started.
   - **`config/`**: Configuration files for the application. This is where you can store environment-specific settings.
   - **`middleware/`**: Custom middleware functions used in the application.
   - **`notifications/`**: Logic related to notifications (e.g., email notifications).
   - **`plugins/`**: Any third-party plugins or extensions used in the application.
   - **`services/`**: Handle the communication with external services and manage tasks such as sending emails.
   - **`types/`**: Custom shared TypeScript type definitions for the application.
   - **`models/`**: Contains the base model and the shared models used in the application.

3. **`modules/` Directory**:

   - Follows a modular approach. Each module (e.g., `first-module/`, `second-module/`) contains its own controllers, models, routes, and tests. This promotes separation of concerns and makes it easier to manage different parts of the application.

4. **`types/` Directory**:

   - Contains additional TypeScript type definitions. This is useful for defining custom types that are used across multiple modules.

5. **Configuration Files**:

   - **`.env`**: Configuration file for environment-specific variables. It's good practice to keep sensitive information (like database credentials) in a separate file.
   - **`.gitignore`**: Specifies which files and directories should be ignored by version control. This helps keep the repository clean.

6. **Docker Files**:

   - Docker files for setting up containers. This allows for consistent development and deployment environments.
   - `docker-compose.yml` orchestrates the interaction between different Docker containers.

7. **Testing Configuration**:

   - **`jest.config`**: Configuration file for Jest, the testing framework.

8. **`tsconfig.json`**:

   - Configuration file for TypeScript. It defines how TypeScript should compile the code.

9. **`README.md`**:
   - The README file provides essential information about the project, including how to set it up, the tech stack used, and any other important details.
