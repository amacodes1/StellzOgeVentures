import React from "react";
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
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  ComputerIcon,
  FileTextIcon,
  ClipboardIcon,
} from "lucide-react";

const HomePage: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const featuredProducts = products.filter((product) => product.featured);
  const categories = [
    {
      name: "Office Furniture",
      icon: <ShoppingBagIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Office Furniture").length,
      color: "bg-blue-600",
    },
    {
      name: "Electronics",
      icon: <ComputerIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Electronics").length,
      color: "bg-purple-600",
    },
    {
      name: "Office Supplies",
      icon: <FileTextIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Office Supplies").length,
      color: "bg-green-600",
    },
    {
      name: "Office Accessories",
      icon: <ClipboardIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Office Accessories").length,
      color: "bg-orange-600",
    },
    {
      name: "Stationery",
      icon: <FileTextIcon className="h-8 w-8" />,
      count: 25,
      color: "bg-pink-600",
    },
    {
      name: "Storage",
      icon: <ShoppingBagIcon className="h-8 w-8" />,
      count: 18,
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
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
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[60vh]">
              <div className="md:col-span-5 text-white">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Wholesale Solutions for Your Business
                </h1>
                <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                  Get premium quality products at competitive wholesale prices.
                  Perfect for retailers, offices, and business needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 text-lg font-semibold">
                    <Link to="/shop">Shop Now</Link>
                  </Button>
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 text-lg font-semibold">
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

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900">
              Shop by Category
            </h2>
            <div className="flex space-x-2">
              <button
                title="left"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                title="right"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 pb-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group flex-shrink-0 w-64 md:w-auto"
                >
                  <div
                    className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 ${category.color} text-white`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-white">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-base">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white opacity-80">
                          {category.count} items
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900">
              Recently Added Products
            </h2>
            <Link
              to="/shop"
              className="text-secondary-600 hover:text-secondary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showWishlist={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Electronics Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900">Electronics</h2>
            <Link
              to="/shop?category=Electronics"
              className="text-secondary-600 hover:text-secondary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === "Electronics")
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showWishlist={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Office Furniture Category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900">
              Office Furniture
            </h2>
            <Link
              to="/shop?category=Office Furniture"
              className="text-secondary-600 hover:text-secondary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === "Office Furniture")
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showWishlist={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Bulk Pricing Banner */}
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

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose WholesalePro
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

      {/* Call to Action */}
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
    </div>
  );
};

export default HomePage;
