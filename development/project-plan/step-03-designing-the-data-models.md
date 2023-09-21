# Step 3: Designing the Data Models

Design the data models that will represent the core entities in the CakePals application. These models will define the structure of the data that will be stored in the database.

## Sub-Tasks:

### 3.1. Define Entity

- User
- Profile
- Order
- Product
- ProductType
- Location


### 3.2. Create Entity Schema

1. **User Schema**:

   - `username`: String (Required)
   - `email`: String (Required, Unique)
   - `password`: String (Required, Hashed)
   - `location`: ObjectId (Reference to Location, Required)

2. **Profile Schema**:

   - `user`: ObjectId (Reference to User, Required)
   - `role`: Enum ('baker', 'member', etc...) (Required)
   - `isActive`: Boolean (Default: true)
   - `collectionTimeRange`: 
     - `startTime`: Date (Required)
     - `endTime`: Date (Required)

3. **Order Schema**:

   - `product`: ObjectId (Reference to Product, Required)
   - `member`: ObjectId (Reference to Profile, Required)
   - `rating`: Number
   - `comment`: String
   - `startTime`: DateTime (Required)
   - `endTime`: DateTime (Required)
   - `deliveryTime`: DateTime (Required)
   - `deliveryStatus`: Enum ('pending', 'inProgress', 'delivered', etc...) (Required)

4. **ProductType Schema**:

   - `type`: Enum ('cake', 'pie', etc...) (Required)
   - `name`: String (Required)

5. **Product Schema**:

   - `baker`: ObjectId (Reference to Profile, Required)
   - `productType`: ObjectId (Reference to ProductType, Required)
   - `description`: String (Required)
   - `price`: Number (Required)
   - `prepTime`: Number (Required)

6. **Location Schema**:

   - `name`: String (Required)
   - `coordinates`: Coordinate { type: string; coordinates: [number, number]; } (Required)


### 3.3. Establish Database Relationships

1. **User**:
   - Has a one-to-many relationship with **Profile**.
   - Has one **Location**.

2. **Profile**:
   - Belongs to one **User**.
   - Has a one-to-many relationship with **Order** (as a member).
   - Has a one-to-many relationship with **Product** (as a baker).

3. **Order**:
   - Belongs to one **Profile** (as a member).
   - Belongs to one **Product**.

4. **Product**:
   - Belongs to one **Profile** (as a baker).
   - Belongs to one **Product Type**.
   - Has a one-to-many relationship with **Order**.

5. **ProductType**:
   - Has many **Products**.

6. **Location**:
   - Has a one-to-many relationship with **User**.


### 3.4. Validation Rules

1. **User**:
   - Ensure that `username` and `email` are unique.
   - Validate that `email` follows a valid email format.

2. **Profile**:
   - Ensure that `collectionTimeRange` has a valid format for start and end times.
   - Validate that `role` is within an expected set of values ('baker', 'member', etc...).

3. **Order**:
   - Ensure that `startTime`, `endTime`, and `deliveryTime` are in the correct format and follow logical order.

4. **Product**:
   - Validate that `price` and `prepTime` have valid values.

5. **ProductType**:
   - Ensure that `type` follows an expected set of values ('cake', 'pie', etc...).

6. **Location**:
   - Validate that `latitude` and `longitude` fall within appropriate ranges.

### 3.5. Diagram

![Entities-Diagram](media/CakePals-Entities.png)
