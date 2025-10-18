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
  category: 'Chocolate' | 'Milk' | 'Sweet' | 'Biscuit' | 'Oil' | 'Sugar';
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
const mockProducts: Product[] = [
  // Chocolate Products
  {
    id: '1',
    name: 'Bournvita Chocolate Drink',
    description: 'Nutritious chocolate malt drink powder for energy and growth.',
    price: 15.99,
    bulkPrices: [{
      tier: '1-9',
      price: 15.99
    }, {
      tier: '10-49',
      price: 14.99
    }, {
      tier: '50+',
      price: 13.99
    }],
    category: 'Chocolate',
    brand: 'Bournvita',
    images: ['/images/bournvita-chocolate1.webp', '/images/bournvita-chocolate2.webp', '/images/bournvita-chocolate3.webp', '/images/bournvita-chocolate4.png'],
    stock: 120,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Milo Chocolate Malt',
    description: 'Delicious chocolate malt drink with vitamins and minerals.',
    price: 18.99,
    bulkPrices: [{
      tier: '1-9',
      price: 18.99
    }, {
      tier: '10-49',
      price: 17.99
    }, {
      tier: '50+',
      price: 16.99
    }],
    category: 'Chocolate',
    brand: 'Milo',
    images: ['/images/milo-chocolate1.webp', '/images/milo-chocolate2.webp', '/images/milo-chocolate3.webp', '/images/milo-chocolate4.webp', '/images/milo-chocolate5.webp'],
    stock: 85,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Ovaltine Chocolate',
    description: 'Classic chocolate malt beverage for the whole family.',
    price: 16.99,
    category: 'Chocolate',
    brand: 'Ovaltine',
    images: ['/images/ovaltine--chocolate1.webp', '/images/ovaltine-chocolate2.webp', '/images/ovaltine-chocolate3.webp'],
    stock: 95,
    minOrderQuantity: 1,
    featured: false,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Cadbury Chocolate',
    description: 'Premium chocolate bar with rich cocoa flavor.',
    price: 3.99,
    category: 'Chocolate',
    brand: 'Cadbury',
    images: ['/images/cadbury-chocolate.webp'],
    stock: 200,
    minOrderQuantity: 5,
    featured: true,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Cowbell Chocolate Drink',
    description: 'Creamy chocolate flavored milk drink.',
    price: 12.99,
    category: 'Chocolate',
    brand: 'Cowbell',
    images: ['/images/cowbell-chocolate.webp', '/images/cowbell-chocolate2.webp', '/images/cowbell-chocolate3.webp'],
    stock: 150,
    minOrderQuantity: 1,
    featured: false,
    rating: 4.5
  },
  // Milk Products
  {
    id: '6',
    name: 'Peak Milk Powder',
    description: 'Premium quality powdered milk for daily nutrition.',
    price: 25.99,
    bulkPrices: [{
      tier: '1-5',
      price: 25.99
    }, {
      tier: '6-15',
      price: 24.99
    }, {
      tier: '16+',
      price: 23.99
    }],
    category: 'Milk',
    brand: 'Peak',
    images: ['/images/peak-milk1.webp', '/images/peak-milk2.webp', '/images/peak-milk3.webp', '/images/peak-milk4.webp'],
    stock: 75,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.8
  },
  {
    id: '7',
    name: 'Dano Milk',
    description: 'Instant full cream milk powder for the whole family.',
    price: 22.99,
    category: 'Milk',
    brand: 'Dano',
    images: ['/images/dano-milk1.webp', '/images/dano-milk2.webp'],
    stock: 90,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.7
  },
  {
    id: '8',
    name: 'Cowbell Milk',
    description: 'Rich and creamy powdered milk for everyday use.',
    price: 24.99,
    category: 'Milk',
    brand: 'Cowbell',
    images: ['/images/cowbell-milk1.webp', '/images/cowbell-milk2.webp', '/images/cowbell-milk3.webp'],
    stock: 110,
    minOrderQuantity: 1,
    featured: false,
    rating: 4.6
  },
  // Sweet Products
  {
    id: '9',
    name: '3 Crowns Milk',
    description: 'Rich and creamy Milk for everyone.',
    price: 8.99,
    category: 'Milk',
    brand: '3 Crowns',
    images: ['/images/3crowns-sweet1.webp', '/images/3crowns-sweet2.webp', '/images/3crowns-sweet3.webp'],
    stock: 180,
    minOrderQuantity: 2,
    featured: false,
    rating: 4.4
  },
  {
    id: '10',
    name: 'Buttermint Sweet',
    description: 'Classic butter mint candies with smooth texture.',
    price: 6.99,
    category: 'Sweet',
    brand: 'Buttermint',
    images: ['/images/buttermint-sweet1.webp', '/images/buttermint-sweet2.webp'],
    stock: 220,
    minOrderQuantity: 3,
    featured: true,
    rating: 4.5
  },
  {
    id: '11',
    name: 'Splash Sweet',
    description: 'Refreshing fruit-flavored sweets.',
    price: 7.99,
    category: 'Sweet',
    brand: 'Splash',
    images: ['/images/splash-sweet1.webp', '/images/splash-sweet2.webp'],
    stock: 160,
    minOrderQuantity: 2,
    featured: false,
    rating: 4.3
  },
  {
    id: '12',
    name: 'Tom Tom Sweet',
    description: 'Popular menthol sweets for fresh breath.',
    price: 5.99,
    category: 'Sweet',
    brand: 'Tom Tom',
    images: ['/images/tomtom-sweet1.webp', '/images/tomtom-sweet2.webp', '/images/tomtom-sweet3.webp'],
    stock: 250,
    minOrderQuantity: 5,
    featured: true,
    rating: 4.6
  },
  // Biscuit Products
  {
    id: '13',
    name: 'Digestive Biscuits',
    description: 'Wholesome digestive biscuits perfect for tea time.',
    price: 9.99,
    category: 'Biscuit',
    brand: 'Digestive',
    images: ['/images/digestive-buiscuit.webp'],
    stock: 140,
    minOrderQuantity: 2,
    featured: true,
    rating: 4.7
  },
  {
    id: '14',
    name: 'Noreos Biscuits',
    description: 'Crunchy cream-filled sandwich biscuits.',
    price: 11.99,
    category: 'Biscuit',
    brand: 'Noreos',
    images: ['/images/noreos-buiscuit1.webp', '/images/noreos-buiscuit2.webp'],
    stock: 120,
    minOrderQuantity: 2,
    featured: false,
    rating: 4.5
  },
  {
    id: '15',
    name: 'Parle-G Biscuits',
    description: 'Classic glucose biscuits loved by all ages.',
    price: 8.99,
    category: 'Biscuit',
    brand: 'Parle-G',
    images: ['/images/parle-g-buiscuit.webp'],
    stock: 200,
    minOrderQuantity: 3,
    featured: true,
    rating: 4.8
  },
  {
    id: '16',
    name: 'Pure Bliss Biscuits',
    description: 'Premium quality biscuits with natural ingredients.',
    price: 12.99,
    category: 'Biscuit',
    brand: 'Pure Bliss',
    images: ['/images/purebliss-buiscuit.webp'],
    stock: 100,
    minOrderQuantity: 2,
    featured: false,
    rating: 4.6
  },
  // Oil Products
  {
    id: '17',
    name: 'Mamador Cooking Oil',
    description: 'Pure vegetable cooking oil for healthy cooking.',
    price: 35.99,
    bulkPrices: [{
      tier: '1-5',
      price: 35.99
    }, {
      tier: '6-15',
      price: 34.99
    }, {
      tier: '16+',
      price: 33.99
    }],
    category: 'Oil',
    brand: 'Mamador',
    images: ['/images/mamador-oil1.webp', '/images/mamador-oil2.webp', '/images/mamador-oil3.webp'],
    stock: 60,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.7
  },
  {
    id: '18',
    name: 'Power Oil',
    description: 'High-quality cooking oil for all your culinary needs.',
    price: 32.99,
    category: 'Oil',
    brand: 'Power',
    images: ['/images/pwer-oil1.webp', '/images/power-oil2.webp', '/images/power-oil3.webp', '/images/power-oil4.webp'],
    stock: 80,
    minOrderQuantity: 1,
    featured: false,
    rating: 4.5
  },
  // Sugar Products
  {
    id: '19',
    name: 'Dangote Sugar',
    description: 'Premium white granulated sugar for sweetening.',
    price: 28.99,
    bulkPrices: [{
      tier: '1-10',
      price: 28.99
    }, {
      tier: '11-25',
      price: 27.99
    }, {
      tier: '26+',
      price: 26.99
    }],
    category: 'Sugar',
    brand: 'Dangote',
    images: ['/images/dangote-sugar1.webp', '/images/dangote-sugar2.webp'],
    stock: 150,
    minOrderQuantity: 1,
    featured: true,
    rating: 4.8
  },
  {
    id: '20',
    name: 'Louis Sugar',
    description: 'Fine quality sugar for baking and cooking.',
    price: 26.99,
    category: 'Sugar',
    brand: 'Louis',
    images: ['/images/louis-sugar1.webp', '/images/louis-sugar2.webp'],
    stock: 120,
    minOrderQuantity: 1,
    featured: false,
    rating: 4.6
  }
];
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