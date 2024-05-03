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
    // ON GET REQUEST ALL ITINERARIES ARE OVERWRITTEN
    setItineraries(state, action) {
      state.itineraries = action.payload;
    },
    editItinerary(state, action) {
      const index = state.itineraries.findIndex(itn => itn.id === action.payload.id);
      if (index !== -1) {
        state.itineraries[index] = action.payload;
      }
    },
  },
});

export const { setItineraries, updateItinerary } = itnryStateSlice.actions;
export default itnryStateSlice.reducer;