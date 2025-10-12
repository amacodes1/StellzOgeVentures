import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToActionSection: React.FC = () => {
  return (
    <section
      className="py-20 text-primary-900 bg-[#FFF9ED]"
      // style={{ backgroundColor: "rgb(255 249 237)" }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Stock Your Business?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Create an account today to access wholesale pricing, exclusive deals,
          and business-specific features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg">
            <Link to="/account/register">Create Business Account</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/contact">Contact Sales Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;