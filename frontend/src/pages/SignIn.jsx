import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData))
        .unwrap();
      const redirectTo = result.role === "admin" ? "/admin/dashboard" : "/";

      toast.success("Login successful!");
      navigate(redirectTo);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">LOGIN</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 p-2 border rounded-lg focus:outline-none"
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
            className="w-full px-4 p-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        <p className="text-md text-gray-700 mt-3 flex text-center justify-center">Don't have an Account? <Link to="/register"> <span className="underline ml-1 mr-1">Register</span></Link>please!</p>
      </form>
    </div>
  );
};

export default SignIn;