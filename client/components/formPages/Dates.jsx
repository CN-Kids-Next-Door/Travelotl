/**
 * @module Dates
 * @description form page component for selecting trip dates
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateStartDate, updateEndDate } from '../../reducers/tripReducer.js';

const Dates = () => {
    // Get current dates state from Redux store
    const { startDate, endDate } = useSelector((state) => state.trip);

    // Needed to update the Redux store
    const dispatch = useDispatch();

    /* handleInputChange: event handling function
      - handles the dates inputted by the user
      - updates the dates state 
    */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            dispatch(updateStartDate(value));
        } else {
            dispatch(updateEndDate(value));
        };
    };

    /* handleSubmit: event handling function
      - handles updating the form page state to load the next form page
    */
      const handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            dispatch(updateForm('activities'));
        };
    };

    /* handlePrevious: event handling function
      - handles updating the form page state to load the previous form page
    */
      const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(updateForm('destination'));
    };

    return(
        <div>
            <div>
                <label>Start Date:</label>
                <input className='typed-input'
                type='date'
                name='startDate'
                value={startDate}
                onChange={handleInputChange}
                onKeyDown={handleSubmit}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input className='typed-input'
                type='date'
                name='endDate'
                value={endDate}
                onChange={handleInputChange}
                onKeyDown={handleSubmit}
                />
            </div>
            <div>
                <button onClick={handlePrevious}>Back</button>
            </div>
            <div>
                <button onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default Dates;