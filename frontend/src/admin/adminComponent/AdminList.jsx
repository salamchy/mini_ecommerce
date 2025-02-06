import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetAllProductsQuery, useDeleteProductMutation } from "../../features/api/productApi";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const { data: response = {}, error, isLoading } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const products = response.data || [];
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error("Unauthorized action. Only admins can delete products.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } catch (err) {
        console.error("Failed to delete product:", err);
        toast.error(err?.data?.message || "Error deleting product. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleUpdate = (productId) => {
    // Navigate to the update page with the product ID
    navigate(`/admin/products/update/${productId}`);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error fetching products.</p>;

  return (
    <div className="mt-12 px-6 sm:px-6 lg:px-8">
      <h2 className="flex items-center justify-center mb-8 text-2xl font-bold">PRODUCT LIST</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Image</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Product Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Price</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Category</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Stock</th>
              {isAdmin && (
                <th className="px-6 py-4 text-sm font-medium text-gray-700 border">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border text-gray-800">{product.productName}</td>
                <td className="px-6 py-4 border text-gray-800">${product.price}</td>
                <td className="px-6 py-4 border text-gray-600">{product.category}</td>
                <td className="px-6 py-4 border text-gray-600">{product.stockQuantity}</td>
                {isAdmin && (
                  <td className="px-6 py-8 border flex gap-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs rounded-lg font-medium shadow-md transition cursor-pointer"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs rounded-lg font-medium shadow-md transition cursor-pointer"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
