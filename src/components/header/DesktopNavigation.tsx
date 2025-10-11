import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  MailIcon,
  HomeIcon,
  ShoppingBagIcon,
  InfoIcon,
  MessageCircleIcon,
  HelpCircleIcon,
  TruckIcon,
  LifeBuoyIcon,
} from 'lucide-react';

const DesktopNavigation: React.FC = () => {
  return (
    <nav className="hidden md:block bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-1" />
              <span className="hidden lg:inline">+234 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="h-4 w-4 mr-1" />
              <span className="hidden lg:inline">info@stellzogeventures.com</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-3 lg:space-x-6">
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
          
          <div className="flex justify-center space-x-3 lg:space-x-4">
            <Link to="/track-order" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
              <TruckIcon className="h-4 w-4 mr-1" />
              <span className="hidden lg:inline">Track Order</span>
            </Link>
            <Link to="/help" className="flex items-center text-gray-700 hover:text-secondary-500 font-medium">
              <LifeBuoyIcon className="h-4 w-4 mr-1" />
              <span className="hidden lg:inline">Help</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavigation;