import { createSlice } from '@reduxjs/toolkit';

let startDate = new Date(Date.now());
let endDate = new Date(Date.now());
endDate.setDate(startDate.getDate() + 3);

const initialState = {
  destination: 'Las Vegas, NV',
  startDate: startDate.toLocaleDateString(),
  endDate: endDate.toLocaleDateString(),
  activities: [],
  budget: 500,
  travelers: 1,
  groupDescription: 'Solo traveler',
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
    updateStartDate(state, action) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action) {
      state.endDate = action.payload;
    },
    updateActivities(state, action) {
      state.activities = action.payload;
    },
    updateBudget(state, action) {
      state.budget = action.payload;
    },
    updateTravelers(state, action) {
      state.travelers = action.payload;
    },
    updateGroupDescription(state, action) {
      state.groupDescription = action.payload;
    },
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = tripSlice;
// Extract and export each action creator by name
export const { updateDestination, updateStartDate, updateEndDate, updateActivities, updateBudget, updateTravelers, updateGroupDescription } = actions;
// Export the reducer as the default export
export default reducer;