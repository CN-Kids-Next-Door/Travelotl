import { configureStore } from '@reduxjs/toolkit';

// SLICE IMPORTS
import { apiSlice } from './../features/apiSlice.js';
import authStateSlice from './../features/state_authSlice.js'; 
import itnryStateSlice from './../features/state_itnrySlice.js';
import { injectUserIdMiddleware, apiCallLogMiddleware } from './middleware';

// OLD IMPORTS
import tripReducer from './../reducers/tripReducer.js';
import itineraryReducer from './../reducers/itineraryReducer.js';


// REDUX STORE
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authState: authStateSlice,
    itnryState: itnryStateSlice,
    trip: tripReducer,
    itinerary: itineraryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat( apiSlice.middleware )
        .concat( injectUserIdMiddleware )
        .concat( apiCallLogMiddleware ),
})