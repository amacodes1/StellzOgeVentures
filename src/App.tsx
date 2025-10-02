import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ForbiddenPage from "./pages/ForbiddenPage";

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
