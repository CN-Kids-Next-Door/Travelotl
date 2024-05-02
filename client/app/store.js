import { configureStore } from '@reduxjs/toolkit';

// SLICE IMPORTS
import { apiSlice } from './../features/apiSlice.js';
import authStateSlice from './../features/state_authSlice.js'; 
import itnryStateSlice from './../features/state_itnrySlice.js';

// REDUX STORE
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authStateSlice,
    itnry: itnryStateSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})