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
  reducers: {
    setAuthInfo(state, action) {
      console.log('Setting Auth Info:', action.payload);
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
  },
});

export const { 
  setAuthInfo,
  setUserInfo, 
  setToken 
} = authStateSlice.actions;

export default authStateSlice.reducer;