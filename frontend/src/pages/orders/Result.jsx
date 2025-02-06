import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-gray-800 font-medium">
      <h1 className="text-2xl md:text-3xl font-semibold">🎉 Order Successful!</h1>
      <p className="text-lg text-gray-600 mt-2">Thank you for choosing us!</p>
      <button
        onClick={() => navigate("/orders")}
        className="mt-5 px-6 py-2 bg-blue-600 cursor-pointer text-white text-lg rounded-lg hover:bg-blue-700 transition"
      >
        Go to Orders
      </button>
    </div>
  );
};

export default Result;
