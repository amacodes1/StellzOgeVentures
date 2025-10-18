import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { CheckCircleIcon } from 'lucide-react';

interface ConfirmationStepProps {
  orderId: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ orderId }) => {
  return (
    <div>
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="h-10 w-10 text-emerald-700" />
        </div>
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your request and will process it shortly. 
          A confirmation email has been sent to you.
          <br />
          Order Number: <span className="text-emerald-700">{orderId}</span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary">
          <Link to="/account/order-history">View Order</Link>
        </Button>
        <Button variant="outline">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;