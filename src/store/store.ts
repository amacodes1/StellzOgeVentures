import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";
import checkoutReducer from "./slices/checkoutSlice";

// 1. Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
  ui: uiReducer,
  checkout: checkoutReducer,
});

// 2. Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "order"], // choose which slices you want to persist
};

// 3. Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5. Persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
