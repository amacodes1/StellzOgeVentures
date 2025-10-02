import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchOrders } from "../../store/slices/orderSlice";
import {
  ShoppingBagIcon,
  UsersIcon,
  PackageIcon,
  DollarSignIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
const AdminOverview: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state: RootState) => state.order);
  const { products } = useSelector((state: RootState) => state.product);
  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);
  // Calculate statistics
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;
  // Demo stats
  const stats = {
    totalOrders: orders.length,
    totalSales,
    totalProducts: products.length,
    totalCustomers: 25,
    orderIncrease: 12.5,
    salesIncrease: 8.3,
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalOrders}</h3>
            </div>
            <div className="bg-emerald-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon className="h-6 w-6 text-emerald-700" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">
              {stats.orderIncrease}%
            </span>
            <span className="text-gray-500 text-sm ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <h3 className="text-2xl font-bold mt-2">
                ${stats.totalSales.toFixed(2)}
              </h3>
            </div>
            <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <DollarSignIcon className="h-6 w-6 text-blue-700" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">
              {stats.salesIncrease}%
            </span>
            <span className="text-gray-500 text-sm ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalProducts}</h3>
            </div>
            <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <PackageIcon className="h-6 w-6 text-purple-700" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">5.2%</span>
            <span className="text-gray-500 text-sm ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats.totalCustomers}
              </h3>
            </div>
            <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-orange-700" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">3.1%</span>
            <span className="text-gray-500 text-sm ml-1">from last month</span>
          </div>
        </div>
      </div>
      {/* Order Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Status Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Pending</p>
                <h4 className="text-xl font-bold text-yellow-800 mt-1">
                  {pendingOrders}
                </h4>
              </div>
              <div className="bg-yellow-200 h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 font-bold">
                  {Math.round(
                    (pendingOrders / Math.max(orders.length, 1)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Processing</p>
                <h4 className="text-xl font-bold text-blue-800 mt-1">
                  {processingOrders}
                </h4>
              </div>
              <div className="bg-blue-200 h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-bold">
                  {Math.round(
                    (processingOrders / Math.max(orders.length, 1)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Shipped</p>
                <h4 className="text-xl font-bold text-purple-800 mt-1">
                  {shippedOrders}
                </h4>
              </div>
              <div className="bg-purple-200 h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-purple-800 font-bold">
                  {Math.round(
                    (shippedOrders / Math.max(orders.length, 1)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Delivered</p>
                <h4 className="text-xl font-bold text-green-800 mt-1">
                  {deliveredOrders}
                </h4>
              </div>
              <div className="bg-green-200 h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-bold">
                  {Math.round(
                    (deliveredOrders / Math.max(orders.length, 1)) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
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
                  Customer
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.billingAddress.name}
                    </div>
                    <div className="text-sm text-gray-500">{order.email}</div>
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
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminOverview;
