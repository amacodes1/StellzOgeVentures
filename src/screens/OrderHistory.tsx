import { ShoppingBagIcon, XIcon, DownloadIcon, PrinterIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { fetchOrders } from "../store/slices/orderSlice";
import Button from "../components/ui/Button";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state: RootState) => state.order);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);
  
  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    const orderData = {
      orderId: selectedOrder.id,
      date: new Date(selectedOrder.createdAt).toLocaleDateString(),
      status: selectedOrder.status,
      items: selectedOrder.items,
      subtotal: selectedOrder.subtotal,
      discount: selectedOrder.discount,
      shipping: selectedOrder.shipping,
      total: selectedOrder.total,
      shippingAddress: selectedOrder.shippingAddress
    };
    
    const dataStr = JSON.stringify(orderData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${selectedOrder.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
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
                      onClick={() => handleViewDetails(order)}
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
      
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded"
                    title="Download Order"
                  >
                    <DownloadIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded"
                    title="Print Order"
                  >
                    <PrinterIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    title="Close"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Order Information</h4>
                  <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedOrder.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedOrder.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : selectedOrder.status === "shipped"
                        ? "bg-purple-100 text-purple-800"
                        : selectedOrder.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress?.name}</p>
                  <p>{selectedOrder.shippingAddress?.address}</p>
                  <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}</p>
                  <p>{selectedOrder.shippingAddress?.zipCode}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-4">Order Items</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-2">
                            <div className="flex items-center">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-3" />
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span>Shipping:</span>
                  <span>${selectedOrder.shipping?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
