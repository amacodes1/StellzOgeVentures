import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  fetchOrderById,
  updateOrderStatus,
  Order,
} from "../../store/slices/orderSlice";
import Button from "../ui/Button";
import {
  ArrowLeftIcon,
  DownloadIcon,
  MailIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PackageIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { toast } from "sonner";
import { downloadOrderInvoice } from "../../utils/pdfGenerator";
import { notificationService } from "../../utils/notifications";
interface OrderDetailsProps {
  orderId: string;
  onBack: () => void;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onBack }) => {
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  useEffect(() => {
    dispatch(fetchOrderById(orderId) as any);
  }, [dispatch, orderId]);
  const handleStatusUpdate = async (status: Order["status"]) => {
    try {
      setUpdatingStatus(true);
      await dispatch(
        updateOrderStatus({
          orderId,
          status,
        }) as any
      );
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingStatus(false);
    }
  };
  const handleDownloadInvoice = () => {
    if (currentOrder) {
      downloadOrderInvoice(currentOrder);
      toast.success("Invoice downloaded successfully");
    }
  };
  const handleSendNotification = async () => {
    if (currentOrder && currentOrder.email) {
      try {
        await notificationService.sendOrderStatusUpdate(
          currentOrder,
          currentOrder.email
        );
      } catch (error) {
        toast.error("Failed to send notification");
      }
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={onBack}>
          Go Back
        </Button>
      </div>
    );
  }
  if (!currentOrder) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Order not found</h2>
        <Button variant="outline" onClick={onBack}>
          Go Back
        </Button>
      </div>
    );
  }
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <PackageIcon className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ShoppingBagIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
            title="Go back"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold">Order Details</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadInvoice}>
            <DownloadIcon className="h-4 w-4 mr-2" /> Invoice
          </Button>
          {user?.role === "admin" && (
            <Button variant="outline" onClick={handleSendNotification}>
              <MailIcon className="h-4 w-4 mr-2" /> Send Update
            </Button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                Order #{currentOrder.id}
              </h3>
              <p className="text-gray-500">
                Placed on{" "}
                {new Date(currentOrder.createdAt).toLocaleDateString()} at{" "}
                {new Date(currentOrder.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center">
              {getStatusIcon(currentOrder.status)}
              <span
                className={`ml-2 text-sm font-medium ${
                  currentOrder.status === "pending"
                    ? "text-yellow-700"
                    : currentOrder.status === "processing"
                    ? "text-blue-700"
                    : currentOrder.status === "shipped"
                    ? "text-purple-700"
                    : currentOrder.status === "delivered"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {currentOrder.status.charAt(0).toUpperCase() +
                  currentOrder.status.slice(1)}
              </span>
            </div>
          </div>
          {user?.role === "admin" && (
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-3">Update Order Status</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentOrder.status === "pending" || updatingStatus}
                  onClick={() => handleStatusUpdate("pending")}
                  className={
                    currentOrder.status === "pending"
                      ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                      : ""
                  }
                >
                  Pending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentOrder.status === "processing" || updatingStatus
                  }
                  onClick={() => handleStatusUpdate("processing")}
                  className={
                    currentOrder.status === "processing"
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : ""
                  }
                >
                  Processing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentOrder.status === "shipped" || updatingStatus}
                  onClick={() => handleStatusUpdate("shipped")}
                  className={
                    currentOrder.status === "shipped"
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : ""
                  }
                >
                  Shipped
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentOrder.status === "delivered" || updatingStatus
                  }
                  onClick={() => handleStatusUpdate("delivered")}
                  className={
                    currentOrder.status === "delivered"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : ""
                  }
                >
                  Delivered
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    currentOrder.status === "cancelled" || updatingStatus
                  }
                  onClick={() => handleStatusUpdate("cancelled")}
                  className={
                    currentOrder.status === "cancelled"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : ""
                  }
                >
                  Cancelled
                </Button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-2">Shipping Information</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm">{currentOrder.shippingAddress.name}</p>
                {currentOrder.shippingAddress.company && (
                  <p className="text-sm">
                    {currentOrder.shippingAddress.company}
                  </p>
                )}
                <p className="text-sm">
                  {currentOrder.shippingAddress.address}
                </p>
                <p className="text-sm">
                  {currentOrder.shippingAddress.city},{" "}
                  {currentOrder.shippingAddress.state}{" "}
                  {currentOrder.shippingAddress.zipCode}
                </p>
                <p className="text-sm">
                  {currentOrder.shippingAddress.country}
                </p>
                <p className="text-sm mt-2">
                  Phone: {currentOrder.shippingAddress.phone}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Billing Information</h4>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm">{currentOrder.billingAddress.name}</p>
                {currentOrder.billingAddress.company && (
                  <p className="text-sm">
                    {currentOrder.billingAddress.company}
                  </p>
                )}
                <p className="text-sm">{currentOrder.billingAddress.address}</p>
                <p className="text-sm">
                  {currentOrder.billingAddress.city},{" "}
                  {currentOrder.billingAddress.state}{" "}
                  {currentOrder.billingAddress.zipCode}
                </p>
                <p className="text-sm">{currentOrder.billingAddress.country}</p>
                <p className="text-sm mt-2">
                  Phone: {currentOrder.billingAddress.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="font-medium mb-2">Payment Information</h4>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Payment Method:</span>{" "}
                {currentOrder.paymentMethod.charAt(0).toUpperCase() +
                  currentOrder.paymentMethod.slice(1)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment Status:</span>{" "}
                <span
                  className={
                    currentOrder.paymentStatus === "paid"
                      ? "text-green-600"
                      : currentOrder.paymentStatus === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {currentOrder.paymentStatus.charAt(0).toUpperCase() +
                    currentOrder.paymentStatus.slice(1)}
                </span>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Order Items</h4>
            <div className="space-y-4">
              {currentOrder.items.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src="https://via.placeholder.com/150"
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>
                          {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                        <span>${itemTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${currentOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {currentOrder.shipping > 0
                    ? `$${currentOrder.shipping.toFixed(2)}`
                    : "Free"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${currentOrder.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">
                  ${currentOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {currentOrder.orderNotes && (
            <div className="mt-6 bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2">Order Notes</h4>
              <p className="text-sm text-gray-700">{currentOrder.orderNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
