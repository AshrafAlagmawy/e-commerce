import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosErrorHandler } from 'src/utils';
import { TCategory } from '@customTypes/category';

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  'categories/actGetCategories',
  async (__, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(`/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
