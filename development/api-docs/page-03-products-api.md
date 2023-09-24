# Products API Documentation

## Add a New Product

Add a new product to the system.

- **Endpoint**: `POST /api/products`

### Request

#### Headers

- Authorization: Bearer <access_token>

#### Body

| Field         | Type   | Required | Description                                             |
| ------------- | ------ | -------- | ------------------------------------------------------- |
| `productType` | string | Yes      | The ID of the product type associated with the product. |
| `description` | string | Yes      | A short description of the product.                     |
| `price`       | number | Yes      | The price of the product.                               |
| `prepTime`    | number | Yes      | The preparation time of the product in minutes.         |

Example:
```json
{
  "productType": "650f9f010662bcec519352ed",
  "description": "Delicious Chocolate Cake",
  "price": 15.99,
  "prepTime": 60
}
```

### Response

- Status: 200 OK
- Body:
```json
{
  "product": {
    "_id": "650fa4f29b683b535a358aab",
    "productType": "650f9f010662bcec519352ed",
    "description": "Delicious Chocolate Cake",
    "price": 1599,
    "prepTime": 60,
    "baker": "650eb234ffd64b091466ba6c",
    "createdAt": "2023-09-21T12:34:56.789Z",
    "updatedAt": "2023-09-21T12:34:56.789Z"
  }
}
```

### Error Responses

- Status: 400 Bad Request
- Body:
```json
{
  "message": "Validation error message"
}
```

- Status: 401 Unauthorized
- Body:
```json
{
  "message": "Unauthorized"
}
```

- Status: 403 Forbidden
- Body:
```json
{
  "message": "Access denied. User is not a baker."
}
```
