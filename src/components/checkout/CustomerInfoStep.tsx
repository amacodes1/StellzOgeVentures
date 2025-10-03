import React from 'react';
import Button from '../ui/Button';
import { StepProps } from '../../types/checkout';

const CustomerInfoStep: React.FC<StepProps> = ({ formData, handleChange, nextStep }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="billingName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="billingName"
            name="billingName"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.billingName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="billingCompany" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="billingCompany"
            name="billingCompany"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.billingCompany}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address *
        </label>
        <input
          type="text"
          id="billingAddress"
          name="billingAddress"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          value={formData.billingAddress}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.billingCity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            id="billingState"
            name="billingState"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.billingState}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            id="billingZip"
            name="billingZip"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={formData.billingZip}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">
          Country *
        </label>
        <select
          id="billingCountry"
          name="billingCountry"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          value={formData.billingCountry}
          onChange={handleChange}
        >
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
          <option value="South Africa">South Africa</option>
        </select>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" onClick={nextStep}>
          Continue to Shipping
        </Button>
      </div>
    </div>
  );
};

export default CustomerInfoStep;