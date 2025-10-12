import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/layout/Layout";
import HomePage from "./screens/HomePage";
import ShopPage from "./screens/ShopPage";
import ProductDetailPage from "./screens/ProductDetailPage";
import CartPage from "./screens/CartPage";
import CheckoutPage from "./screens/CheckoutPage";
import AccountPage from "./screens/AccountPage";
import AboutPage from "./screens/AboutPage";
import ContactPage from "./screens/ContactPage";
import FaqPage from "./screens/FaqPage";
import NotFoundPage from "./screens/NotFoundPage";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Orders from "./screens/Orders";
import Wishlist from "./screens/Wishlist";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ForbiddenPage from "./screens/ForbiddenPage";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* Protected account routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account/*" element={<AccountPage />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="wishlist" element={<Wishlist />} />
              </Route>
            </Route>

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
