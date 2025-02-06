## API Endpoints Documentation

## Users

### 1. Register User

- **Method**: POST
- **URL**: `/register`
- **Middleware**: `validateUser`, `validateRequest`
- **Description**: Registers a new user.

**Example JSON Request**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

### 2. Login User

- **Method**: POST
- **URL**: `/login`
- **Middleware**: `validateLogin`, `validateRequest`
- **Description**: Logs in a user.

**Example JSON Request**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "token": "your_jwt_token_here"
}
```

### 3. Logout User

- **Method**: POST
- **URL**: `/logout`
- **Middleware**: `verifyToken`
- **Description**: Logs out the authenticated user.

**Example JSON Response**:

```json
{
  "success": true,
  "message": "User logged out successfully."
}
```

## Contact Messages

### 1. Create Contact Message

- **Method**: POST
- **URL**: `/contact`
- **Middleware**: `validateMessage`
- **Description**: Creates a new contact message.

**Example JSON Request**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to inquire about..."
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Contact message created successfully."
}
```

### 2. Get All Messages

- **Method**: GET
- **URL**: `/admin/messages`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Retrieves all contact messages for admin users.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello, I would like to inquire about..."
    }
  ]
}
```

## Orders

### 1. Create Order

- **Method**: POST
- **URL**: `/create`
- **Middleware**: `verifyToken`
- **Description**: Creates a new order.

**Example JSON Request**:

```json
{
  "_id": "63d6c815c486c74c2f74c0a5",
  "userId": "63d6c80ac486c74c2f74c0a4",
  "products": [
    {
      "productId": "63d6c80fc486c74c2f74c0a6",
      "quantity": 2,
      "price": 49.99
    },
    {
      "productId": "63d6c811c486c74c2f74c0a7",
      "quantity": 1,
      "price": 29.99
    }
  ],
  "totalPrice": 129.97,
  "selectedSize": "M",
  "shippingDetails": {
    "name": "John Doe",
    "address": "123 Example St, Anytown, Some Country",
    "mobile": 1234567890,
    "zipCode": "12345"
  },
  "status": "Pending",
  "createdAt": "2023-02-07T14:30:00.000Z"
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Order created successfully.",
  "orderId": "67890"
}
```

### 2. Get User Orders

- **Method**: GET
- **URL**: `/user-order`
- **Middleware**: `verifyToken`
- **Description**: Retrieves the orders for the authenticated user.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "orderId": "67890",
      "status": "Pending",
      "total": 59.98
    }
  ]
}
```

### 3. Get All Orders

- **Method**: GET
- **URL**: `/all-orders`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Retrieves all orders for admin users.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "orderId": "67890",
      "userId": "user123",
      "status": "Pending",
      "total": 59.98
    }
  ]
}
```

### 4. Update Order Status

- **Method**: PUT
- **URL**: `/update/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Updates the status of an order by its ID.

**Example JSON Request**:

```json
{
  "status": "Shipped"
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Order status updated successfully."
}
```

## Carousel

### 1. Add Carousel Image

- **Method**: POST
- **URL**: `/carousel`
- **Middleware**: `verifyToken`, `upload.single("image")`, `verifyAdmin`
- **Description**: Adds a new carousel image.

**Example JSON Request**:

```json
{
  "image": "base64_encoded_image_data"
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Carousel image added successfully."
}
```

### 2. Delete Carousel Image

- **Method**: DELETE
- **URL**: `/carousel/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Deletes a carousel image by its ID.

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Carousel image deleted successfully."
}
```

### 3. Get Carousel Images

- **Method**: GET
- **URL**: `/carousel`
- **Description**: Retrieves all carousel images.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "imageUrl": "https://cloudinary.com/sample_image.jpg"
    }
  ]
}
```

## Products

### 1. Create Product

- **Method**: POST
- **URL**: `/products`
- **Middleware**: `verifyToken`, `verifyAdmin`, `upload.single("image")`, `validateProduct`, `handleValidationErrors`
- **Description**: Creates a new product (Admin only).

**Example JSON Request**:

```json
{
  "productName": "Sample Product",
  "price": 29.99,
  "description": "This is a sample product.",
  "category": "Electronics",
  "stockQuantity": 100
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "data": {
    "productName": "Sample Product",
    "price": 29.99,
    "description": "This is a sample product.",
    "category": "Electronics",
    "stockQuantity": 100,
    "imageUrl": "https://cloudinary.com/sample_image.jpg"
  }
}
```

### 2. Get All Products

- **Method**: GET
- **URL**: `/products`
- **Description**: Retrieves all products.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "productName": "Sample Product",
      "price": 29.99,
      "description": "This is a sample product.",
      "category": "Electronics",
      "stockQuantity": 100
    }
  ]
}
```

### 3. Get Single Product

- **Method**: GET
- **URL**: `/products/:id`
- **Description**: Retrieves a single product by its ID.

**Example JSON Response**:

```json
{
  "success": true,
  "data": {
    "id": "1",
    "productName": "Sample Product",
    "price": 29.99,
    "description": "This is a sample product.",
    "category": "Electronics",
    "stockQuantity": 100
  }
}
```

### 4. Get All Categories

- **Method**: GET
- **URL**: `/categories`
- **Description**: Retrieves all product categories.

**Example JSON Response**:

```json
{
  "success": true,
  "data": ["Electronics", "Clothing", "Home Appliances"]
}
```

### 5. Get Products by Category

- **Method**: GET
- **URL**: `/products/category/:category`
- **Description**: Retrieves products by category.

**Example JSON Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "productName": "Sample Product",
      "price": 29.99
    }
  ]
}
```

### 6. Update Product

- **Method**: PUT
- **URL**: `/products/update/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`, `upload.single("image")`, `handleValidationErrors`
- **Description**: Updates a product by its ID (Admin only).

**Example JSON Request**:

```json
{
  "productName": "Updated Product",
  "price": 39.99,
  "description": "This is an updated product.",
  "category": "Electronics",
  "stockQuantity": 150
}
```

**Example JSON Response**:

```json
{
  "success": true,
  "data": {
    "productName": "Updated Product",
    "price": 39.99,
    "description": "This is an updated product.",
    "category": "Electronics",
    "stockQuantity": 150
  }
}
```

### 7. Delete Product

- **Method**: DELETE
- **URL**: `/products/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Deletes a product by its ID (Admin only).

**Example JSON Response**:

```json
{
  "success": true,
  "message": "Product deleted successfully."
}
```
