import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const BulkPricingBanner: React.FC = () => {
  return (
    <section className="bg-secondary-500 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Save More with Bulk Orders
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Enjoy tiered pricing discounts when you order in larger quantities.
          The more you buy, the more you save!
        </p>
        <Button className="bg-white text-secondary-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
          <Link to="/shop">Explore Bulk Deals</Link>
        </Button>
      </div>
    </section>
  );
};

export default BulkPricingBanner;