import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {},
});

export default authStateSlice.reducer;