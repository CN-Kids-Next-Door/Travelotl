import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice.js';
import authSlice from '../features/authSlice.js';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})