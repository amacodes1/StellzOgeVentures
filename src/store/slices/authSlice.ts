import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'staff' | 'admin';
}
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: authService.getCurrentUser(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  loading: false,
  error: null
};

// Async thunks
export const login = createAsyncThunk('auth/login', async ({
  email,
  password
}: {
  email: string;
  password: string;
}, {
  rejectWithValue
}) => {
  try {
    const response = await authService.login(email, password);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Login failed');
  }
});
export const register = createAsyncThunk('auth/register', async (userData: {
  name: string;
  email: string;
  password: string;
}, {
  rejectWithValue
}) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Registration failed');
  }
});
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      user: User;
      token: string;
    }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: builder => {
    // Login
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Register
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Logout
    builder.addCase(logoutUser.fulfilled, state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  }
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout
} = authSlice.actions;
export default authSlice.reducer;