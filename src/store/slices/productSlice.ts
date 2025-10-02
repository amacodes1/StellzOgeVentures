import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  bulkPrices?: {
    tier: string;
    price: number;
  }[];
  category: string;
  brand: string;
  images: string[];
  stock: number;
  minOrderQuantity?: number;
  featured?: boolean;
  rating?: number;
  reviews?: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}
interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  brands: string[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    inStock: boolean;
  };
  searchTerm: string;
}
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  brands: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    inStock: false
  },
  searchTerm: ''
};
// Mock products data
const mockProducts: Product[] = [{
  id: '1',
  name: 'Premium Office Chair',
  description: 'Ergonomic office chair with lumbar support and adjustable height.',
  price: 249.99,
  bulkPrices: [{
    tier: '1-9',
    price: 249.99
  }, {
    tier: '10-49',
    price: 224.99
  }, {
    tier: '50+',
    price: 199.99
  }],
  category: 'Office Furniture',
  brand: 'ErgoMax',
  images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1000&auto=format&fit=crop'],
  stock: 120,
  minOrderQuantity: 1,
  featured: true,
  rating: 4.8,
  reviews: [{
    id: 'r1',
    user: 'John D.',
    rating: 5,
    comment: 'Best office chair I have ever used. Great support for long working hours.',
    date: '2023-11-15'
  }, {
    id: 'r2',
    user: 'Sarah M.',
    rating: 4.5,
    comment: 'Very comfortable and easy to assemble. Would recommend.',
    date: '2023-10-28'
  }]
}, {
  id: '2',
  name: 'Executive Desk',
  description: 'Spacious executive desk with drawers and cable management system.',
  price: 599.99,
  bulkPrices: [{
    tier: '1-5',
    price: 599.99
  }, {
    tier: '6-15',
    price: 549.99
  }, {
    tier: '16+',
    price: 499.99
  }],
  category: 'Office Furniture',
  brand: 'OfficePro',
  images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1000&auto=format&fit=crop'],
  stock: 45,
  minOrderQuantity: 1,
  featured: true,
  rating: 4.6
}, {
  id: '3',
  name: 'LED Desk Lamp',
  description: 'Adjustable LED desk lamp with multiple brightness settings and USB charging port.',
  price: 79.99,
  bulkPrices: [{
    tier: '1-19',
    price: 79.99
  }, {
    tier: '20-99',
    price: 69.99
  }, {
    tier: '100+',
    price: 59.99
  }],
  category: 'Office Accessories',
  brand: 'LightPro',
  images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop'],
  stock: 350,
  minOrderQuantity: 5,
  featured: false,
  rating: 4.5
}, {
  id: '4',
  name: 'Wireless Keyboard and Mouse Combo',
  description: 'Premium wireless keyboard and mouse set with long battery life.',
  price: 129.99,
  bulkPrices: [{
    tier: '1-19',
    price: 129.99
  }, {
    tier: '20-99',
    price: 114.99
  }, {
    tier: '100+',
    price: 99.99
  }],
  category: 'Electronics',
  brand: 'TechGear',
  images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1563191911-e65f8655ebf9?q=80&w=1000&auto=format&fit=crop'],
  stock: 280,
  minOrderQuantity: 2,
  featured: true,
  rating: 4.7
}, {
  id: '5',
  name: 'Office Supply Kit',
  description: 'Complete office supply kit with staplers, paper clips, pens, and more.',
  price: 49.99,
  bulkPrices: [{
    tier: '1-9',
    price: 49.99
  }, {
    tier: '10-49',
    price: 44.99
  }, {
    tier: '50+',
    price: 39.99
  }],
  category: 'Office Supplies',
  brand: 'SupplyMaster',
  images: ['https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1000&auto=format&fit=crop'],
  stock: 500,
  minOrderQuantity: 3,
  featured: false,
  rating: 4.3
}, {
  id: '6',
  name: 'Conference Table',
  description: 'Large conference table for team meetings and presentations.',
  price: 1299.99,
  bulkPrices: [{
    tier: '1-2',
    price: 1299.99
  }, {
    tier: '3-5',
    price: 1199.99
  }, {
    tier: '6+',
    price: 1099.99
  }],
  category: 'Office Furniture',
  brand: 'OfficePro',
  images: ['https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1000&auto=format&fit=crop'],
  stock: 25,
  minOrderQuantity: 1,
  featured: true,
  rating: 4.9
}];
const productSlice = createSlice({
  name: 'product',
  initialState: {
    ...initialState,
    products: mockProducts,
    filteredProducts: mockProducts,
    categories: [...new Set(mockProducts.map(p => p.category))],
    brands: [...new Set(mockProducts.map(p => p.brand))]
  },
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.categories = [...new Set(action.payload.map(p => p.category))];
      state.brands = [...new Set(action.payload.map(p => p.brand))];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<{
      key: keyof ProductState['filters'];
      value: any;
    }>) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value
      };
      state.filteredProducts = applyFilters(state.products, state.filters, state.searchTerm);
    },
    clearFilters: state => {
      state.filters = initialState.filters;
      state.filteredProducts = state.products;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters, action.payload);
    }
  }
});
// Helper function to apply filters
const applyFilters = (products: Product[], filters: ProductState['filters'], searchTerm: string) => {
  return products.filter(product => {
    // Apply category filter
    if (filters.category && product.category !== filters.category) return false;
    // Apply brand filter
    if (filters.brand && product.brand !== filters.brand) return false;
    // Apply price range filter
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    // Apply in stock filter
    if (filters.inStock && product.stock <= 0) return false;
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower) || product.category.toLowerCase().includes(searchLower) || product.brand.toLowerCase().includes(searchLower);
    }
    return true;
  });
};
export const {
  setProducts,
  setLoading,
  setError,
  setFilter,
  clearFilters,
  setSearchTerm
} = productSlice.actions;
export default productSlice.reducer;