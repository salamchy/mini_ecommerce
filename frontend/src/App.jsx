import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from './features/slice/authSlice';
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./admin/Dashboard";
import Login from "./pages/Login";
import AddProduct from "./pages/products/AddProduct";
import ProductList from "./pages/products/ProductList";
import UpdateProduct from "./pages/products/UpdateProduct";
import AdminList from "./admin/adminComponent/AdminList";
import ProductDetail from "./pages/products/ProductDetail";
import CartItems from "./pages/cart/CartItems";
import CarouselUpload from "./pages/carousel/CarouselUpload";
import GetCarousel from "./pages/carousel/GetCarousel";
import Result from "./pages/orders/Result";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import AdminMessages from "./admin/adminComponent/AdminMessage";
import UserOrder from "./pages/orders/UserOrder";
import AllOrders from "./pages/orders/AllOrders";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check for user data in local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser({ user, token: user.token }));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/about',
          element: <AboutUs />,
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          path: '/services',
          element: <Home />,
        },
        {
          path: '/products',
          element: <ProductList />,
        },
        {
          path: '/product/:id',
          element: <ProductDetail />,
        },
        {
          path: '/products/product/:id',
          element: <ProductDetail />,
        },
        {
          path: '/orders',
          element: <UserOrder />,
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          )
        },
        {
          path: '/result',
          element: (
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          )
        }
      ],
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/admin/products/add',
          element: (
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/products',
          element: (
            <ProtectedRoute>
              <AdminList />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/products/update/:id',
          element: (
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/products/detail/:id',
          element: (
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/carousel/upload',
          element: (
            <ProtectedRoute>
              <CarouselUpload />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/carousel/get-image',
          element: (
            <ProtectedRoute>
              <GetCarousel />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/message',
          element: (
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admin/all-orders',
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
