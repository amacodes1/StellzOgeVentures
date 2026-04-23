import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  removeItem,
  updateQuantity,
  updateBulkPrice,
  clearCart,
  saveCart,
} from "../store/slices/cartSlice";
import Button from "../components/ui/Button";
import {
  TrashIcon,
  SaveIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "lucide-react";
import { toast } from "sonner";
const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, subtotal, discount, shipping, total } = useSelector(
    (state: RootState) => state.cart
  );
  const [saveCartName, setSaveCartName] = useState("");
  const [showSaveCartModal, setShowSaveCartModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
    toast.success("Item removed from cart");
  };
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(
      updateQuantity({
        id,
        quantity,
      })
    );
  };
  const handleUpdateBulkPrice = (
    id: string,
    bulkPrice: {
      tier: string;
      price: number;
    }
  ) => {
    dispatch(
      updateBulkPrice({
        id,
        bulkPrice,
      })
    );
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };
  const handleSaveCart = () => {
    if (saveCartName.trim()) {
      dispatch(
        saveCart({
          name: saveCartName,
        })
      );
      setSaveCartName("");
      setShowSaveCartModal(false);
      toast.success("Cart saved successfully");
    }
  };
  const handleApplyPromoCode = () => {
    // This would normally validate the promo code with an API
    if (promoCode.toUpperCase() === "WELCOME10") {
      // Apply 10% discount
      const discountAmount = subtotal * 0.1;
      dispatch({
        type: "cart/applyDiscount",
        payload: discountAmount,
      });
      toast.success("Promo code applied: 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button variant="primary">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-6">
                  <span className="font-medium text-gray-700">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-700">Price</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-700">Quantity</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-medium text-gray-700">Total</span>
                </div>
              </div>
              {/* Cart Items */}
              {items.map((item) => {
                const itemPrice = item.selectedBulkPrice?.price || item.price;
                const itemTotal = itemPrice * item.quantity;
                return (
                  <div key={item.id} className="p-4 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6">
                        <div className="flex items-center">
                          <div className="w-20 h-20 flex-shrink-0 mr-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">
                              <Link
                                to={`/product/${item.id}`}
                                className="hover:text-emerald-700"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            {item.bulkPrice && (
                              <div className="mt-1">
                                <select
                                  title="Select bulk pricing tier"
                                  className="text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                  value={item.selectedBulkPrice?.tier || ""}
                                  onChange={(e) => {
                                    const selectedTier = e.target.value;
                                    const bulkPrice = item.bulkPrice?.find(
                                      (bp) => bp.tier === selectedTier
                                    );
                                    if (bulkPrice) {
                                      handleUpdateBulkPrice(item.id, bulkPrice);
                                    }
                                  }}
                                >
                                  <option value="">Regular Price</option>
                                  {item.bulkPrice.map((bp, idx) => (
                                    <option key={idx} value={bp.tier}>
                                      {bp.tier} (${bp.price.toFixed(2)} each)
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            <button
                              className="text-sm text-red-600 hover:text-red-800 mt-1 flex items-center"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <TrashIcon className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <div className="md:hidden text-sm text-gray-500 mb-1">
                          Price:
                        </div>
                        <span className="font-medium">
                          ${itemPrice.toFixed(2)}
                        </span>
                        {item.selectedBulkPrice && (
                          <span className="text-sm text-green-600 block">
                            Bulk savings applied
                          </span>
                        )}
                      </div>
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <div className="md:hidden text-sm text-gray-500 mb-1">
                          Quantity:
                        </div>
                        <div className="flex items-center justify-start md:justify-center">
                          <button
                            className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleUpdateQuantity(
                                  item.id,
                                  item.quantity - 1
                                );
                              }
                            }}
                          >
                            -
                          </button>
                          <input
                            title="number"
                            type="number"
                            className="w-12 text-center border-y border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value > 0) {
                                handleUpdateQuantity(item.id, value);
                              }
                            }}
                            min="1"
                          />
                          <button
                            className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-right">
                        <div className="md:hidden text-sm text-gray-500 mb-1">
                          Total:
                        </div>
                        <span className="font-bold">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Cart Actions */}
              <div className="p-4 flex flex-wrap gap-4 justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveCartModal(true)}
                  className="flex items-center"
                >
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex items-center text-red-600 border-red-600 hover:bg-red-500"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping > 0
                      ? `$${shipping.toFixed(2)}`
                      : "Calculated at checkout"}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
              {/* Promo Code */}
              <div className="mb-6">
                <label
                  htmlFor="promo-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo-code"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-md text-gray-700 font-medium"
                    onClick={handleApplyPromoCode}
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Try "WELCOME10" for 10% off
                </p>
              </div>
              {/* Checkout Button */}
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate("/checkout")}
                className="flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              {/* Continue Shopping */}
              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Cart Modal */}
      {showSaveCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Save Your Cart</h3>
            <p className="text-gray-600 mb-4">
              Give your cart a name to save it for later. You can access saved
              carts from your account.
            </p>
            <label
              htmlFor="cart-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cart Name
            </label>
            <input
              type="text"
              id="cart-name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="e.g., Office Supplies"
              value={saveCartName}
              onChange={(e) => setSaveCartName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSaveCartModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveCart}
                disabled={!saveCartName.trim()}
              >
                Save Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
