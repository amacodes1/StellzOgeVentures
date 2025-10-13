import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-primary-900 bg-opacity-75 md:bg-opacity-60"></div>
      </div>
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[60vh]">
            <div className="col-span-2 md:col-span-6 text-[#FFF9ED]">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Wholesale Solutions for Your Business
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                Get premium quality products at competitive wholesale prices.
                Perfect for retailers, offices, and business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="font-semibold">
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button variant="white-outline" size="lg" className="font-semibold">
                  <Link to="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block md:col-span-7">
              {/* This space allows the background image to show through */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;