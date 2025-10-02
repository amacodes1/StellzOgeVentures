import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  step: number;
  email: string;
  phone: string;
  billingName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  sameAsBilling: boolean;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  paymentMethod: "card" | "bank" | "";
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const initialState: CheckoutState = {
  step: 1,
  email: "",
  phone: "",
  billingName: "",
  billingAddress: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
  sameAsBilling: false,
  shippingName: "",
  shippingAddress: "",
  shippingCity: "",
  shippingState: "",
  shippingZip: "",
  paymentMethod: "",
  cardNumber: "",
  cardExpiry: "",
  cardCVC: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateField: <K extends keyof CheckoutState>(
      state: CheckoutState,
      action: PayloadAction<{ key: K; value: CheckoutState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    updateMany: (state, action: PayloadAction<Partial<CheckoutState>>) => {
      return { ...state, ...action.payload };
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetCheckout: () => initialState,
  },
});

export const { updateField, updateMany, nextStep, prevStep, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
