import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../features/api/productApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/slice/cartSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Corrected selector

  if (isLoading) return <p className="text-center mt-10">Loading product details...</p>;
  if (error) return <p className="text-center mt-10">Error fetching product details.</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  //handle add to cart
  const handleAddToCart = () => {
    const cartItem = {
      ...product, selectedSize, quantity
    }

    dispatch(addToCart(cartItem));
    toast.success(`${product.productName} added to cart! 🛒`);

    // Persist cart only for logged-in users
    if (localStorage.getItem("user")) {
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, cartItem]));
    }
  }

  return (
    <div className="container mx-auto mt-32 px-6 lg:px-16">
      <div className=" flex flex-col lg:flex-row items-center gap-10">
        {/* Left Side - Product Image */}
        <div className="w-full lg:w-1/2 overflow-hidden rounded-lg shadow-md group">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-lg transition-transform duration-500 transform group-hover:scale-105"
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.productName}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-yellow-500">
            ⭐⭐⭐⭐⭐ <span className="text-gray-500 text-sm">(4.9)</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-gray-900">$:    {product.price}</p>

          {/* Stock Quantity */}
          <p className="text-lg font-semibold text-gray-700">
            Available Stock: <span className="text-green-600">{product.stockQuantity}</span>
          </p>

          {/* Available Sizes */}
          <div className="flex items-center space-x-3">
            <span className="font-semibold">Available Size:</span>
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 cursor-pointer py-2 border rounded-md ${selectedSize === size ? "bg-black text-white" : "bg-gray-200"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-3">
            <span className="font-semibold">Quantity:</span>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="px-3 py-2 cursor-pointer border rounded-md"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => (q < product.stockQuantity ? q + 1 : q))}
              className="px-3 py-2 cursor-pointer border rounded-md"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="mt-4 w-full bg-blue-600 text-white py-3 text-lg rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700 mt-10">Description : <span className="text-base text-gray-500">{product.description}</span></p>
    </div>
  );
};

export default ProductDetail;
