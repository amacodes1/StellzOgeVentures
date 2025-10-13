import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const BulkPricingBanner: React.FC = () => {
  return (
    <section className="bg-secondary-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl text-[#FFF9ED] font-bold mb-4">
          Save More with Bulk Orders
        </h2>
        <p className="text-xl mb-8 font-base max-w-2xl text-[#FFF9ED] mx-auto">
          Enjoy tiered pricing discounts when you order in larger quantities.
          The more you buy, the more you save!
        </p>
        <Button variant="cream" className="px-8 py-3 text-lg font-semibold">
          <Link to="/shop">Explore Bulk Deals</Link>
        </Button>
      </div>
    </section>
  );
};

export default BulkPricingBanner;
