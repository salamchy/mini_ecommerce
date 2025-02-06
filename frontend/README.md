# Project Name: Mini E-commerce Application

## Project Overview

### Description

This project is a web application built with React that allows users to browse products, manage their shopping cart, and place orders. It features an admin dashboard for managing products and orders.

### Tech Stack

- React.js
- Redux Toolkit
- Tailwind CSS
- reduxjs/toolkit
- react-icon
- react-redux
- react-responsive-carousel
- react-router-dom
- react-toastify

### Live Demo

[Link to the deployed site](#) (insert the actual link here)

## Installation & Setup

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/salamchy/mini_ecommerce.git
```

### Install Dependencies

```bash
cd project-name
npm install
```

### Run the Project

```bash
npm start
```

This will start the development server and open the application in your default web browser.

### Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. Example:

## Project Structure

```
project-name/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Navbar.js
│   │   └── OrderCard.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── index.js
│   └── assets/
│       ├── drone.jpg
│       └── headphone.png
├── package.json
└── README.md
```

## Key Features

- 🔹 **User Authentication**: Implemented using JWT for secure login and registration.
- 🔹 **Product Listings and Search**: Users can browse and search for products easily.
- 🔹 **Shopping Cart & Order Management**: Users can add products to their cart and manage their orders.
- 🔹 **Responsive UI using Tailwind CSS**: The application is fully responsive and looks great on all devices.
- 🔹 **API Integration with Backend**: Seamless integration with the backend for data fetching and manipulation.

## API Endpoints Used

- **GET /api/v1/products**: Fetch all products

  - **Response Example**:

  ```json
  [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description here.",
      "image": "url_to_image"
    }
  ]
  ```

- **POST /api/v1/auth/login**: User login

  - **Request Example**:

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **PUT /api/v1/orders/:id**: Update order status
  - **Request Example**:
  ```json
  {
    "status": "shipped"
  }
  ```

## State Management

### Redux Toolkit Slices:

- **authSlice.js**: Manages authentication state.
- **cartSlice.js**: Handles cart actions.

### RTK Query

Utilized for making API calls and managing server state.

## Component Breakdown

- **Button.js**: Custom button with loading states.
- **Navbar.js**: Navigation bar with login/logout functionality.
- **OrderCard.js**: Displays individual order details.

## Testing

If applicable, run the tests using:

```bash
npm test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Roadmap

- Implement user reviews and ratings for products.
- Add payment gateway integration.

## Acknowledgments

- Special thanks to the React community for their support and resources.
