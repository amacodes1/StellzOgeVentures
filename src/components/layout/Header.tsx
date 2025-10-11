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
  PhoneIcon,
  MailIcon,
  HomeIcon,
  ShoppingBagIcon,
  InfoIcon,
  MessageCircleIcon,
  HelpCircleIcon,
  TruckIcon,
  LifeBuoyIcon,
} from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";

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
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <AnnouncementBar />
      
      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Mobile menu button */}
            <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              <MenuIcon className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Logo */}
            <Link to="/" className="text-base md:text-xl font-bold text-primary-900">
              StellzOgeVentures
            </Link>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button title="search" type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </button>
              </form>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Icon */}
              {/* <button title="search" className="md:hidden" aria-label="Search">
                <SearchIcon className="h-6 w-6 text-gray-700" />
              </button> */}
              
              {/* Cart */}
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-primary-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* User Account or Login/Register */}
              {isAuthenticated ? (
                <Link to="/account">
                  <UserIcon className="h-6 w-6 text-gray-700 hover:text-primary-700" />
                </Link>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/account/login" className="text-sm text-primary-700 hover:text-primary-800 font-medium">
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/account/register" className="text-sm bg-secondary-500 text-white px-3 py-1 rounded-full hover:bg-secondary-600">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </header>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-1" />
                <span>+234 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-4 w-4 mr-1" />
                <span>info@stellzogeventures.com</span>
              </div>
            </div>
            
            {/* Center - Navigation Links */}
            <div className="flex space-x-6">
              <Link to="/" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <HomeIcon className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link to="/shop" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <ShoppingBagIcon className="h-4 w-4 mr-1" />
                Shop
              </Link>
              <Link to="/about" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <InfoIcon className="h-4 w-4 mr-1" />
                About
              </Link>
              <Link to="/contact" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <MessageCircleIcon className="h-4 w-4 mr-1" />
                Contact
              </Link>
              <Link to="/faq" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <HelpCircleIcon className="h-4 w-4 mr-1" />
                FAQ
              </Link>
            </div>
            
            {/* Right - Track Order & Help */}
            <div className="flex space-x-4">
              <Link to="/track-order" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <TruckIcon className="h-4 w-4 mr-1" />
                Track Order
              </Link>
              <Link to="/help" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
                <LifeBuoyIcon className="h-4 w-4 mr-1" />
                Help
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Side Menu */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>
            <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="text-base font-bold text-primary-900">
                    StellzOgeVentures
                  </Link>
                  <button onClick={toggleMenu} aria-label="Close menu">
                    <XIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="text-gray-700 hover:text-primary-700 font-medium py-3 border-b" onClick={toggleMenu}>
                    Home
                  </Link>
                  <Link to="/shop" className="text-gray-700 hover:text-primary-700 font-medium py-3 border-b" onClick={toggleMenu}>
                    Shop
                  </Link>
                  <Link to="/about" className="text-gray-700 hover:text-primary-700 font-medium py-3 border-b" onClick={toggleMenu}>
                    About
                  </Link>
                  <Link to="/contact" className="text-gray-700 hover:text-primary-700 font-medium py-3 border-b" onClick={toggleMenu}>
                    Contact
                  </Link>
                  <Link to="/faq" className="text-gray-700 hover:text-primary-700 font-medium py-3 border-b" onClick={toggleMenu}>
                    FAQ
                  </Link>
                  
                  {!isAuthenticated && (
                    <div className="pt-4 space-y-3">
                      <Link to="/account/login" className="block w-full text-center bg-primary-700 text-white py-3 rounded-lg font-medium" onClick={toggleMenu}>
                        Login
                      </Link>
                      <Link to="/account/register" className="block w-full text-center bg-secondary-500 text-white py-3 rounded-lg font-medium" onClick={toggleMenu}>
                        Register
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </>
        )}
      
      {/* Mobile Search Bar */}
      <div className="md:hidden bg-white border-b px-4 py-2">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button title="search" type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Header;
