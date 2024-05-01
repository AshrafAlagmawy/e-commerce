import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosErrorHandler } from '@utils';
import { TProduct } from '@types';
import { RootState } from '@store/index';

type TDataType = 'productsFullInfo' | 'productIds';
type TResponse = TProduct[];

const actGetWishlistItems = createAsyncThunk(
  'wishlist/actGetWishlistItems',
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: 'empty' };
      }

      if (dataType === 'productIds') {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: 'productIds' };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join('&');

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );

        return { data: response.data, dataType: 'productsFullInfo' };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlistItems;
