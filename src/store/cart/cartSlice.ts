import { createSlice } from '@reduxjs/toolkit';
import {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
} from './selectors';
import actGetProductsByItems from './act/actGetProductsByItems';
import { TProduct } from '@customTypes/product';
import { TLoading } from '@customTypes/shared';

interface ICartState {
  items: { [key: string]: number }; // 1:1
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
  actGetProductsByItems,
};
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
