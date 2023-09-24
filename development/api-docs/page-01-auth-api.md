# Authentication API

The Authentication API in CakePals handles user registration, login, and authentication. This API ensures that users can create accounts, securely log in, and access protected routes based on their roles (Member or Baker).

## Table of Contents

1. [Registering a New User](#registering-a-new-user)
2. [User Login](#user-login)
3. [Authentication Middleware](#authentication-middleware)
4. [Error Handling](#error-handling)

## Registering a New User

### Endpoint

`POST /api/auth/register`

### Description

Allows a user to create a new account as either a Member or a Baker.

### Request Body

- `username`: User's chosen username (string).
- `password`: User's chosen password (string).
- `role`: User's role (`"Member"` or `"Baker"`).

### Example Request

```json
{
  "username": "user_name",
  "password": "password123",
  "role": "Member"
}
```

### Response

- `message`: Success message indicating account creation.

### Example Response

```json
{
  "message": "User registered successfully!"
}
```

## User Login

### Endpoint

`POST /api/auth/login`

### Description

Allows a registered user to log in to their account.

### Request Body

- `username`: User's username (string).
- `password`: User's password (string).

### Example Request

```json
{
  "username": "user_name",
  "password": "password123"
}
```

### Response

- `token`: JSON Web Token (JWT) for authentication.

### Example Response

```json
{
  "token": "<JWT_TOKEN>"
}
```

## Authentication Middleware

Middleware is applied to routes that require authentication. It verifies the JWT token and attaches user data to the request object for further processing.

### Usage

```javascript
const AuthMiddleware = require('../../middleware/auth.middleware');

// Apply middleware to a route
app.get('/api/some_protected_route', AuthMiddleware.isAuthenticated, (req, res) => {
  // Access user data using req.userData
});
```

## Error Handling

In case of errors, the API returns an error message with an appropriate status code. For example:

```json
{
  "message": "Invalid credentials"
}
```
