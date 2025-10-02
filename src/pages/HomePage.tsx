import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";
import {
  TruckIcon,
  ShieldCheckIcon,
  BadgePercentIcon,
  HeadphonesIcon,
} from "lucide-react";
const HomePage: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const featuredProducts = products.filter((product) => product.featured);
  const categories = [
    {
      name: "Office Furniture",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop",
      count: products.filter((p) => p.category === "Office Furniture").length,
    },
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop",
      count: products.filter((p) => p.category === "Electronics").length,
    },
    {
      name: "Office Supplies",
      image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1000&auto=format&fit=crop",
      count: products.filter((p) => p.category === "Office Supplies").length,
    },
    {
      name: "Office Accessories",
      image:
        "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1000&auto=format&fit=crop",
      count: products.filter((p) => p.category === "Office Accessories").length,
    },
  ];
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Wholesale Solutions for Your Business
              </h1>
              <p className="text-lg mb-8">
                Get premium quality products at competitive wholesale prices.
                Perfect for retailers, offices, and business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg">
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-800"
                >
                  <Link to="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop"
                alt="Wholesale Office Supplies"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/shop"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {/* Bulk Pricing Banner */}
      <section className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Save More with Bulk Orders
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Enjoy tiered pricing discounts when you order in larger quantities.
            The more you buy, the more you save!
          </p>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-500"
          >
            <Link to="/shop">Explore Bulk Deals</Link>
          </Button>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose WholesalePro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <TruckIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping options to meet your business needs
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                All products are verified for quality and durability
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <BadgePercentIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Discounts</h3>
              <p className="text-gray-600">
                Tiered pricing to maximize your savings on larger orders
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <HeadphonesIcon className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Support</h3>
              <p className="text-gray-600">
                Dedicated account managers for personalized service
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Stock Your Business?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create an account today to access wholesale pricing, exclusive
            deals, and business-specific features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Link to="/account/register">Create Business Account</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-800"
              size="lg"
            >
              <Link to="/contact">Contact Sales Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
