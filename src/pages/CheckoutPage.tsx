// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { RootState } from "../store/store";
// import { createOrder } from "../store/slices/orderSlice";
// import Button from "../components/ui/Button";
// import {
//   CreditCardIcon,
//   TruckIcon,
//   BuildingIcon,
//   UserIcon,
//   ShieldCheckIcon,
//   CheckCircleIcon,
//   AlertCircleIcon,
// } from "lucide-react";
// import { toast } from "sonner";
// const CheckoutPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     items,
//     subtotal,
//     discount,
//     shipping,
//     // tax,
//     total,
//   } = useSelector((state: RootState) => state.cart);
//   const { loading, error, currentOrder } = useSelector(
//     (state: RootState) => state.order
//   );
//   const { user } = useSelector((state: RootState) => state.auth);
//   const orderId =
//     currentOrder?.id || "#ORD-" + Math.floor(100000 + Math.random() * 900000);
//   // Remove the conditional useSelector from the render tree
//   // const confirmationOrderId = useSelector((state: RootState) => state.order.currentOrder?.id || '#ORD-' + Math.floor(100000 + Math.random() * 900000));
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Customer Info
//     email: user?.email || "",
//     phone: "",
//     // Billing Info
//     billingName: user?.name || "",
//     billingCompany: "",
//     billingAddress: "",
//     billingCity: "",
//     billingState: "",
//     billingZip: "",
//     billingCountry: "Nigeria",
//     // Shipping Info
//     sameAsBilling: true,
//     shippingName: "",
//     shippingCompany: "",
//     shippingAddress: "",
//     shippingCity: "",
//     shippingState: "",
//     shippingZip: "",
//     shippingCountry: "Nigeria",
//     // Payment Info
//     paymentMethod: "card",
//     cardNumber: "",
//     cardName: "",
//     cardExpiry: "",
//     cardCvc: "",
//     // Additional Info
//     orderNotes: "",
//   });
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target as HTMLInputElement;
//     const checked =
//       type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };
//   const nextStep = () => {
//     setStep(step + 1);
//     window.scrollTo(0, 0);
//   };
//   const prevStep = () => {
//     setStep(step - 1);
//     window.scrollTo(0, 0);
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Create shipping address based on whether it's same as billing
//       const shippingAddress = formData.sameAsBilling
//         ? {
//             name: formData.billingName,
//             company: formData.billingCompany,
//             address: formData.billingAddress,
//             city: formData.billingCity,
//             state: formData.billingState,
//             zipCode: formData.billingZip,
//             country: formData.billingCountry,
//             phone: formData.phone,
//           }
//         : {
//             name: formData.shippingName,
//             company: formData.shippingCompany,
//             address: formData.shippingAddress,
//             city: formData.shippingCity,
//             state: formData.shippingState,
//             zipCode: formData.shippingZip,
//             country: formData.shippingCountry,
//             phone: formData.phone,
//           };
//       // Create order data
//       const orderData = {
//         userId: user?.id || "guest",
//         items: items.map((item) => ({
//           id: item.id,
//           productId: item.id,
//           name: item.name,
//           price: item.selectedBulkPrice?.price || item.price,
//           quantity: item.quantity,
//           image: item.image,
//         })),
//         subtotal,
//         discount,
//         shipping,
//         // tax,
//         total,
//         status: "pending" as const,
//         paymentMethod: formData.paymentMethod,
//         paymentStatus: "pending" as const,
//         billingAddress: {
//           name: formData.billingName,
//           company: formData.billingCompany,
//           address: formData.billingAddress,
//           city: formData.billingCity,
//           state: formData.billingState,
//           zipCode: formData.billingZip,
//           country: formData.billingCountry,
//           phone: formData.phone,
//         },
//         shippingAddress,
//         sameAsBilling: formData.sameAsBilling,
//         email: formData.email,
//         phone: formData.phone,
//         orderNotes: formData.orderNotes,
//       };
//       // Dispatch create order action
//       await dispatch(createOrder(orderData) as any);
//       // Show success toast
//       toast.success("Order placed successfully!");
//       // Move to confirmation step
//       setStep(4);
//     } catch (error) {
//       console.error("Order submission error:", error);
//       toast.error("Failed to place order. Please try again.");
//     }
//   };
//   if (items.length === 0) {
//     return (
//       <div className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//           <p className="text-gray-600 mb-8">
//             You need to add items to your cart before proceeding to checkout.
//           </p>
//           <Button variant="primary">
//             <Link to="/shop">Start Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>
//         {/* Checkout Progress */}
//         <div className="mb-8">
//           <div className="flex justify-between">
//             <div
//               className={`flex-1 text-center ${
//                 step >= 1 ? "text-emerald-700" : "text-gray-400"
//               }`}
//             >
//               <div
//                 className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full mb-2 ${
//                   step >= 1
//                     ? "bg-emerald-700 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <UserIcon className="h-4 w-4" />
//               </div>
//               <span className="text-sm">Customer Info</span>
//             </div>
//             <div
//               className={`flex-1 text-center ${
//                 step >= 2 ? "text-emerald-700" : "text-gray-400"
//               }`}
//             >
//               <div
//                 className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full mb-2 ${
//                   step >= 2
//                     ? "bg-emerald-700 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <TruckIcon className="h-4 w-4" />
//               </div>
//               <span className="text-sm">Shipping</span>
//             </div>
//             <div
//               className={`flex-1 text-center ${
//                 step >= 3 ? "text-emerald-700" : "text-gray-400"
//               }`}
//             >
//               <div
//                 className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full mb-2 ${
//                   step >= 3
//                     ? "bg-emerald-700 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <CreditCardIcon className="h-4 w-4" />
//               </div>
//               <span className="text-sm">Payment</span>
//             </div>
//             <div
//               className={`flex-1 text-center ${
//                 step >= 4 ? "text-emerald-700" : "text-gray-400"
//               }`}
//             >
//               <div
//                 className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full mb-2 ${
//                   step >= 4
//                     ? "bg-emerald-700 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <ShieldCheckIcon className="h-4 w-4" />
//               </div>
//               <span className="text-sm">Confirmation</span>
//             </div>
//           </div>
//           <div className="relative mt-2">
//             <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
//             <div
//               className="absolute top-0 h-1 bg-emerald-700 transition-all duration-500"
//               style={{
//                 width: `${(step - 1) * 33.33}%`,
//               }}
//             ></div>
//           </div>
//         </div>
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
//             <AlertCircleIcon className="h-5 w-5 mr-2" />
//             <span>{error}</span>
//           </div>
//         )}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <form onSubmit={handleSubmit}>
//                 {/* Step 1: Customer Information */}
//                 {step === 1 && (
//                   <div>
//                     <h2 className="text-xl font-bold mb-6">
//                       Customer Information
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Email Address *
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.email}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Phone Number *
//                         </label>
//                         <input
//                           type="tel"
//                           id="phone"
//                           name="phone"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.phone}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <h3 className="text-lg font-semibold mb-4">
//                       Billing Address
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <label
//                           htmlFor="billingName"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Full Name *
//                         </label>
//                         <input
//                           type="text"
//                           id="billingName"
//                           name="billingName"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.billingName}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="billingCompany"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Company Name
//                         </label>
//                         <input
//                           type="text"
//                           id="billingCompany"
//                           name="billingCompany"
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.billingCompany}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="mb-6">
//                       <label
//                         htmlFor="billingAddress"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Street Address *
//                       </label>
//                       <input
//                         type="text"
//                         id="billingAddress"
//                         name="billingAddress"
//                         required
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                         value={formData.billingAddress}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                       <div>
//                         <label
//                           htmlFor="billingCity"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           City *
//                         </label>
//                         <input
//                           type="text"
//                           id="billingCity"
//                           name="billingCity"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.billingCity}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="billingState"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           State *
//                         </label>
//                         <input
//                           type="text"
//                           id="billingState"
//                           name="billingState"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.billingState}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="billingZip"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Postal Code *
//                         </label>
//                         <input
//                           type="text"
//                           id="billingZip"
//                           name="billingZip"
//                           required
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                           value={formData.billingZip}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="mb-6">
//                       <label
//                         htmlFor="billingCountry"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Country *
//                       </label>
//                       <select
//                         id="billingCountry"
//                         name="billingCountry"
//                         required
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                         value={formData.billingCountry}
//                         onChange={handleChange}
//                       >
//                         <option value="Nigeria">Nigeria</option>
//                         <option value="Ghana">Ghana</option>
//                         <option value="Kenya">Kenya</option>
//                         <option value="South Africa">South Africa</option>
//                       </select>
//                     </div>
//                     <div className="flex justify-end">
//                       <Button variant="primary" onClick={nextStep}>
//                         Continue to Shipping
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//                 {/* Step 2: Shipping Information */}
//                 {step === 2 && (
//                   <div>
//                     <h2 className="text-xl font-bold mb-6">
//                       Shipping Information
//                     </h2>
//                     <div className="mb-6">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id="sameAsBilling"
//                           name="sameAsBilling"
//                           checked={formData.sameAsBilling}
//                           onChange={handleChange}
//                           className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                         />
//                         <label
//                           htmlFor="sameAsBilling"
//                           className="ml-2 text-sm text-gray-700"
//                         >
//                           Same as billing address
//                         </label>
//                       </div>
//                     </div>
//                     {!formData.sameAsBilling && (
//                       <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                           <div>
//                             <label
//                               htmlFor="shippingName"
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               Full Name *
//                             </label>
//                             <input
//                               type="text"
//                               id="shippingName"
//                               name="shippingName"
//                               required={!formData.sameAsBilling}
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                               value={formData.shippingName}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="shippingCompany"
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               Company Name
//                             </label>
//                             <input
//                               type="text"
//                               id="shippingCompany"
//                               name="shippingCompany"
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                               value={formData.shippingCompany}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="mb-6">
//                           <label
//                             htmlFor="shippingAddress"
//                             className="block text-sm font-medium text-gray-700 mb-1"
//                           >
//                             Street Address *
//                           </label>
//                           <input
//                             type="text"
//                             id="shippingAddress"
//                             name="shippingAddress"
//                             required={!formData.sameAsBilling}
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                             value={formData.shippingAddress}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                           <div>
//                             <label
//                               htmlFor="shippingCity"
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               City *
//                             </label>
//                             <input
//                               type="text"
//                               id="shippingCity"
//                               name="shippingCity"
//                               required={!formData.sameAsBilling}
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                               value={formData.shippingCity}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="shippingState"
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               State *
//                             </label>
//                             <input
//                               type="text"
//                               id="shippingState"
//                               name="shippingState"
//                               required={!formData.sameAsBilling}
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                               value={formData.shippingState}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="shippingZip"
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               Postal Code *
//                             </label>
//                             <input
//                               type="text"
//                               id="shippingZip"
//                               name="shippingZip"
//                               required={!formData.sameAsBilling}
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                               value={formData.shippingZip}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="mb-6">
//                           <label
//                             htmlFor="shippingCountry"
//                             className="block text-sm font-medium text-gray-700 mb-1"
//                           >
//                             Country *
//                           </label>
//                           <select
//                             id="shippingCountry"
//                             name="shippingCountry"
//                             required={!formData.sameAsBilling}
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                             value={formData.shippingCountry}
//                             onChange={handleChange}
//                           >
//                             <option value="Nigeria">Nigeria</option>
//                             <option value="Ghana">Ghana</option>
//                             <option value="Kenya">Kenya</option>
//                             <option value="South Africa">South Africa</option>
//                           </select>
//                         </div>
//                       </>
//                     )}
//                     <div className="mb-6">
//                       <label
//                         htmlFor="orderNotes"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Order Notes (Optional)
//                       </label>
//                       <textarea
//                         id="orderNotes"
//                         name="orderNotes"
//                         rows={4}
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                         placeholder="Special instructions for delivery or packaging"
//                         value={formData.orderNotes}
//                         onChange={handleChange}
//                       ></textarea>
//                     </div>
//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={prevStep}>
//                         Back
//                       </Button>
//                       <Button variant="primary" onClick={nextStep}>
//                         Continue to Payment
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//                 {/* Step 3: Payment */}
//                 {step === 3 && (
//                   <div>
//                     <h2 className="text-xl font-bold mb-6">Payment Method</h2>
//                     <div className="mb-6">
//                       <div className="space-y-4">
//                         <div className="border border-gray-200 rounded-md p-4">
//                           <div className="flex items-center">
//                             <input
//                               type="radio"
//                               id="payment-card"
//                               name="paymentMethod"
//                               value="card"
//                               checked={formData.paymentMethod === "card"}
//                               onChange={handleChange}
//                               className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <label
//                               htmlFor="payment-card"
//                               className="ml-2 flex items-center"
//                             >
//                               <span className="text-sm font-medium text-gray-700 mr-2">
//                                 Credit/Debit Card
//                               </span>
//                               <div className="flex space-x-2">
//                                 <div className="w-8 h-5 bg-blue-600 rounded"></div>
//                                 <div className="w-8 h-5 bg-red-500 rounded"></div>
//                                 <div className="w-8 h-5 bg-green-500 rounded"></div>
//                               </div>
//                             </label>
//                           </div>
//                           {formData.paymentMethod === "card" && (
//                             <div className="mt-4 pl-6">
//                               <div className="mb-4">
//                                 <label
//                                   htmlFor="cardNumber"
//                                   className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                   Card Number *
//                                 </label>
//                                 <input
//                                   type="text"
//                                   id="cardNumber"
//                                   name="cardNumber"
//                                   required={formData.paymentMethod === "card"}
//                                   placeholder="1234 5678 9012 3456"
//                                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                                   value={formData.cardNumber}
//                                   onChange={handleChange}
//                                 />
//                               </div>
//                               <div className="mb-4">
//                                 <label
//                                   htmlFor="cardName"
//                                   className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                   Cardholder Name *
//                                 </label>
//                                 <input
//                                   type="text"
//                                   id="cardName"
//                                   name="cardName"
//                                   required={formData.paymentMethod === "card"}
//                                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                                   value={formData.cardName}
//                                   onChange={handleChange}
//                                 />
//                               </div>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <label
//                                     htmlFor="cardExpiry"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                   >
//                                     Expiry Date *
//                                   </label>
//                                   <input
//                                     type="text"
//                                     id="cardExpiry"
//                                     name="cardExpiry"
//                                     required={formData.paymentMethod === "card"}
//                                     placeholder="MM/YY"
//                                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                                     value={formData.cardExpiry}
//                                     onChange={handleChange}
//                                   />
//                                 </div>
//                                 <div>
//                                   <label
//                                     htmlFor="cardCvc"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                   >
//                                     CVC *
//                                   </label>
//                                   <input
//                                     type="text"
//                                     id="cardCvc"
//                                     name="cardCvc"
//                                     required={formData.paymentMethod === "card"}
//                                     placeholder="123"
//                                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
//                                     value={formData.cardCvc}
//                                     onChange={handleChange}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                         <div className="border border-gray-200 rounded-md p-4">
//                           <div className="flex items-center">
//                             <input
//                               type="radio"
//                               id="payment-paystack"
//                               name="paymentMethod"
//                               value="paystack"
//                               checked={formData.paymentMethod === "paystack"}
//                               onChange={handleChange}
//                               className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <label htmlFor="payment-paystack" className="ml-2">
//                               <span className="text-sm font-medium text-gray-700">
//                                 Paystack
//                               </span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="border border-gray-200 rounded-md p-4">
//                           <div className="flex items-center">
//                             <input
//                               type="radio"
//                               id="payment-flutterwave"
//                               name="paymentMethod"
//                               value="flutterwave"
//                               checked={formData.paymentMethod === "flutterwave"}
//                               onChange={handleChange}
//                               className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <label
//                               htmlFor="payment-flutterwave"
//                               className="ml-2"
//                             >
//                               <span className="text-sm font-medium text-gray-700">
//                                 Flutterwave
//                               </span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="border border-gray-200 rounded-md p-4">
//                           <div className="flex items-center">
//                             <input
//                               type="radio"
//                               id="payment-transfer"
//                               name="paymentMethod"
//                               value="transfer"
//                               checked={formData.paymentMethod === "transfer"}
//                               onChange={handleChange}
//                               className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <label htmlFor="payment-transfer" className="ml-2">
//                               <span className="text-sm font-medium text-gray-700">
//                                 Bank Transfer
//                               </span>
//                             </label>
//                           </div>
//                           {formData.paymentMethod === "transfer" && (
//                             <div className="mt-4 pl-6">
//                               <p className="text-sm text-gray-600 mb-2">
//                                 Please make a transfer to the following bank
//                                 account:
//                               </p>
//                               <div className="bg-gray-50 p-3 rounded-md">
//                                 <p className="text-sm">
//                                   <span className="font-medium">Bank:</span>{" "}
//                                   First Bank Nigeria
//                                 </p>
//                                 <p className="text-sm">
//                                   <span className="font-medium">
//                                     Account Name:
//                                   </span>{" "}
//                                   WholesalePro Ltd
//                                 </p>
//                                 <p className="text-sm">
//                                   <span className="font-medium">
//                                     Account Number:
//                                   </span>{" "}
//                                   1234567890
//                                 </p>
//                                 <p className="text-sm mt-2 text-gray-500">
//                                   Please use your order number as reference.
//                                 </p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={prevStep}>
//                         Back
//                       </Button>
//                       <Button
//                         variant="primary"
//                         type="submit"
//                         disabled={loading}
//                       >
//                         {loading ? "Processing..." : "Place Order"}
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//                 {/* Step 4: Confirmation */}
//                 {step === 4 && (
//                   <div>
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <CheckCircleIcon className="h-10 w-10 text-emerald-700" />
//                       </div>
//                       <h2 className="text-2xl font-bold text-emerald-700 mb-4">
//                         Order Placed Successfully!
//                       </h2>
//                       <p className="text-gray-600 mb-6">
//                         Thank you for your order. We've received your request
//                         and will process it shortly. A confirmation email has
//                         been sent to you.
//                         <br />
//                         Order Number:{" "}
//                         <span className="text-emerald-700">{orderId}</span>
//                       </p>
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                       <Button variant="primary">
//                         <Link to="/account/orders">View Order</Link>
//                       </Button>
//                       <Button variant="outline">
//                         <Link to="/shop">Continue Shopping</Link>
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//           {/* Order Summary */}
//           {step < 4 && (
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold mb-6">Order Summary</h2>
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-700 mb-3">
//                     Items ({items.length})
//                   </h3>
//                   <div className="space-y-4">
//                     {items.map((item) => {
//                       const itemPrice =
//                         item.selectedBulkPrice?.price || item.price;
//                       const itemTotal = itemPrice * item.quantity;
//                       return (
//                         <div key={item.id} className="flex">
//                           <div className="w-16 h-16 flex-shrink-0">
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="w-full h-full object-cover rounded-md"
//                             />
//                           </div>
//                           <div className="ml-4 flex-grow">
//                             <h4 className="text-sm font-medium">{item.name}</h4>
//                             <div className="flex justify-between text-sm text-gray-500">
//                               <span>
//                                 {item.quantity} × ${itemPrice.toFixed(2)}
//                               </span>
//                               <span>${itemTotal.toFixed(2)}</span>
//                             </div>
//                             {item.selectedBulkPrice && (
//                               <span className="text-xs text-green-600">
//                                 Bulk price: {item.selectedBulkPrice.tier}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4 space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-medium">${subtotal.toFixed(2)}</span>
//                   </div>
//                   {discount > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>Discount</span>
//                       <span>-${discount.toFixed(2)}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium">
//                       {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Tax</span>
//                     {/* <span className="font-medium">${tax.toFixed(2)}</span> */}
//                   </div>
//                   <div className="border-t border-gray-200 pt-3 flex justify-between">
//                     <span className="font-bold">Total</span>
//                     <span className="font-bold text-xl">
//                       ${total.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center mb-4">
//                   <BuildingIcon className="h-5 w-5 text-emerald-700 mr-2" />
//                   <h3 className="font-semibold">Business Purchase</h3>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   If this is a business purchase and you need to add your
//                   business tax information, please sign in to your business
//                   account.
//                 </p>
//                 <Link
//                   to="/login"
//                   className="text-emerald-700 hover:text-emerald-800 font-medium text-sm"
//                 >
//                   Sign in to your business account →
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CheckoutPage;


import { useAppSelector } from "../store/hooks";
import OrderSummary from "../components/checkout/OrderSummary";
import CheckoutProgress from "../components/checkout/CheckoutProgress";
import CustomerInfoStep from "../components/checkout/CustomerInfoStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";

export default function CheckoutPage() {
  const { step } = useAppSelector((state) => state.checkout);

  const items = [
    { name: "Product A", price: 5000, qty: 1 },
    { name: "Product B", price: 3000, qty: 2 },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = 500;
  const shipping = 1500;
  const total = subtotal - discount + shipping;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <CheckoutProgress step={step} />

        {step === 1 && <CustomerInfoStep />}
        {step === 2 && <ShippingStep />}
        {step === 3 && <PaymentStep />}
        {step === 4 && <ConfirmationStep />}
      </div>

      <div>
        <OrderSummary
          items={items}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
        />
      </div>
    </div>
  );
}
