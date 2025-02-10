import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../../features/api/orderApi";

const UserOrder = () => {
  const { data: orders, isLoading, isError, error } = useGetUserOrdersQuery();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>You are not logged in. Please log in to see your orders.</div>;
  }

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return <div>Error loading orders: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  // Filter orders to show only those belonging to the current user
  const userOrders = orders.filter(order => order.userId === user._id);

  if (userOrders.length === 0) {
    return <div className="mt-36 flex items-center justify-center text-2xl font-bold">No orders found for this user.</div>;
  }

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <ul className="space-y-4">
        {userOrders.map((order) => (
          <li key={order._id} className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <ul className="list-disc pl-5 mt-2">
              {order.products.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  {item.productId?.imageUrl && (
                    <img
                      src={item.productId?.imageUrl}
                      alt={item.productId.productName || "Product"}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-base font-bold">{item.productId.productName || item.productId._id}</p>
                    <p>Quantity: <span className="text-base font-bold">{item.quantity} </span></p>

                    <p className="text-base font-bold">Total: ${order.totalPrice.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrder;