import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { createOrder } from "../store/slices/orderSlice";
import Button from "../components/ui/Button";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import CheckoutProgress from "../components/checkout/CheckoutProgress";
import CustomerInfoStep from "../components/checkout/CustomerInfoStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";
import OrderSummary from "../components/checkout/OrderSummary";
import { FormData } from "../types/checkout";
const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, subtotal, discount, shipping, total } = useSelector(
    (state: RootState) => state.cart
  );
  const { loading, error, currentOrder } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const orderId =
    currentOrder?.id || "#ORD-" + Math.floor(100000 + Math.random() * 900000);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || "",
    phone: "",
    billingName: user?.name || "",
    billingCompany: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "Nigeria",
    sameAsBilling: true,
    shippingName: "",
    shippingCompany: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "Nigeria",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    orderNotes: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  const submitOrder = async () => {
    try {
      // Create shipping address based on whether it's same as billing
      const shippingAddress = formData.sameAsBilling
        ? {
            name: formData.billingName,
            company: formData.billingCompany,
            address: formData.billingAddress,
            city: formData.billingCity,
            state: formData.billingState,
            zipCode: formData.billingZip,
            country: formData.billingCountry,
            phone: formData.phone,
          }
        : {
            name: formData.shippingName,
            company: formData.shippingCompany,
            address: formData.shippingAddress,
            city: formData.shippingCity,
            state: formData.shippingState,
            zipCode: formData.shippingZip,
            country: formData.shippingCountry,
            phone: formData.phone,
          };
      // Create order data
      const orderData = {
        userId: user?.id || "guest",
        items: items.map((item) => ({
          id: item.id,
          productId: item.id,
          name: item.name,
          price: item.selectedBulkPrice?.price || item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        discount,
        shipping,
        total,
        status: "pending" as const,
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending" as const,
        billingAddress: {
          name: formData.billingName,
          company: formData.billingCompany,
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zipCode: formData.billingZip,
          country: formData.billingCountry,
          phone: formData.phone,
        },
        shippingAddress,
        sameAsBilling: formData.sameAsBilling,
        email: formData.email,
        phone: formData.phone,
        orderNotes: formData.orderNotes,
      };
      // Dispatch create order action
      const result = await dispatch(createOrder(orderData));
      if (createOrder.fulfilled.match(result)) {
        // Show success toast
        toast.success("Order placed successfully!");
        // Move to confirmation step
        setStep(4);
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder();
  };
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Button variant="primary">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <CheckoutProgress step={step} />
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircleIcon className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        {step === 4 ? (
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-lg shadow-md p-8">
                <ConfirmationStep orderId={orderId} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <CustomerInfoStep
                      formData={formData}
                      handleChange={handleChange}
                      nextStep={nextStep}
                      prevStep={prevStep}
                    />
                  )}
                  {step === 2 && (
                    <ShippingStep
                      formData={formData}
                      handleChange={handleChange}
                      nextStep={nextStep}
                      prevStep={prevStep}
                    />
                  )}
                  {step === 3 && (
                    <PaymentStep
                      formData={formData}
                      handleChange={handleChange}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      loading={loading}
                      onSubmit={submitOrder}
                    />
                  )}
                </form>
              </div>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CheckoutPage;



