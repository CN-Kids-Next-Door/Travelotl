/**
 * @module formReducer
 * @description reducer for form pages: updates the form state
 */

import { createSlice } from "@reduxjs/toolkit";

// Initialize state to first form page (destination)
const initialState = {
    page: 'destination',
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        // Update the form page
        updateForm(state, action) {
            // Assign state the action payload
            state.page = action.payload;
        }
    }
});

// Export the actions and reducer
export const { updateForm } = formSlice.actions;
export default formSlice.reducer