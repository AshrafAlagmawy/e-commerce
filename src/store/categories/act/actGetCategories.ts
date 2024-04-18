import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosErrorHandler } from 'src/utils';
import { TCategory } from '@customTypes/category';

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  'categories/actGetCategories',
  async (__, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(`/categories`, { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
