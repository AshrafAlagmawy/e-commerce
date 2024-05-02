import { createSlice } from '@reduxjs/toolkit';
import { TLoading, TOrderItem } from '@types';
import actPlaceOrder from './act/actPlaceOrder';
import { isString } from '@types';

interface IOrdersSlice {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrdersSlice = {
  orderList: [],
  loading: 'idle',
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default ordersSlice.reducer;
