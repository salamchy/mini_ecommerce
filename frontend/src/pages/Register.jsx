import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the Redux state for registration
  const { status, error } = useSelector((state) => state.user);

  // Local state for form input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Show success or error messages
  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Successfully registered!", {
        onClose: () => {
          // Delay navigation to ensure message is visible
          setTimeout(() => navigate("/login"), 2000);
        }
      });
    }
    if (error) {
      toast.error(error);
    }
  }, [status, error, navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">REGISTER</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500 italic text-sm mt-4">{error}</p>}
        <p className="text-md text-gray-700 mt-3 flex text-center justify-center">Already have an Account? <Link to="/login"> <span className="underline ml-1 mr-1">Login</span></Link>please!</p>
      </form>
    </div>
  );
};

export default Register;
