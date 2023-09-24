# Using the Base Router

The base router is a utility provided in the CakePals backend application that simplifies the process of defining routes and applying middleware in Express.

## Table of Contents

1. [Introduction](#introduction)
2. [Setting Up the Base Router](#setting-up-the-base-router)
3. [Defining Routes](#defining-routes)
4. [Applying Middleware](#applying-middleware)
5. [Examples](#examples)

---

## Introduction

The base router is designed to streamline the process of setting up routes and applying middleware in an Express application. It encapsulates common functionalities and allows for cleaner and more organized code.

---

## Setting Up the Base Router

To use the base router in your CakePals backend application, follow these steps:

1. **Import the Base Router**

   In your Express application file (e.g., `app.ts`), import the base router:

   ```ts
   import BaseRouter from './shared/base.router';
   ```

2. **Extend the Base Router**

   Create a new class that extends the `BaseRouter`:

   ```ts
   class CustomRouter extends BaseRouter {
     // Custom implementation here
   }
   ```

3. **Override the Base Route**

   Override the `base` property to set the base path for your router:

   ```ts
   class CustomRouter extends BaseRouter {
     protected override base = '/custom';
   }
   ```

   In this example, the base path for the router will be `/custom`.

---

## Defining Routes

With the base router, defining routes becomes straightforward:

```ts
class CustomRouter extends BaseRouter {
  protected override base = '/custom';

  protected override configureRoutes(): void {
    this.router.get('/', this.wrapAsync(this.handleGetRequest));
    this.router.post('/', this.wrapAsync(this.handlePostRequest));
  }

  private async handleGetRequest(req: Request, res: Response): Promise<void> {
    // Handle GET request logic
  }

  private async handlePostRequest(req: Request, res: Response): Promise<void> {
    // Handle POST request logic
  }
}
```

---

## Applying Middleware

Middleware can be applied to the base router in the `before` method. For example, to apply authentication middleware to all routes, you can do the following:

```ts
class CustomRouter extends BaseRouter {
  protected override base = '/custom';

  protected override before(): void {
    // Apply authentication middleware
    this.router.use(AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    // Define routes here
  }
}
```

---

## Examples

For further reference, you can find examples of using the base router in the CakePals backend application in the following files:

- `src/modules/profile/profile.routes.ts`
- `src/modules/product/product.routes.ts`
