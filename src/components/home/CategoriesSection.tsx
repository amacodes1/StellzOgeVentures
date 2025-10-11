import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  ComputerIcon,
  FileTextIcon,
  ClipboardIcon,
} from 'lucide-react';

const CategoriesSection: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  
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
  );
};

export default CategoriesSection;