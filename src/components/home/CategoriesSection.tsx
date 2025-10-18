import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CoffeeIcon,
  GlassWaterIcon,
  HeartIcon,
  CircleIcon,
  FlameIcon,
  SparklesIcon,
} from 'lucide-react';

const CategoriesSection: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };
  
  const categories = [
    {
      name: "Chocolate",
      icon: <CoffeeIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Chocolate").length,
      color: "bg-amber-100",
    },
    {
      name: "Milk",
      icon: <GlassWaterIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Milk").length,
      color: "bg-blue-100",
    },
    {
      name: "Sweet",
      icon: <HeartIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Sweet").length,
      color: "bg-pink-100",
    },
    {
      name: "Biscuit",
      icon: <CircleIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Biscuit").length,
      color: "bg-orange-100",
    },
    {
      name: "Oil",
      icon: <FlameIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Oil").length,
      color: "bg-yellow-100",
    },
    {
      name: "Sugar",
      icon: <SparklesIcon className="h-8 w-8" />,
      count: products.filter((p) => p.category === "Sugar").length,
      color: "bg-purple-100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-900">
            Shop by Category
          </h2>
          <div className="flex space-x-2">
            {canScrollLeft && (
              <button
                title="left"
                onClick={scrollLeft}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}
            {canScrollRight && (
              <button
                title="right"
                onClick={scrollRight}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
          <div className="flex gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group flex-shrink-0 w-64"
              >
                <div
                  className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 ${category.color} text-white`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-950">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-950 text-base">
                        {category.name}
                      </h3>
                      <p className="text-sm text-blue-950 opacity-80">
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