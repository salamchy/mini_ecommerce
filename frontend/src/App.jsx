import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: '/about',
      element: <Home />
    },
    {
      path: '/services',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <SignIn />
    }
  ]);
  return <RouterProvider router={router} />;
}


export default App