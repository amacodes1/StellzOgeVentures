import { Order } from '../store/slices/orderSlice';
import { authService } from './authService';
// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// Mock orders database
let mockOrders: Order[] = [];
export const orderService = {
  getOrders: async () => {
    await delay(500);
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    if (user.role === 'admin') {
      return mockOrders;
    } else {
      return mockOrders.filter(order => order.userId === user.id);
    }
  },
  getOrderById: async (orderId: string) => {
    await delay(300);
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');
    if (user.role !== 'admin' && order.userId !== user.id) {
      throw new Error('Unauthorized');
    }
    return order;
  },
  createOrder: async (orderData: Partial<Order>) => {
    await delay(800);
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user.id,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...orderData
    } as Order;
    mockOrders.push(newOrder);
    return newOrder;
  },
  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    await delay(500);
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    if (user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    return mockOrders[orderIndex];
  },
  updatePaymentStatus: async (orderId: string, paymentStatus: Order['paymentStatus']) => {
    await delay(500);
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    if (user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      paymentStatus,
      updatedAt: new Date().toISOString()
    };
    return mockOrders[orderIndex];
  }
};