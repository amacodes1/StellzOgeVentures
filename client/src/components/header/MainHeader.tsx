import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon } from 'lucide-react';

interface MainHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  isMenuOpen,
  toggleMenu,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
          
          <Link to="/" className="text-base md:text-xl font-bold text-primary-900">
            StellzOgeVentures
          </Link>
          
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
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-primary-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
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
  );
};

export default MainHeader;