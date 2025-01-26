import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Mini-Ecom
            </span>
          </Link>

          {/* Right Section: Cart & Sign-In */}
          <div className="flex md:order-2 items-center justify-center space-x-2 sm:space-x-4">
            <Link to="/cart" className="text-black">
              <MdShoppingCart className="h-6 w-6" />
            </Link>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`items-center w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out ${isMenuOpen
              ? "flex flex-col px-5 py-3 rounded-lg max-w-screen-xl justify-end items-end space-y-4"
              : "hidden md:flex justify-start items-center"
              }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-0 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
              {[
                { path: "/", label: "HOME" },
                { path: "/about", label: "ABOUT" },
                { path: "/services", label: "SERVICES" },
                { path: "/contact", label: "CONTACT" },
              ].map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg ${isActive
                        ? "text-black md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
