export interface FormData {
  email: string;
  phone: string;
  billingName: string;
  billingCompany: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  sameAsBilling: boolean;
  shippingName: string;
  shippingCompany: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
  orderNotes: string;
}

export interface StepProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  loading?: boolean;
}