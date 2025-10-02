// Mock authentication service (replace with real API calls in production)
import { User } from '../types';
// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// Mock user database
const mockUsers = [{
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
}, {
  id: '2',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'customer'
}];
export const authService = {
  login: async (email: string, password: string) => {
    await delay(800); // Simulate network delay
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const {
      password: _,
      ...userWithoutPassword
    } = user;
    // Create token (in real app, this would be a JWT from the server)
    const token = btoa(JSON.stringify(userWithoutPassword));
    // Store in localStorage (in real app, handle this more securely)
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return {
      user: userWithoutPassword as User,
      token
    };
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    await delay(800); // Simulate network delay
    // Check if user already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }
    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      ...userData,
      role: 'customer' as const
    };
    // In a real app, this would be saved to a database
    mockUsers.push(newUser);
    const {
      password: _,
      ...userWithoutPassword
    } = newUser;
    // Create token
    const token = btoa(JSON.stringify(userWithoutPassword));
    // Store in localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return {
      user: userWithoutPassword as User,
      token
    };
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },
  getToken: () => {
    return localStorage.getItem('auth_token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};