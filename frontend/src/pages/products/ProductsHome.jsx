import { useGetAllProductsQuery } from "../../features/api/productApi";
import { useNavigate } from "react-router-dom";

const ProductsHome = () => {
  const { data: response = {}, error, isLoading } = useGetAllProductsQuery();
  const products = response.data || [];
  const navigate = useNavigate();

  // Function to shuffle the array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Shuffle the products and take the first 5
  const currentProducts = shuffleArray([...products]).slice(0, 5);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error fetching products.</p>;

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="flex items-center justify-center mb-8 text-2xl font-bold">MOST SOLD PRODUCTS</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Tag */}
            <div className="px-2 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-bl-lg w-fit">
              Nearest Seller
            </div>

            {/* Product Image */}
            <div className="p-3 relative overflow-hidden group">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-36 object-cover rounded-md transition-transform duration-500 transform group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="px-3 pb-3">
              <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">
                {product.productName}
              </h3>
              <p className="text-xs text-gray-500 mb-2">Shipped in 2-3 days</p>
              <p className="text-base font-semibold text-gray-900">${product.price}</p>
            </div>

            {/* Buttons */}
            <div className="px-3 pb-3 w-full">
              <button
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 text-xs rounded-lg font-medium shadow-md hover:bg-gray-300 transition cursor-pointer"
                onClick={() => navigate(`product/${product._id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsHome;