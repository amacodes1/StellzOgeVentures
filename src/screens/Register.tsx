import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/slices/authSlice";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";
import Button from "../components/ui/Button";
import { RootState } from "../store/store";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
    terms: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear specific error when field is changed
    if (Object.keys(formErrors).includes(name)) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const validateForm = () => {
    let valid = true;
    const errors = {
      password: "",
      confirmPassword: "",
      terms: "",
    };
    // Password validation
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    // Terms agreement
    if (!formData.agreeTerms) {
      errors.terms = "You must agree to the Terms of Service";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }) as any
      );
      navigate("/account");
      toast.success("Registration successful!");
    } catch (error) {
      // Error is handled in the reducer
    }
  };
  return (
    <div className="max-w-md mx-auto my-14">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full border ${
              formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600`}
            required
          />
          {formErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={`h-4 w-4 text-emerald-600 focus:ring-emerald-500 ${
                formErrors.terms ? "border-red-500" : ""
              }`}
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-emerald-700 hover:text-emerald-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-700 hover:text-emerald-800">
                Privacy Policy
              </a>
            </label>
          </div>
          {formErrors.terms && (
            <p className="mt-1 text-sm text-red-600">{formErrors.terms}</p>
          )}
        </div>
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
