import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';
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
}
const ProductCard: React.FC<ProductCardProps> = ({
  product
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
  const inStock = stock > 0;
  return <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link to={`/product/${id}`} className="block h-48 overflow-hidden">
        <img src={images[0]} alt={name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 mb-1">{category}</span>
        <Link to={`/product/${id}`} className="text-lg font-semibold text-gray-800 mb-2 hover:text-emerald-700">
          {name}
        </Link>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-lg font-bold text-emerald-700">
                ${price.toFixed(2)}
              </span>
              {product.bulkPrices && <span className="text-sm text-gray-500 block">
                  Bulk discounts available
                </span>}
            </div>
            <span className={`text-sm ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="primary" fullWidth onClick={handleAddToCart} disabled={!inStock} className="flex items-center justify-center">
              <ShoppingCartIcon className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
          {minOrderQuantity > 1 && <p className="text-xs text-gray-500 mt-2">
              Min. Order: {minOrderQuantity} units
            </p>}
        </div>
      </div>
    </div>;
};
export default ProductCard;