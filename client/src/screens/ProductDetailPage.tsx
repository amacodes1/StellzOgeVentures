import React, { useState, Component } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addItem } from "../store/slices/cartSlice";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import {
  ShoppingCartIcon,
  HeartIcon,
  CheckCircleIcon,
  TruckIcon,
  ShieldIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { toast } from "sonner";
const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product?.minOrderQuantity || 1);
  const [selectedBulkPrice, setSelectedBulkPrice] = useState<{
    tier: string;
    price: number;
  } | null>(null);
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button variant="primary">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  const {
    name,
    description,
    price,
    images,
    category,
    brand,
    stock,
    bulkPrices,
    minOrderQuantity = 1,
  } = product;
  // Find related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== id)
    .slice(0, 4);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minOrderQuantity) {
      setQuantity(value);
      // Update selected bulk price based on quantity
      if (bulkPrices) {
        const newBulkPrice = getBulkPriceForQuantity(value);
        setSelectedBulkPrice(newBulkPrice);
      }
    }
  };
  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // Update selected bulk price based on quantity
    if (bulkPrices) {
      const newBulkPrice = getBulkPriceForQuantity(newQuantity);
      setSelectedBulkPrice(newBulkPrice);
    }
  };
  const decrementQuantity = () => {
    if (quantity > minOrderQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      // Update selected bulk price based on quantity
      if (bulkPrices) {
        const newBulkPrice = getBulkPriceForQuantity(newQuantity);
        setSelectedBulkPrice(newBulkPrice);
      }
    }
  };
  const getBulkPriceForQuantity = (qty: number) => {
    if (!bulkPrices) return null;
    for (let i = bulkPrices.length - 1; i >= 0; i--) {
      const { tier } = bulkPrices[i];
      const range = tier.split("-");
      if (range.length === 2) {
        const [min, max] = range;
        if (qty >= parseInt(min) && qty <= parseInt(max)) {
          return bulkPrices[i];
        }
      } else {
        // For "50+" type tiers
        const min = parseInt(tier.replace("+", ""));
        if (qty >= min) {
          return bulkPrices[i];
        }
      }
    }
    return bulkPrices[0];
  };
  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        price,
        quantity,
        image: images[0],
        bulkPrice: bulkPrices,
        selectedBulkPrice,
      })
    );
    toast.success(
      `Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`
    );
  };
  const currentPrice = selectedBulkPrice ? selectedBulkPrice.price : price;
  const totalPrice = currentPrice * quantity;
  const savings = selectedBulkPrice
    ? (price - selectedBulkPrice.price) * quantity
    : 0;
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-emerald-700">
            Home
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-emerald-700">
            Shop
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(category)}`}
            className="text-gray-500 hover:text-emerald-700"
          >
            {category}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-800">{name}</span>
        </nav>
        {/* Back to Shop */}
        <Link
          to="/shop"
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:col-span-1">
              <div className="mb-4 aspect-square overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={images[selectedImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`cursor-pointer aspect-square rounded-md overflow-hidden border-2 ${
                        selectedImage === idx
                          ? "border-emerald-500"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img
                        src={image}
                        alt={`${name} - view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Product Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-4">
                  Brand: <span className="font-medium">{brand}</span>
                </span>
                <span className="text-gray-600">
                  Category: <span className="font-medium">{category}</span>
                </span>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline mb-1">
                  <span className="text-2xl font-bold text-emerald-700">
                    ${currentPrice.toFixed(2)}
                  </span>
                  {selectedBulkPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${price.toFixed(2)}
                    </span>
                  )}
                  <span className="ml-2 text-sm text-gray-500">per unit</span>
                </div>
                {bulkPrices && (
                  <div className="mt-4 mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Bulk Pricing
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-sm font-medium text-gray-500">
                        Quantity
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        Price Per Unit
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        Discount
                      </div>
                    </div>
                    {bulkPrices.map((bulkPrice, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-3 gap-2 py-2 ${
                          selectedBulkPrice?.tier === bulkPrice.tier
                            ? "bg-emerald-50 rounded-md"
                            : ""
                        }`}
                      >
                        <div className="text-gray-800">{bulkPrice.tier}</div>
                        <div className="text-emerald-700 font-medium">
                          ${bulkPrice.price.toFixed(2)}
                        </div>
                        <div className="text-orange-500">
                          {(((price - bulkPrice.price) / price) * 100).toFixed(
                            0
                          )}
                          % off
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className={`py-2 px-3 rounded-md ${
                    stock > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  } inline-flex items-center`}
                >
                  {stock > 0 ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      In Stock ({stock} available)
                    </>
                  ) : (
                    <>
                      <XIcon className="h-4 w-4 mr-1" />
                      Out of Stock
                    </>
                  )}
                </div>
              </div>
              {/* Quantity Selector */}
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity (Min: {minOrderQuantity})
                </label>
                <div className="flex items-center">
                  <button
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                    onClick={decrementQuantity}
                    disabled={quantity <= minOrderQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    className="w-16 text-center border-y border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={minOrderQuantity}
                  />
                  <button
                    className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Total Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Your Savings:</span>
                    <span className="font-medium">${savings.toFixed(2)}</span>
                  </div>
                )}
              </div>
              {/* Add to Cart & Wishlist */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={stock <= 0}
                  className="flex items-center justify-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 text-emerald-700 mr-2" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <ShieldIcon className="h-5 w-5 text-emerald-700 mr-2" />
                  <span className="text-sm">Quality Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-700 mr-2" />
                  <span className="text-sm">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
          {/* Product Description */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetailPage;
