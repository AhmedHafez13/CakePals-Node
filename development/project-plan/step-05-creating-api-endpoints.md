# Creating API Endpoints

In this step, define the routes and controllers for each of the required features. This includes functionalities like activating profiles, adding products, listing products, placing orders, and more.

## Endpoints

1. **Activating Profiles**
   - Endpoint: `POST /api/profile/`
   - Description: Create a user's profile after registration.
   - Controller: `ProfileController.createProfile`
   - Protection: Authenticated

2. **Adding Products**
   - Endpoint: `POST /api/products`
   - Description: Add a new product to the system.
   - Controller: `ProductController.addProduct`
   - Protection: Authenticated, Is Baker

3. **Listing Products**
   - Endpoint: `GET /api/products`
   - Description: Retrieve a list of available products.
   - Controller: `ProductController.listProducts`
   - Protection: Public

4. **Placing Orders**
   - Endpoint: `POST /api/orders`
   - Description: Place a new order for a product.
   - Controller: `OrderController.placeOrder`
   - Protection: Authenticated, Is Member

5. **Listing Orders**
   - Endpoint: `GET /api/orders`
   - Description: Retrieve a list of user's orders.
   - Controller: `OrderController.listOrders`
   - Protection: Authenticated, Is Baker

6. **Updating Order Status**
   - Endpoint: `PATCH /api/orders/:orderId`
   - Description: Update the status of a specific order.
   - Controller: `OrderController.updateOrderStatus`
   - Protection: Authenticated, Is Baker

7. **Viewing Profile Details**
   - Endpoint: `GET /api/profile`
   - Description: Retrieve the details of the user's profile.
   - Controller: `ProfileController.viewProfile`
   - Protection: Authenticated

8. **Updating Profile**
   - Endpoint: `PUT /api/profile`
   - Description: Update the user's profile information.
   - Controller: `ProfileController.updateProfile`
   - Protection: Authenticated

9. **Deleting Profile**
   - Endpoint: `DELETE /api/profile`
   - Description: Delete the user's profile.
   - Controller: `ProfileController.deleteProfile`
   - Protection: Authenticated

10. **Adding Reviews**
    - Endpoint: `POST /api/reviews`
    - Description: Add a new review for a product.
    - Controller: `ReviewController.addReview`
    - Protection: Authenticated, Is Member

11. **Listing Reviews**
    - Endpoint: `GET /api/reviews`
    - Description: Retrieve a list of reviews for a specific product.
    - Controller: `ReviewController.listReviews`
    - Protection: Authenticated, Is Baker

12. **Searching Products**
    - Endpoint: `GET /api/products/search`
    - Description: Search for products based on specific criteria.
    - Controller: `ProductController.searchProducts`
    - Protection: Public

## Subtasks

### Creating Profiles Endpoint Requirements

#### For Baker Profiles:

    - **Endpoint**: `POST /api/profiles/activate`
    - **Request Body**:
      - `user`: User ID _(required)_
      - `role`: "baker" _(required)_
      - `location`: Location ID _(required)_
      - `collectionTimeRange`:
        - `startTime`: Time of day in minutes (e.g., 570) _(required)_
        - `endTime`: Time of day in minutes (e.g., 945) _(required)_

#### For Member Profiles:

    - **Endpoint**: `POST /api/profiles/activate`
    - **Request Body**:
      - `user`: User ID _(required)_
      - `role`: "member" _(required)_
      - `location`: Location ID _(required)_

### Implementation Steps for `ProfileController.createProfile` Method

1. **Define the Route**:
   - Create a route to handle the activation of profiles.

2. **Create the Controller Method**:
   - In the controller, implement the `createProfile` method.
   - Validate the request data to ensure it meets the required format.

3. **Handle Discriminators in Mongoose**:
   - When saving a profile, use Mongoose discriminators to add the `collectionTimeRange` field only for baker profiles.

4. **Save the Profile**:
   - Create a new profile document based on the provided data.
   - If the profile is a baker profile, include the `collectionTimeRange`.

5. **Return the Response**:
   - Return a response indicating the success of the profile activation.