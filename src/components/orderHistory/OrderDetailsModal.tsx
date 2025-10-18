import React from 'react';
import { XIcon, DownloadIcon, PrinterIcon } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  order: any;
  onClose: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  order,
  onClose,
  onPrint,
  onDownload
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Order Details</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={onDownload}
                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded"
                title="Download Order"
              >
                <DownloadIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onPrint}
                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded"
                title="Print Order"
              >
                <PrinterIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
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
              <p><span className="font-medium">Order ID:</span> {order.id}</p>
              <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "processing"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "shipped"
                    ? "bg-purple-100 text-purple-800"
                    : order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <p>{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
              <p>{order.shippingAddress?.zipCode}</p>
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
                  {order.items?.map((item: any, index: number) => (
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
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between items-center mb-2 text-green-600">
                <span>Discount:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <span>Shipping:</span>
              <span>${order.shipping?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;