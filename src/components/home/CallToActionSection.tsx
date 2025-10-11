import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToActionSection: React.FC = () => {
  return (
    <section
      className="py-20 text-primary-900"
      style={{ backgroundColor: "rgb(255 249 237)" }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Stock Your Business?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Create an account today to access wholesale pricing, exclusive
          deals, and business-specific features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 text-lg">
            <Link to="/account/register">Create Business Account</Link>
          </Button>
          <Button className="bg-transparent border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white px-8 py-3 text-lg">
            <Link to="/contact">Contact Sales Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;