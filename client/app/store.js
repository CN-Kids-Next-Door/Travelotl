import { configureStore } from '@reduxjs/toolkit';

// SLICE IMPORTS
import { apiSlice } from './../features/apiSlice.js';
import authStateSlice from './../features/state_authSlice.js'; 
import itnryStateSlice from './../features/state_itnrySlice.js';
import authReducer from './../features/authSlice.js';

// REDUX STORE
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authState: authStateSlice,
    itnryState: itnryStateSlice,
    auth: authStateSlice,


    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})