import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { XIcon } from 'lucide-react';

interface MobileSideMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileSideMenu: React.FC<MobileSideMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isMenuOpen) return null;

  return (
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
  );
};

export default MobileSideMenu;