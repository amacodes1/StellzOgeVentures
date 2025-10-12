import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
const NotFoundPage: React.FC = () => {
  return <div className="bg-gray-50 min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-8xl font-bold text-emerald-700 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button variant="outline">
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>;
};
export default NotFoundPage;