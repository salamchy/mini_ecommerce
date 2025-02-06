import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../features/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../features/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();
      const { user, token } = response;

      dispatch(setUser({ user, token }));

      // Set user session in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Check if the user is an admin and redirect accordingly
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
          LOGIN
        </h2>

        {isError && (
          <div
            className="mb-4 p-2 text-sm rounded-lg bg-red-100 text-red-700"
          >
            {error?.data?.message || "Login failed!"}
          </div>
        )}

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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className='flex items-center justify-center mt-3'>Don't have an Account? <Link to="/register"><span className='italic font-medium ml-2 mr-2'>Register</span>please!</Link></p>
      </form>
    </div>
  );
};

export default Login;
