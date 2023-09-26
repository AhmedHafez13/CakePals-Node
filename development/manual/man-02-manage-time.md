# Time Management

## Introduction

In the CakePals backend application, efficient day time management is crucial for handling orders, ensuring baker availability, and calculating collection times accurately. To achieve this, we utilize the Luxon library to work with dates and times. This document outlines our approach to day time management and provides numerical examples for better understanding.

## Luxon Library

Luxon is a powerful library for handling dates and times in JavaScript. It provides a range of methods and utilities to perform operations on dates and times with precision and ease.

### Storing Time in Minutes

In CakePals, we store dates and times in minutes for precise calculations. This approach allows us to perform accurate operations while maintaining consistency in time-based functions. For instance, a time range may be represented as follows:

```json
{
  "startTime": 600,   // 10:00 AM
  "endTime": 1020     // 5:00 PM
}
```

This format enables us to easily compare, calculate, and validate time intervals.

## Discussion and Examples

### 1. Baker's Collection Time Range

The baker's collection time range defines the period during which they are available to fulfill orders. It ensures that orders are placed within the time frame when the baker can work.

**Example:**

If a baker's collection time range is:

```json
{
  "startTime": 600,   // 10:00 AM
  "endTime": 1020     // 5:00 PM
}
```

- The baker can start working at 10:00 AM and must finish by 5:00 PM.

### 2. Order Start Time Calculation

To determine the start time of an order, we subtract the collection time from the product's preparation time.

**Example:**

If a product requires 2 hours (120 minutes) of preparation time and the customer wants the order delivered in 30 minutes:

```json
{
  "prepTime": 120,    // 2 hours
  "collectionTime": 30  // 30 minutes
}
```

- Order Start Time = Preparation Time - Collection Time
- Order Start Time = 120 - 30 = 90 minutes

### 3. Ensuring Baker Availability

Before placing an order, we verify that there are no other orders in progress at the desired collection time. This ensures that the baker can fulfill the order without conflicts.

**Example:**

If a baker has an order in progress from 11:00 AM to 2:00 PM, a new order with a collection time of 1:30 PM cannot be accepted.
