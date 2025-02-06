import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-600 py-6 px-4 border-t border-gray-300 mt-10">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 mb-4">
          {["About", "Blog", "Jobs", "Products", "Accessibility", "Partners"].map((item) => (
            <Link
              key={item}
              to="#"
              className="text-sm hover:text-gray-800 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-5 mb-4">
          <Link to="#" className="text-gray-600 hover:text-gray-800 transition text-xl">
            <FaFacebookF />
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-800 transition text-xl">
            <FaInstagram />
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-800 transition text-xl">
            <FaXTwitter />
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-800 transition text-xl">
            <FaGithub />
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-800 transition text-xl">
            <FaYoutube />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Mini-Ecommerce, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
