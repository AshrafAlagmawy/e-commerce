import { createSlice } from '@reduxjs/toolkit';
import actLikeToggle from './act/actLikeToggle';
import actGetWishlistItems from './act/actGetWishlistItems';
import { TLoading } from '@customTypes/shared';
import { TProduct } from '@customTypes/product';

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: 'idle',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistProductsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === 'add') {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    // Get Wishlist Items

    builder.addCase(actGetWishlistItems.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetWishlistItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlistItems.rejected, (state, action) => {
      if (action.payload && typeof action.payload === 'string') {
        state.loading = 'failed';
        state.error = action.payload;
      }
    });
  },
});

export { actLikeToggle, actGetWishlistItems };
export const { wishlistProductsFullInfoCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
