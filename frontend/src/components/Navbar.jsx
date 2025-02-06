import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/slice/cartSlice";
import { clearUser } from "../features/slice/authSlice";
import { useLogoutUserMutation } from "../features/api/userApi";
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Ensure the request completes before proceeding

      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");

      dispatch(clearCart());
      dispatch(clearUser());

      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold dark:text-white">
          Mini-Ecom
        </Link>

        {/* Right Section: Cart & Authentication */}
        <div className="flex md:order-2 items-center space-x-4">
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative text-black">
            <MdShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden md:flex"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 bg-white md:bg-transparent">
            {[
              { path: "/", label: "HOME" },
              { path: "/products", label: "PRODUCTS" },
              { path: "/about", label: "ABOUT" },
              { path: "/contact", label: "CONTACT" },
            ].map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-lg ${isActive
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {isAuthenticated && (
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-lg ${isActive
                      ? "text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    }`
                  }
                >
                  ORDER
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
