import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../features/slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../features/api/orderApi';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping] = useState(20);

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    mobile: "",
    zipCode: ""
  });

  const [createOrder, { isLoading: isCreatingOrder, error: createOrderError }] = useCreateOrderMutation();

  useEffect(() => {
    const { total, subtotal } = cartItems.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      acc.total += itemTotal;
      acc.subtotal += itemTotal;
      return acc;
    }, { total: 0, subtotal: 0 });

    setTotalPrice(total + shipping);
    setSubtotal(subtotal);
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Item removed from cart.");
  };

  const handleCheckout = async () => {
    // Validate shipping details
    const { name, address, mobile, zipCode } = shippingDetails;
    if (!name || !address || !mobile || !zipCode) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // Validate user authentication
    if (!user || !user._id) {
      toast.error("Please log in to proceed with checkout.");
      navigate('/login');
      return;
    }

    // Construct order data with all necessary fields
    const orderData = {
      userId: user._id,
      products: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        selectedSize: item.selectedSize || "Default",
      })),
      totalPrice,
      shippingDetails,
      status: "Pending"
    };

    try {
      const result = await createOrder(orderData).unwrap();

      if (result && result.orderId) {
        toast.success("Order created successfully!");
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
        navigate('/result', { state: { orderId: result.orderId } });
      } else if (result && result.id) { // Handle case where id might be used instead of orderId
        toast.success("Order created successfully!");
        navigate('/result', { state: { orderId: result.id } });
      } else {
        throw new Error("Order creation failed: Unexpected response from server.");
      }
    } catch (error) {
      console.error('Order creation error:', error);

      // Handle different error types
      if (error.status === 400) {
        toast.error(`Bad request: ${error.data?.message || 'Check your order data.'}`);
      } else if (error.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        navigate('/login');
      } else if (error.status === 403) {
        toast.error("You do not have permission to perform this action.");
      } else if (error.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error?.data?.message || "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-28 px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Section - Cart Items */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold text-center mb-6">🛒 Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/products")} className="text-blue-600 underline mt-2">Go Shopping</button>
          </div>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="flex items-center py-4">
                  <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 rounded-md object-cover" />

                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.productName}</h3>
                    <p className="text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-gray-800 font-bold">Price: ${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >+</button>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="ml-4 bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section - Summary & Shipping Details */}
      {cartItems.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center">Order Summary</h3>
          <hr className="mb-5" />

          <div className="flex justify-between text-lg">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg mt-2">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Shipping Details Form */}
          <h3 className="text-xl font-semibold mt-6 mb-4">📦 Shipping Details</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={shippingDetails.name}
            onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
            className="w-full p-2 border rounded-md mb-3"
          />

          <input
            type="text"
            placeholder="Address"
            value={shippingDetails.address}
            onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
            className="w-full p-2 border rounded-md mb-3"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={shippingDetails.mobile}
            onChange={(e) => setShippingDetails({ ...shippingDetails, mobile: e.target.value })}
            className="w-full p-2 border rounded-md mb-3"
          />

          <input
            type="text"
            placeholder="Zip Code"
            value={shippingDetails.zipCode}
            onChange={(e) => setShippingDetails({ ...shippingDetails, zipCode: e.target.value })}
            className="w-full p-2 border rounded-md mb-4"
          />

          <button
            onClick={handleCheckout}
            disabled={isCreatingOrder}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700"
          >
            {isCreatingOrder ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItems;