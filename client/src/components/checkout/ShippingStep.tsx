import React from 'react';
import Button from '../ui/Button';
import { StepProps } from '../../types/checkout';

const ShippingStep: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sameAsBilling"
            name="sameAsBilling"
            checked={formData.sameAsBilling}
            onChange={handleChange}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-700">
            Same as billing address
          </label>
        </div>
      </div>
      {!formData.sameAsBilling && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="shippingName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="shippingName"
                name="shippingName"
                required={!formData.sameAsBilling}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={formData.shippingName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingCompany" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="shippingCompany"
                name="shippingCompany"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={formData.shippingCompany}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              required={!formData.sameAsBilling}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="shippingCity"
                name="shippingCity"
                required={!formData.sameAsBilling}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={formData.shippingCity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingState" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="shippingState"
                name="shippingState"
                required={!formData.sameAsBilling}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={formData.shippingState}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="shippingZip" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                id="shippingZip"
                name="shippingZip"
                required={!formData.sameAsBilling}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={formData.shippingZip}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="shippingCountry" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="shippingCountry"
              name="shippingCountry"
              required={!formData.sameAsBilling}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={formData.shippingCountry}
              onChange={handleChange}
            >
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>
        </>
      )}
      <div className="mb-6">
        <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
          Order Notes (Optional)
        </label>
        <textarea
          id="orderNotes"
          name="orderNotes"
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="Special instructions for delivery or packaging"
          value={formData.orderNotes}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button variant="primary" onClick={nextStep}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShippingStep;