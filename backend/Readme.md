# API Endpoints Documentation

## Users

### 1. Register User

- **Method**: POST
- **URL**: `/register`
- **Description**: Registers a new user.

**Example JSON Request**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### 2. Login User

- **Method**: POST
- **URL**: `/login`
- **Description**: Logs in a user.

**Example JSON Request**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### 3. Logout User

- **Method**: POST
- **URL**: `/logout`
- **Description**: Logs out a user. Requires a valid token.

## Products

### 1. Create Product

- **Method**: POST
- **URL**: `/products`
- **Middleware**: `verifyToken`, `verifyAdmin`, `upload.single("image", 1)`
- **Description**: Creates a new product. Requires admin privileges and an image upload.

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

### 2. Get All Products

- **Method**: GET
- **URL**: `/products`
- **Description**: Retrieves a list of all products.

### 3. Get Single Product

- **Method**: GET
- **URL**: `/products/:id`
- **Description**: Retrieves a single product by its ID.

### 4. Update Product

- **Method**: PUT
- **URL**: `/products/update/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`, `upload.single("image")`
- **Description**: Updates an existing product. Requires admin privileges and can include an image upload.

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

### 5. Delete Product

- **Method**: DELETE
- **URL**: `/products/:id`
- **Middleware**: `verifyToken`, `verifyAdmin`
- **Description**: Deletes a product by its ID. Requires admin privileges.
