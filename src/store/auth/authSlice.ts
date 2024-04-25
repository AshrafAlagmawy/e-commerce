import { createSlice } from '@reduxjs/toolkit';
import actAuthRegister from './act/actAuthRegister';
import { isString, TLoading } from '@types';

interface IAuthState {
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actAuthRegister };

export default authSlice.reducer;
