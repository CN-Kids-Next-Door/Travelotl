import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itineraries: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const itnryStateSlice = createSlice({
  name: 'itnryState',
  initialState,
  reducers: {
    setItineraries(state, action) {
      state.itineraries = action.payload;
    },
  },
});

export const { setItineraries } = itnryStateSlice.actions;
export default itnryStateSlice.reducer;