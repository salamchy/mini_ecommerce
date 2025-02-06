import { useGetOrdersQuery, useUpdateOrderMutation } from '../../features/api/orderApi';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBoxOpen } from 'react-icons/fa';

const AllOrders = () => {
  const { data: orders, refetch, isLoading, isError, error } = useGetOrdersQuery();
  const [updateOrder, { isLoading: isUpdating, error: updateError }] = useUpdateOrderMutation();

  const getStatusIcon = (status) => {
    if (status == null || status === undefined) return null;

    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case "completed":
        return <FaCheckCircle className="text-green-500 text-lg mr-2" />;
      case "pending":
        return <FaTimesCircle className="text-yellow-500 text-lg mr-2" />;
      case "processing":
        return <FaTruck className="text-blue-500 text-lg mr-2" />;
      case "shipped":
        return <FaBoxOpen className="text-indigo-500 text-lg mr-2" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500 text-lg mr-2" />;
      default:
        return null;
    }
  };


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder({ id: orderId, status: newStatus }).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <h1 className="text-3xl font-semibold">Loading orders...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <h1 className="text-3xl font-semibold">Error loading orders: {error.message}</h1>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <h1 className="text-3xl font-semibold">No orders found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">All Orders</h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <li key={order._id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order ID: {order._id}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-indigo-600 mb-2">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  {getStatusIcon(order.status)}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="ml-2 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="border-t mt-4 pt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Shipping Details:</p>
                  <p className="text-base text-gray-500">Name: {order.shippingDetails?.name || 'Unknown'}</p>
                  <p className="text-base text-gray-500">Address: {order.shippingDetails?.address || 'Unknown'}</p>
                  <p className="text-base text-gray-500">Mobile: {order.shippingDetails?.mobile || 'Unknown'}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Products</h4>
                <ul className="space-y-2">
                  {order.products.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      {item.productId?.imageUrl && (
                        <img
                          src={item.productId.imageUrl}
                          alt={item.productId.name || "Product"}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold">{item.productId?.name || item.productId?._id || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllOrders;