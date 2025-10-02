import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-emerald-800">
            WholesalePro
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-700">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-emerald-700">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-700">
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-emerald-700"
            >
              Contact
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-emerald-700">
              FAQ
            </Link>
          </nav>
          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </button>
            </form>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-emerald-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/account" : "/account/login"}>
              <UserIcon className="h-6 w-6 text-gray-700 hover:text-emerald-700" />
            </Link>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-700"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-emerald-700"
                onClick={toggleMenu}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-700"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-emerald-700"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-emerald-700"
                onClick={toggleMenu}
              >
                FAQ
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link
                  to="/cart"
                  className="relative flex items-center"
                  onClick={toggleMenu}
                >
                  <ShoppingCartIcon className="h-5 w-5 text-gray-700 mr-2" />
                  <span>Cart ({totalItems})</span>
                </Link>
                <Link
                  to={isAuthenticated ? "/account" : "/account/login"}
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <UserIcon className="h-5 w-5 text-gray-700 mr-2" />
                  <span>{isAuthenticated ? "Account" : "Login"}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
