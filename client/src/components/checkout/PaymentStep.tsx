import React from 'react';
import Button from '../ui/Button';
import { StepProps } from '../../types/checkout';

const PaymentStep: React.FC<StepProps & { onSubmit: () => void }> = ({ 
  formData, 
  handleChange, 
  prevStep, 
  loading, 
  onSubmit 
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Method</h2>
      <div className="mb-6">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="payment-card"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="payment-card" className="ml-2 flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Credit/Debit Card
                </span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                  <div className="w-8 h-5 bg-red-500 rounded"></div>
                  <div className="w-8 h-5 bg-green-500 rounded"></div>
                </div>
              </label>
            </div>
            {formData.paymentMethod === "card" && (
              <div className="mt-4 pl-6">
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required={formData.paymentMethod === "card"}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required={formData.paymentMethod === "card"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      required={formData.paymentMethod === "card"}
                      placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC *
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      required={formData.paymentMethod === "card"}
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      value={formData.cardCvc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="payment-paystack"
                name="paymentMethod"
                value="paystack"
                checked={formData.paymentMethod === "paystack"}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="payment-paystack" className="ml-2">
                <span className="text-sm font-medium text-gray-700">Paystack</span>
              </label>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="payment-flutterwave"
                name="paymentMethod"
                value="flutterwave"
                checked={formData.paymentMethod === "flutterwave"}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="payment-flutterwave" className="ml-2">
                <span className="text-sm font-medium text-gray-700">Flutterwave</span>
              </label>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="payment-transfer"
                name="paymentMethod"
                value="transfer"
                checked={formData.paymentMethod === "transfer"}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="payment-transfer" className="ml-2">
                <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
              </label>
            </div>
            {formData.paymentMethod === "transfer" && (
              <div className="mt-4 pl-6">
                <p className="text-sm text-gray-600 mb-2">
                  Please make a transfer to the following bank account:
                </p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Bank:</span> First Bank Nigeria
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Name:</span> WholesalePro Ltd
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Number:</span> 1234567890
                  </p>
                  <p className="text-sm mt-2 text-gray-500">
                    Please use your order number as reference.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;