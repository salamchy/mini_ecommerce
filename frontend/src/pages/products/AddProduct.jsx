import { useState } from "react";
import { useCreateProductMutation } from "../../features/api/productApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const categories = [
  "phone",
  "laptop",
  "keyboard",
  "camera",
  "drone",
  "watch",
  "mouse",
  "headphone",
];

const AddProduct = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    alert("You must be logged in to add a product.");
    return null;
  }

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "phone",
    stockQuantity: "",
    image: null,
  });

  const [createProduct, { isLoading, isError }] = useCreateProductMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to send multipart/form-data
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    try {
      await createProduct(productData).unwrap();
      toast.success("Product added successfully!"); // Success toast

      // Reset form after submission
      setFormData({
        productName: "",
        price: "",
        description: "",
        category: "phone",
        stockQuantity: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("An error occurred while adding the product."); // Error toast
    }
  };

  return (
    <div className="p-6 mt-12 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">

      <h2 className="text-2xl font-bold mb-6 text-center">ADD NEW PRODUCT</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <span>Loading...</span> : "Add Product"}
          </button>
        </div>
      </form>

      {isError && (
        <div className="mt-4 text-red-500 text-center">
          Error: Failed to add product. Please try again.
        </div>
      )}
    </div>
  );
};

export default AddProduct;
