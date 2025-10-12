import { ShoppingBagIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { fetchOrders } from "../store/slices/orderSlice";
import OrderDetails from "../components/orders/OrderDetails";
import Button from "../components/ui/Button";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state: RootState) => state.order);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);
  if (selectedOrderId) {
    return (
      <OrderDetails
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Order History</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <ShoppingBagIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet.
            </p>
            <Button variant="primary">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
