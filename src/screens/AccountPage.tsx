import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/slices/authSlice";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  CreditCardIcon,
  LogOutIcon,
  HomeIcon,
} from "lucide-react";
import { toast } from "sonner";

const AccountPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user?.name || "User"}</p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      <HomeIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/order-history"
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/wishlist"
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      <HeartIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/profile"
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      <UserIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Profile
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 rounded-md text-emerald-700 font-medium hover:bg-emerald-50"
                      >
                        <CreditCardIcon className="h-5 w-5 mr-3 text-emerald-700" />
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="pt-4 mt-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left"
                    >
                      <LogOutIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
