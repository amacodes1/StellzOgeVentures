import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const Wishlist = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <HeartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-6">
            Add items to your wishlist to save them for later.
          </p>
          <Button variant="primary">
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
