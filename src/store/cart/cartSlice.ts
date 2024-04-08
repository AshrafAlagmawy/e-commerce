import { TProduct } from '@customTypes/product';
import { createSlice } from '@reduxjs/toolkit';

interface ICartState {
  items: { [key: number]: number }; // 1:1
  productFullInfo: TProduct[];
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
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
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
