import React, { useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  LayoutDashboardIcon,
  ShoppingBagIcon,
  PackageIcon,
  UsersIcon,
  SettingsIcon,
  BarChartIcon,
  LogOutIcon,
} from "lucide-react";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import AdminOverview from "./AdminOverview";
import AdminSettings from "./AdminSettings";
const AdminDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  // If not admin, redirect to home
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-screen sticky top-0">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-emerald-800">Admin Panel</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === "/admin"
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <LayoutDashboardIcon className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === "/admin/orders"
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-3" />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === "/admin/products"
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <PackageIcon className="h-5 w-5 mr-3" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === "/admin/users"
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <UsersIcon className="h-5 w-5 mr-3" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === "/admin/settings"
                      ? "bg-emerald-50 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  to="/"
                  className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100"
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  Back to Store
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
