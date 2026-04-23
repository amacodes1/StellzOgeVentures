import React from 'react';
import {
  TruckIcon,
  ShieldCheckIcon,
  BadgePercentIcon,
  HeadphonesIcon,
} from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose StellzOgeVentures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto bg-primary-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <TruckIcon className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable shipping options to meet your business needs
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto bg-primary-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">
              All products are verified for quality and durability
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto bg-primary-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <BadgePercentIcon className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bulk Discounts</h3>
            <p className="text-gray-600">
              Tiered pricing to maximize your savings on larger orders
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto bg-primary-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <HeadphonesIcon className="h-8 w-8 text-primary-700" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Support</h3>
            <p className="text-gray-600">
              Dedicated account managers for personalized service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;