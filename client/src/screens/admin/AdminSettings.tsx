import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";
const AdminSettings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "WholesalePro",
    storeEmail: "info@wholesalepro.com",
    storePhone: "+1234567890",
    storeAddress: "123 Business Ave, Lagos, Nigeria",
    currencySymbol: "$",
    taxRate: "7.5",
  });
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@wholesalepro.com",
    smtpPassword: "********",
    senderName: "WholesalePro Notifications",
    senderEmail: "notifications@wholesalepro.com",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderStatusUpdate: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
  });
  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully");
  };
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Email settings saved successfully");
  };
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification settings saved successfully");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">General Settings</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleGeneralSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={generalSettings.storeName}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Email
                </label>
                <input
                  type="email"
                  name="storeEmail"
                  value={generalSettings.storeEmail}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Phone
                </label>
                <input
                  type="text"
                  name="storePhone"
                  value={generalSettings.storePhone}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  name="currencySymbol"
                  value={generalSettings.currencySymbol}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Address
                </label>
                <textarea
                  name="storeAddress"
                  value={generalSettings.storeAddress}
                  onChange={handleGeneralChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="text"
                  name="taxRate"
                  value={generalSettings.taxRate}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" type="submit">
                <SaveIcon className="h-4 w-4 mr-2" /> Save General Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Email Settings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Email Settings</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleEmailSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Server
                </label>
                <input
                  type="text"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Username
                </label>
                <input
                  type="text"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Password
                </label>
                <input
                  type="password"
                  name="smtpPassword"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={emailSettings.senderName}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Email
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  value={emailSettings.senderEmail}
                  onChange={handleEmailChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" type="submit">
                <SaveIcon className="h-4 w-4 mr-2" /> Save Email Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Notification Settings</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleNotificationSubmit}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderConfirmation"
                  name="orderConfirmation"
                  checked={notificationSettings.orderConfirmation}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="orderConfirmation"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Send order confirmation emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderStatusUpdate"
                  name="orderStatusUpdate"
                  checked={notificationSettings.orderStatusUpdate}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="orderStatusUpdate"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Send order status update emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderShipped"
                  name="orderShipped"
                  checked={notificationSettings.orderShipped}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="orderShipped"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Send shipping confirmation emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="orderDelivered"
                  name="orderDelivered"
                  checked={notificationSettings.orderDelivered}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="orderDelivered"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Send delivery confirmation emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lowStockAlert"
                  name="lowStockAlert"
                  checked={notificationSettings.lowStockAlert}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="lowStockAlert"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Send low stock alerts
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" type="submit">
                <SaveIcon className="h-4 w-4 mr-2" /> Save Notification Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;
