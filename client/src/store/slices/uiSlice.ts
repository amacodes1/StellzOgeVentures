import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
}
interface UiState {
  notifications: Notification[];
  modal: ModalState;
  loading: {
    global: boolean;
    [key: string]: boolean;
  };
}
const initialState: UiState = {
  notifications: [],
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  loading: {
    global: false
  }
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications: state => {
      state.notifications = [];
    },
    openModal: (state, action: PayloadAction<{
      type: string;
      data?: any;
    }>) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null
      };
    },
    closeModal: state => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      };
    },
    setLoading: (state, action: PayloadAction<{
      key: string;
      value: boolean;
    }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    }
  }
});
export const {
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  setLoading,
  setGlobalLoading
} = uiSlice.actions;
export default uiSlice.reducer;