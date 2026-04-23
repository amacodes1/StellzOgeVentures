import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../services/orderService";
import { notificationService } from "../../utils/notifications";
import { Address } from "../../types/types";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  billingAddress: Address;
  shippingAddress: Address;
  sameAsBilling: boolean;
  email: string;
  phone: string;
  orderNotes?: string;
  createdAt: string;
  updatedAt: string;
}
interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}
const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await orderService.getOrders();
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch orders");
    }
  }
);
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const order = await orderService.getOrderById(orderId);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch order");
    }
  }
);
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const newOrder = await orderService.createOrder(orderData);
      // Send confirmation email
      if (newOrder.email) {
        await notificationService.sendOrderConfirmation(
          newOrder,
          newOrder.email
        );
      }
      return newOrder;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create order");
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (
    {
      orderId,
      status,
    }: {
      orderId: string;
      status: Order["status"];
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        status
      );
      // Send notification about status update
      if (updatedOrder.email) {
        await notificationService.sendOrderStatusUpdate(
          updatedOrder,
          updatedOrder.email
        );
      }
      return updatedOrder;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update order status");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch order by ID
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update order status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const {
  setOrders,
  setCurrentOrder,
  clearCurrentOrder,
  setLoading,
  setError,
} = orderSlice.actions;
export default orderSlice.reducer;
