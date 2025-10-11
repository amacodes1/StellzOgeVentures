import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ProductCard from '../ui/ProductCard';

const RecentProductsSection: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const featuredProducts = products.filter((product) => product.featured);

  return (
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
  );
};

export default RecentProductsSection;