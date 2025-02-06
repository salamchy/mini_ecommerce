import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../features/api/productApi";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const { data, error, isLoading } = useGetSingleProductQuery(id); // Fetch product details
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    stockQuantity: "",
    image: null,
  });

  const [updateProduct, { isLoading: isUpdating, isError }] = useUpdateProductMutation();

  // Populate form with product data when fetched
  useEffect(() => {
    if (data?.data) {
      setFormData({
        productName: data.data.productName || "",
        price: data.data.price || "",
        description: data.data.description || "",
        category: data.data.category || "",
        stockQuantity: data.data.stockQuantity || "",
        image: null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0], // Store the uploaded file
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

    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        productData.append(key, formData[key]);
      }
    });

    try {
      await updateProduct({ id, product: productData }).unwrap();
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      navigate("/admin/products"); // Redirect after update
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error fetching product data.</p>;

  if (!data?.data) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  return (
    <div className="p-6 mt-12 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">UPDATE PRODUCT</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Price */}
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

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
      {isError && <div className="text-red-500 mt-4">Error updating product. Try again.</div>}
    </div>
  );
};

export default UpdateProduct;
