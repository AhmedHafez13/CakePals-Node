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

   - Create a new directory for your project.
   - Initialize a new TypeScript project using `npm init -y` and install necessary dependencies (`express`, `mongoose`, `passport`, etc.).
   - Set up a TypeScript configuration file (`tsconfig.json`).

2. **Designing the Data Models**

   - Define the data models for Users, Bakers, Products, Orders, and Ratings. Consider how they relate to each other (e.g., a User can be a Member or a Baker).

3. **Setting Up MongoDB**

   - Install and set up MongoDB on your local machine or use a cloud-based solution (like MongoDB Atlas).
   - Connect your application to the MongoDB database using a library like Mongoose.

4. **Implementing Authentication**

   - Set up Passport.js to handle user authentication. Create routes for registration, login, and authentication middleware.

5. **Creating API Endpoints**

   - Define routes and controllers for each of the required features (e.g., registration, authentication, adding products, listing products, placing orders, etc.).

6. **Implementing Business Logic**

   - Implement the logic for calculating available collection times based on the baking time and existing orders.

7. **Testing**

   - Write unit tests and integration tests using Jest to ensure the functionality of your endpoints and business logic.

8. **Adding Bonus Features (Time Permitting)**

   - Consider adding features like database caching, setting up CI/CD, or deploying the application to the cloud.

9. **Dockerizing the Application**

   - Create a Dockerfile and a docker-compose.yml file to containerize your application.

10. **Writing the Readme File**
    - Describe the tech stack you used, the reasoning behind your design decisions, implementation challenges, and any additional thoughts you'd like to share.
