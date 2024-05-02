import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosErrorHandler from '@utils/axiosErrorHandler';
import { RootState } from '@store/index';

const actPlaceOrder = createAsyncThunk(
  'orders/act/actPlaceOrder',
  async (subTotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const { auth, cart } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id],
    }));

    try {
      const response = await axios.post('/orders', {
        userId: auth.user?.id,
        items: orderItems,
        subTotal,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder;
