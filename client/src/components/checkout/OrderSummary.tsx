import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const OrderSummary: React.FC = () => {
  const { items, subtotal, discount, shipping, total } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Items ({items.length})</h3>
        <div className="space-y-4">
          {items.map((item) => {
            const itemPrice = item.selectedBulkPrice?.price || item.price;
            const itemTotal = itemPrice * item.quantity;
            return (
              <div key={item.id} className="flex">
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {item.quantity} × ${itemPrice.toFixed(2)}
                    </span>
                    <span>${itemTotal.toFixed(2)}</span>
                  </div>
                  {item.selectedBulkPrice && (
                    <span className="text-xs text-green-600">
                      Bulk price: {item.selectedBulkPrice.tier}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;