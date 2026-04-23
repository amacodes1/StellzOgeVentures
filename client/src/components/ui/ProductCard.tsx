import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import Button from './Button';
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  minOrderQuantity?: number;
  bulkPrices?: {
    tier: string;
    price: number;
  }[];
}
interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showWishlist = false
}) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    price,
    images,
    category,
    stock,
    minOrderQuantity = 1
  } = product;
  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      price,
      quantity: minOrderQuantity,
      image: images[0],
      bulkPrice: product.bulkPrices
    }));
  };
  
  const handleWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log('Added to wishlist:', product.name);
  };
  const inStock = stock > 0;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative">
      {showWishlist && (
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          title="Add to wishlist"
        >
          <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
        </button>
      )}
      <Link to={`/product/${id}`} className="block h-48 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 mb-1">{category}</span>
        <Link
          to={`/product/${id}`}
          className="text-lg font-semibold text-gray-800 mb-2 hover:text-emerald-700"
        >
          {name}
        </Link>
        <div className="mt-auto">
          <div className="mb-3">
            <div>
              <span className="text-lg font-bold text-primary-700">
                ${price.toFixed(2)}
              </span>
              {product.bulkPrices && (
                <span className="text-sm text-gray-500 block">
                  Bulk discounts available
                </span>
              )}
            </div>
          </div>
          {minOrderQuantity > 1 && (
            <p className="text-xs text-gray-500 mb-3">
              Min. Order: {minOrderQuantity} units
            </p>
          )}
          <div className="flex justify-between items-center space-x-2">
            <div>
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white rounded-3xl py-3 flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>

            <div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  inStock
                    ? "bg-secondary-100 text-secondary-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;