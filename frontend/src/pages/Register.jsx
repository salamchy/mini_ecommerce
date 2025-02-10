import { useState } from 'react';
import { useRegisterUserMutation } from '../features/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/slice/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [registerUser, { isLoading, isError, error, isSuccess }] = useRegisterUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();

      // Check if response and user exist before storing
      if (response && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));

        // Update Redux store
        dispatch(setUser(response.user));

        // Clear form fields
        setFormData({ email: '', password: '' });

        // Show success message
        alert('Registration successful!');
        navigate('/login');
      } else {
        console.error("Invalid response format:", response);
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>

        {/* Error Handling */}
        {isError && (
          <div className="mb-4 p-2 text-sm rounded-lg bg-red-100 text-red-700">
            {error?.data?.message || "Registration failed! Please try again."}
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-4 p-2 text-sm rounded-lg bg-green-100 text-green-700">
            Registration successful! Redirecting to login...
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
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className='flex items-center justify-center mt-3'>
          Already have an Account?{" "}
          <Link to="/login">
            <span className='italic font-medium ml-2 mr-2 mb-3'>Login</span> please!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
