import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { login } from "../store/slices/authSlice";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";
import Button from "../components/ui/Button";
import { loginSchema, LoginFormData } from "../schemas/authSchemas";
import { ZodError } from "zod";

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginFormData>>({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name as keyof LoginFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = loginSchema.parse(formData);
      setFormErrors({});
      await dispatch(login(validatedData) as any);
      navigate("/account");
      toast.success("Login successful!");
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Partial<LoginFormData> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };
  // Demo account buttons
  const loginAsCustomer = () => {
    setFormData({
      email: "john@example.com",
      password: "password123",
    });
  };
  const loginAsAdmin = () => {
    setFormData({
      email: "admin@example.com",
      password: "admin123",
    });
  };
  return (
    <div className="max-w-md mx-auto my-14 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login to Your Account
      </h2>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertCircleIcon className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600`}
            required
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600`}
            required
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-emerald-700 hover:text-emerald-800"
          >
            Forgot password?
          </a>
        </div>
        <Button variant="primary" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Register now
            </Link>
          </p>
        </div>
        {/* Demo accounts */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600 mb-3">
            Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={loginAsCustomer}
              className="text-sm py-2 px-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={loginAsAdmin}
              className="text-sm py-2 px-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Admin Demo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
