# Products API Documentation

## List Products

Retrieve a list of available products.

- **URL**

  `/api/products`

- **Method**

  `GET`

- **Authentication**

  Public

- **Success Response**

  - **Status Code**: 200
  - **Content**:

    ```json
    {
        "products": [
            {
                "_id": "650fa1bf547bf972158e341f",
                "baker": {
                    "_id": "650f2a1fa60ccaf0796e5e3c",
                    "user": {
                        "_id": "650efe04a4dd7250bfd3478a",
                        "username": "test121"
                    },
                    "__t": "baker"
                },
                "productType": {
                    "_id": "650f9f010662bcec519352ed",
                    "type": "pie",
                    "name": "Cherry"
                },
                "description": "Magic Pie is a delicious dessert that can transport you to a world of sweet indulgence with just one bite.",
                "price": 13.5,
                "prepTime": 40,
                "createdAt": "2023-09-24T02:41:03.383Z",
                "updatedAt": "2023-09-24T02:41:03.383Z",
                "__v": 0
            }
        ]
    }
    ```

- **Error Response**

  - **Status Code**: 500
  - **Content**:

    ```json
    {
        "message": "Internal Server Error"
    }
    ```

- **Notes**

  - The response will contain an array of product objects.

## Add a New Product

Add a new product to the system.

> Note: Just users with active `baker profile` can add products.

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
