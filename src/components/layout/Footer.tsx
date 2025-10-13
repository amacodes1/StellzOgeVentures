import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-500 text-[#FFF9ED]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">StellzOgeVentures</h3>
            <p className="mb-4">
              Your trusted partner for wholesale business supplies and
              equipment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white hover:opacity-80">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white hover:opacity-80">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white hover:opacity-80">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white hover:opacity-80">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="hover:text-white hover:opacity-80">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:opacity-80">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white hover:opacity-80"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white hover:opacity-80">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="hover:text-white hover:opacity-80"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?category=Office Furniture"
                  className="hover:text-white hover:opacity-80"
                >
                  Office Furniture
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Office Supplies"
                  className="hover:text-white hover:opacity-80"
                >
                  Office Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Electronics"
                  className="hover:text-white hover:opacity-80"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Office Accessories"
                  className="hover:text-white hover:opacity-80"
                >
                  Office Accessories
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  123 Business Avenue, Industrial Park, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+234 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@stellzogeventures.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-400 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} StellzOgeVentures. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;