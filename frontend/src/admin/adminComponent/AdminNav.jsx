import { useNavigate, Link } from "react-router-dom";
import { useLogoutUserMutation } from "../../features/api/userApi";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/slice/authSlice";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      // Clear local storage
      localStorage.removeItem("user");

      // Update Redux state
      dispatch(clearUser());

      // Navigate to home
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/")
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-14 bg-gray-800 text-white">
      <div className="flex items-center">
        <Link to="/admin" className="text-2xl font-bold">Admin</Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
};

export default AdminNav;
