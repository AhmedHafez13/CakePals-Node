# Step 1: Setting Up the Project Structure

In this step, we'll establish the basic structure of our CakePals backend project. This involves creating the necessary directories, initializing a TypeScript project, and setting up the configuration files.

## 1.1 Initialize a New TypeScript Project

Initialize a new TypeScript project.

```bash
npm init -y
npm install typescript --save-dev
```

## 1.2 Install Necessary Dependencies

Install the required dependencies for your CakePals backend. We'll be using `express` for handling routes, `mongoose` for MongoDB integration, `passport` for authentication, and other necessary libraries. Additionally, since we're using TypeScript, we need to install the type definitions for these libraries.

```bash
npm install ts-node nodemon jest @types/jest ts-jest --save-dev
npm install dotenv express mongoose passport bcryptjs morgan
npm install @types/node @types/express @types/mongoose @types/passport @types/bcryptjs @types/morgan --save-dev
```

## 1.3 Set Up a TypeScript Configuration File

Create a `tsconfig.json` file to configure TypeScript for your project. This file defines how TypeScript should compile your code.
