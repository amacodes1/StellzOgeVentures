import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { BuildingIcon, UsersIcon, TruckIcon, BadgePercentIcon } from 'lucide-react';
const AboutPage: React.FC = () => {
  return <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About WholesalePro</h1>
            <p className="text-xl mb-8">
              Your trusted partner for wholesale business supplies and equipment
              since 2015.
            </p>
          </div>
        </div>
      </section>
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                WholesalePro was founded in 2015 with a simple mission: to make
                high-quality business supplies accessible to companies of all
                sizes. We recognized that small and medium-sized businesses
                often struggled to access wholesale pricing and quantities that
                were typically reserved for large corporations.
              </p>
              <p className="text-gray-700 mb-4">
                Starting with just a small warehouse and a handful of products,
                we've grown to become one of Nigeria's leading wholesale
                suppliers, serving thousands of businesses across West Africa.
              </p>
              <p className="text-gray-700">
                Our commitment to quality, competitive pricing, and exceptional
                customer service has been the foundation of our growth and
                success.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1542744173-8659d8bde375?q=80&w=1000&auto=format&fit=crop" alt="WholesalePro office" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Our Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-700">
              At WholesalePro, we're guided by a set of core values that define
              how we operate and serve our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <BuildingIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our products, ensuring
                businesses receive only the best.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <BadgePercentIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Value</h3>
              <p className="text-gray-600">
                We provide competitive pricing and bulk discounts to maximize
                your business's purchasing power.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <TruckIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises with consistent, timely service and
                dependable inventory.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <UsersIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Partnership</h3>
              <p className="text-gray-600">
                We view ourselves as partners in your business's success, not
                just as suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-gray-700">
              Our experienced leadership team brings decades of combined
              experience in wholesale, logistics, and business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">
                  Oluwaseun Adebayo
                </h3>
                <p className="text-emerald-700 mb-4">Chief Executive Officer</p>
                <p className="text-gray-600 text-sm">
                  With 15+ years in wholesale distribution, Oluwaseun founded
                  WholesalePro with a vision to transform B2B commerce in
                  Africa.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" alt="COO" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">Amina Ibrahim</h3>
                <p className="text-emerald-700 mb-4">
                  Chief Operations Officer
                </p>
                <p className="text-gray-600 text-sm">
                  Amina oversees our day-to-day operations, ensuring efficient
                  processes from procurement to delivery.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" alt="CTO" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">Chinedu Okonkwo</h3>
                <p className="text-emerald-700 mb-4">
                  Chief Technology Officer
                </p>
                <p className="text-gray-600 text-sm">
                  Chinedu leads our technology initiatives, developing
                  innovative solutions to enhance the wholesale experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Partner with WholesalePro?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust us for their wholesale
            supply needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Link to="/shop">Browse Our Products</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-800" size="lg">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default AboutPage;