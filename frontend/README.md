# Mini-eCommerce

## Frontend Documentation

### Overview

Mini-eCommerce is a modern web application built using React.js, Redux Toolkit, and Tailwind CSS. It provides users with an intuitive shopping experience while offering administrative functionalities for managing products, orders, and users.

### Tech Stack

- **Framework**: React.js (v18.3.1)
- **State Management**: Redux Toolkit (@reduxjs/toolkit/query/react)
- **Styling**: Tailwind CSS (v4.0.0)
- **Routing**: React Router DOM (v7.1.3)
- **HTTP Requests**: Axios (v1.7.9)
- **Notifications**: React Toastify (v11.0.3)
- **Carousel**: React Responsive Carousel (v3.2.23)
- **Icons**: React Icons (v5.4.0)

### Features

- User Authentication: Register, login, logout functionality.
- Product Management: Fetching, adding, updating, and deleting products.
- Cart Management: Add, remove, increase/decrease quantity.
- Order Management: Create, update, and view orders.
- Contact Form: Submit and fetch messages.
- Carousel Management: Fetch, upload, and delete carousel images.

### API Integrations

#### 1. User API (`userApi`)

```json
{
  "endpoints": [
    {
      "name": "registerUser",
      "method": "POST",
      "path": "/users/register"
    },
    {
      "name": "loginUser",
      "method": "POST",
      "path": "/users/login"
    },
    {
      "name": "logoutUser",
      "method": "POST",
      "path": "/users/logout"
    }
  ]
}
```

#### 2. Product API (productApi)

```json
{
  "endpoints": [
    {
      "name": "getAllProducts",
      "method": "GET",
      "path": "/products"
    },
    {
      "name": "getSingleProduct",
      "method": "GET",
      "path": "/products/{id}"
    },
    {
      "name": "createProduct",
      "method": "POST",
      "path": "/products"
    },
    {
      "name": "updateProduct",
      "method": "PUT",
      "path": "/products/update/{id}"
    },
    {
      "name": "deleteProduct",
      "method": "DELETE",
      "path": "/products/{id}"
    },
    {
      "name": "getProductsByCategory",
      "method": "GET",
      "path": "/products/category/{category}"
    },
    {
      "name": "getAllCategories",
      "method": "GET",
      "path": "/categories"
    }
  ]
}
```

#### 3. Orders API (ordersApi)

```json
{
  "endpoints": [
    {
      "name": "createOrder",
      "method": "POST",
      "path": "/orders/create"
    },
    {
      "name": "getOrders",
      "method": "GET",
      "path": "/orders/all-orders"
    },
    {
      "name": "getUserOrders",
      "method": "GET",
      "path": "/orders/user-order"
    },
    {
      "name": "updateOrder",
      "method": "PUT",
      "path": "/orders/update/{id}"
    }
  ]
}
```

#### 4. Contact API (contactApi)

```json
{
  "endpoints": [
    {
      "name": "submitMessage",
      "method": "POST",
      "path": "/contact"
    },
    {
      "name": "fetchMessages",
      "method": "GET",
      "path": "/admin/messages"
    }
  ]
}
```

#### 5. Carousel API (carouselApi)

```json
{
  "endpoints": [
    {
      "name": "fetchCarouselImages",
      "method": "GET",
      "path": "/carousel"
    },
    {
      "name": "uploadCarouselImage",
      "method": "POST",
      "path": "/carousel"
    },
    {
      "name": "deleteCarouselImage",
      "method": "DELETE",
      "path": "/carousel/{id}"
    }
  ]
}
```

### State Management

    Cart Slice (cartSlice.js):
        Handles cart operations, stored in localStorage.
        Actions:
            addToCart
            removeFromCart
            increaseQuantity
            decreaseQuantity
            clearCart
    Auth Slice (authSlice.js):
        Manages user authentication.
        Actions:
            setUser
            clearUser

### Styling

#### Tailwind CSS is used for styling components efficiently with utility classes. Example:

### html

```
jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Buy Now</button>
```

### Routing

#### React Router DOM is used for navigation. Example:

```jsx
<Route path="/products" element={<Products />} />
```

### Notifications

#### React Toastify is used for displaying success/error messages.

```
jsx

toast.success("Product added successfully!");
```

### Conclusion

This frontend is built with scalability in mind, using Redux Toolkit for state management and Tailwind CSS for styling. The API services are modular and well-structured, making it easy to extend the application's functionality.
