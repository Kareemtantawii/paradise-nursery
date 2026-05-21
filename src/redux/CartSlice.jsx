// src/redux/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item: { id, name, price, quantity, image }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // Optionally remove item when quantity reaches 0
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
  },
});

// Export actions
export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Export reducer to be used in store configuration
export default cartSlice.reducer;
