/**
 * @module itineraryReducer
 * @description reducer for itinerary data: updates the itinerary state
 */

import { createSlice } from "@reduxjs/toolkit";

// Initialize empty state
const initialState = {};

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        // Update the itinerary data
        updateItinerary(state, action) {
            // Assign to 'itinerary' key on state the action payload
            state.itinerary = action.payload;
        }
    }
});

// Export the actions and reducer
export const { updateItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer