/**
 * @module tripReducer
 * @description reducer for trip data: updates the trip state
 */

import { createSlice } from "@reduxjs/toolkit";

//Default the start date to today and end date to 3 days later
let startDate = new Date(Date.now());
let endDate = new Date(Date.now());
endDate.setDate(startDate.getDate() + 3);

// Initialize starting state
const initialState = {
    destination: 'Honolulu, HI',
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    activities: [],
    budget: 700,
    travelers: 1,
    groupDescription: 'Solo traveler'
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        // Each reducer updates a different part of state with the action payload
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

// Export the actions and reducer
export const { 
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateActivities,
    updateBudget,
    updateTravelers,
    updateGroupDescription,
} = tripSlice.actions;
export default tripSlice.reducer