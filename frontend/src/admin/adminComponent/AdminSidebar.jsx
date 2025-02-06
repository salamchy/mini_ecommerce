import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-48 pl-16 h-screen text-gray-700 border-gray-700">
      <ul className="space-y-4 mt-10">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-6 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/all-orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            All Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/carousel/upload"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Add Image
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/carousel/get-image"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            View Images
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/products"
            end
            className={({ isActive }) =>
              `block px-2 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            View Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/products/add"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/message"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Message
          </NavLink>
        </li>
      </ul>
    </div >
  );
};

export default AdminSidebar;
