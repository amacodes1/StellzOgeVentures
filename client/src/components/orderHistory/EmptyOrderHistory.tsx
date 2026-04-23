import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';
import Button from '../ui/Button';

const EmptyOrderHistory: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <ShoppingBagIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>
          <Button variant="primary">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrderHistory;