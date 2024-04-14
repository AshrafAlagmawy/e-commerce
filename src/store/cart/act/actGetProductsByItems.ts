import { TProduct } from '@customTypes/product';
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import axios from 'axios';

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  'cart/actGetProductsByItems',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) return fulfillWithValue([]);

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&');
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return isRejectedWithValue('An Unexpected Error Occurred');
      }
    }
  }
);

export default actGetProductsByItems;
