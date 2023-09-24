# Profiles API Documentation

The profiles API allows users to create and manage their profiles. Profiles can have different roles, such as "member" or "baker". The API supports creating profiles for both roles.

## Table of Contents
1. [Create a Profile](#create-a-profile)
2. [Error Handling](#error-handling)

---

## 1. Create a Profile

### Endpoint

```
POST /api/profiles
```

### Request Body

- `role` (string, required): The role of the profile. Possible values: "member", "baker".
- `location` (string, optional): The ID of the location associated with the profile. Required for "member" role.
- `collectionTimeRange` (object, required for "baker" role):
  - `startTime` (integer, required): The start time of the collection time range in minutes (0 to 1380).
  - `endTime` (integer, required): The end time of the collection time range in minutes (0 to 1380).

**Example for "member" role:**

```json
{
  "role": "member",
  "location": "603eaa9ca8f3d0478c5755b2"
}
```

**Example for "baker" role:**

```json
{
  "role": "baker",
  "location": "603eaa9ca8f3d0478c5755b2",
  "collectionTimeRange": {
    "startTime": 540,
    "endTime": 720
  }
}
```

### Response

- Status: 200 OK
- Body: JSON object containing the created profile.

**Example Response:**

```json
{
  "profile": {
    "_id": "603eaab8a8f3d0478c5755b3",
    "user": "603eaa9ca8f3d0478c5755b1",
    "role": "member",
    "isActive": true,
    "location": "603eaa9ca8f3d0478c5755b2",
    "createdAt": "2023-09-20T12:34:56.789Z",
    "updatedAt": "2023-09-20T12:34:56.789Z"
  }
}
```

---

## 2. Error Handling

### Bad Request

- Status: 400 Bad Request
- Body: JSON object containing the error message.

**Example Response:**

```json
{
  "message": "Invalid request body, provide a valid user role."
}
```

### Existing Profile for the Same Role

- Status: 400 Bad Request
- Body: JSON object containing the error message.

**Example Response:**

```json
{
  "message": "A profile with role member already exists for this user."
}
```

### Validation Error

- Status: 400 Bad Request
- Body: JSON object containing the validation error message.

**Example Response:**

```json
{
  "message": "The field 'location' is required."
}
```
