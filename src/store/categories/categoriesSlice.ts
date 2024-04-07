import { createSlice } from '@reduxjs/toolkit';
import actGetCategories from './act/actGetCategories';

interface ICategoriesState {
  records: { id: number; title: string; prefix: string; img: string }[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });

    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.records = action.payload;
    });

    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  },
});

export { actGetCategories };
export default categoriesSlice.reducer;
