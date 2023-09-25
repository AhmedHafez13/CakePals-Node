# Place Order Test Cases

## Place Order

- **API Route**: `POST /api/orders`
- **Allowed Status**: N/A

### Test Case 1: Valid Input

- **Input**:
  - Request Body:
    ```json
    {
      "product": "650fa1bf547bf972158e341f",
      "member": "650f2a1fa60ccaf0796e5e3c",
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-24T14:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 201
  - Response Body:
    ```json
    {
      "message": "Order placed successfully"
    }
    ```

### Test Case 2: Missing Product ID

- **Input**:
  - Request Body:
    ```json
    {
      "member": "650f2a1fa60ccaf0796e5e3c",
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-24T14:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "product",
          "message": "Product ID is required"
        }
      ]
    }
    ```

### Test Case 3: Invalid Payment Method

- **Input**:
  - Request Body:
    ```json
    {
      "product": "650fa1bf547bf972158e341f",
      "member": "650f2a1fa60ccaf0796e5e3c",
      "paymentMethod": "Invalid Payment Method",
      "collectionTime": "2023-09-24T14:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "paymentMethod",
          "message": "Invalid payment method"
        }
      ]
    }
    ```

### Test Case 4: Invalid Collection Time Format

- **Input**:
  - Request Body:
    ```json
    {
      "product": "650fa1bf547bf972158e341f",
      "member": "650f2a1fa60ccaf0796e5e3c",
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-24T14:00:00"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "collectionTime",
          "message": "Invalid date format. Use ISO format."
        }
      ]
    }
    ```

## Edit Order

- **API Route**: `PUT /api/orders/:orderId`
- **Allowed Status**: `Pending`

### Test Case 1: Valid Input

- **Input**:
  - Request Body:
    ```json
    {
      "paymentMethod": "PayPal",
      "collectionTime": "2023-09-25T15:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order updated successfully"
    }
    ```

### Test Case 2: Missing Payment Method

- **Input**:
  - Request Body:
    ```json
    {
      "collectionTime": "2023-09-25T15:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "paymentMethod",
          "message": "Payment method is required"
        }
      ]
    }
    ```

### Test Case 3: Invalid Payment Method

- **Input**:
  - Request Body:
    ```json
    {
      "paymentMethod": "Invalid Payment Method",
      "collectionTime": "2023-09-25T15:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "paymentMethod",
          "message": "Invalid payment method"
        }
      ]
    }
    ```

### Test Case 4: Invalid Collection Time Format

- **Input**:
  - Request Body:
    ```json
    {
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-25T15:00:00"
    }
    ```
- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Validation Error",
      "errors": [
        {
          "field": "collectionTime",
          "message": "Invalid date format. Use ISO format."
        }
      ]
    }
    ```

### Test Case 5: Edit Order in Accepted Status

- **Input**:
  - Request Body:
    ```json
    {
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-25T15:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be edited in Accepted status"
    }
    ```

### Test Case 6: Edit Order in Completed Status

- **Input**:
  - Request Body:
    ```json
    {
      "paymentMethod": "Credit Card",
      "collectionTime": "2023-09-25T15:00:00.000Z"
    }
    ```
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be edited in Completed status"
    }
    ```

## Accept Order

- **API Route**: `/:orderId/accept`
- **Allowed Status**: `Pending`

### Test Case 1: Accept Order in a Valid Pending Status

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order accepted successfully"
    }
    ```

### Test Case 2: Accept Order in Accepted Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order has already been accepted"
    }
    ```

### Test Case 3: Accept Order in Completed/Rejected/Canceled Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be accepted in ${order_status} status"
    }
    ```

## Reject Order

- **API Route**: `/:orderId/reject`
- **Allowed Status**: `Pending`

### Test Case 1: Accept Order in a Valid Pending Status

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order rejected successfully"
    }
    ```

### The Same Test Cases From 2 to 5 in Accept Order

## Cancel Order

- **API Route**: `PATCH /api/orders/:orderId/cancel`
- **Allowed Status**: `Pending` or (`Accepted` & Collection status is `None`)

### Test Case 1: Cancel Order in Pending Status with Collection Status 'None'

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order canceled successfully"
    }
    ```

### Test Case 2: Cancel Order in Accepted Status with Collection Status 'None'

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order canceled successfully"
    }
    ```

### Test Case 3: Cancel Order in Accepted Status with Collection Status 'Collected'

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be canceled in Accepted status with Collection status 'Collected'"
    }
    ```

### Test Case 4: Cancel Order in Rejected/Completed Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be canceled in ${order_status} status"
    }
    ```

## Start Preparation

- **API Route**: `/:orderId/start-preparation`
- **Allowed Status**: `Accepted`

### Test Case 1: Start Preparation in Valid Accepted Status

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Preparation started successfully"
    }
    ```

### Test Case 2: Start Preparation in Pending/Rejected Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Preparation cannot be started in ${order_status} status"
    }
    ```

## Order Ready

- **API Route**: `/:orderId/order-ready`
- **Allowed Status**: `In Progress`

### Test Case 1: Order Ready in Valid In Progress Status

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order is ready for collection"
    }
    ```

### Test Case 2: Order Ready in Pending/Accepted/Rejected Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be marked as ready in ${order_status} status"
    }
    ```

## Collect Order

- **API Route**: `PATCH /api/orders/:orderId/collect`
- **Allowed Status**: `Ready`

### Test Case 1: Collect Order in Valid Ready Status

- **Input**: None
- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Order collected successfully"
    }
    ```

### Test Case 2: Collect Order in Pending/Accepted/Rejected/InProgress/Collected/Completed Status

- **Input**: None
- **Expected Result**:
  - Status Code: 403
  - Response Body:
    ```json
    {
      "message": "Order cannot be collected in ${order_status} status"
    }
    ```

## Add Feedback

- **API Route**: `PATCH /api/orders/:orderId/feedback`
- **Allowed Status**: `Completed`

### Test Case 1: Valid Feedback

- **Input**:
  - `rating`: 5
  - `comment`: "Great experience!"

- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Feedback added successfully"
    }
    ```

### Test Case 2: Missing Rating

- **Input**:
  - `comment`: "Great experience!"

- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Rating is required"
    }
    ```

### Test Case 3: Missing Comment

- **Input**:
  - `rating`: 5

- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Feedback added successfully"
    }
    ```

### Test Case 4: Invalid Rating (Less than 1)

- **Input**:
  - `rating`: 0
  - `comment`: "Poor experience"

- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Rating must be a number between 1 and 5"
    }
    ```

### Test Case 5: Invalid Rating (Greater than 5)

- **Input**:
  - `rating`: 6
  - `comment`: "Excellent experience"

- **Expected Result**:
  - Status Code: 400
  - Response Body:
    ```json
    {
      "message": "Rating must be a number between 1 and 5"
    }
    ```

### Test Case 6: Valid Feedback with Empty Comment

- **Input**:
  - `rating`: 4
  - `comment`: ""

- **Expected Result**:
  - Status Code: 200
  - Response Body:
    ```json
    {
      "message": "Feedback added successfully"
    }
    ```
