import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrders } from "../store/slices/orderSlice";
import { RootState } from "../store/store";
import Button from "../components/ui/Button";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { orders } = useSelector((state: RootState) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Dashboard</h2>
      <p className="text-gray-600 mb-4">
        Welcome to your account dashboard, {user?.name}. Here you can view your
        recent orders, manage your account details, and more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="border-b pb-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{order.id}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
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
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} • $
                    {order.total.toFixed(2)}
                  </div>
                </div>
              ))}
              {orders.length > 3 && (
                <div className="pt-2">
                  <Link
                    to="/account/orders"
                    className="text-emerald-700 hover:text-emerald-800 text-sm font-medium"
                  >
                    View all orders →
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/shop")}
            >
              Start Shopping
            </Button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Account Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium">Account Type:</span>{" "}
              {user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : ""}
            </p>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <Link to="/account/profile">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
