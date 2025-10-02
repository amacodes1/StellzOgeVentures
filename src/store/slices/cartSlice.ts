import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  bulkPrice?: {
    tier: string;
    price: number;
  }[];
  selectedBulkPrice?: {
    tier: string;
    price: number;
  };
}
interface CartState {
  items: CartItem[];
  savedCarts: {
    id: string;
    name: string;
    items: CartItem[];
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
const initialState: CartState = {
  items: [],
  savedCarts: [],
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0
};
const calculateTotals = (state: CartState) => {
  state.subtotal = state.items.reduce((sum, item) => {
    const price = item.selectedBulkPrice?.price || item.price;
    return sum + price * item.quantity;
  }, 0);
  state.total = state.subtotal - state.discount + state.shipping;
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{
      id: string;
      quantity: number;
    }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      calculateTotals(state);
    },
    updateBulkPrice: (state, action: PayloadAction<{
      id: string;
      bulkPrice: {
        tier: string;
        price: number;
      };
    }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.selectedBulkPrice = action.payload.bulkPrice;
      }
      calculateTotals(state);
    },
    clearCart: state => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
    saveCart: (state, action: PayloadAction<{
      name: string;
    }>) => {
      state.savedCarts.push({
        id: Date.now().toString(),
        name: action.payload.name,
        items: [...state.items]
      });
    },
    loadSavedCart: (state, action: PayloadAction<string>) => {
      const savedCart = state.savedCarts.find(cart => cart.id === action.payload);
      if (savedCart) {
        state.items = [...savedCart.items];
        calculateTotals(state);
      }
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      calculateTotals(state);
    },
    updateShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
      calculateTotals(state);
    }
  }
});
export const {
  addItem,
  removeItem,
  updateQuantity,
  updateBulkPrice,
  clearCart,
  saveCart,
  loadSavedCart,
  applyDiscount,
  updateShipping
} = cartSlice.actions;
export default cartSlice.reducer;