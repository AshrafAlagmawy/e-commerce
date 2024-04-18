import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorHandler } from '@utils';
import axios from 'axios';

const actLikeToggle = createAsyncThunk(
  'wishlist/actLikeToggle',
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: 'remove', id };
      } else {
        axios.post('/wishlist', { userId: '1', productId: id });
        return { type: 'add', id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
