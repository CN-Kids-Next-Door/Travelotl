/**
 * @module Travelers
 * @description form page component for selecting number of travelers
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';



const Travelers = () => {
    // Get current number of travelers from Redux store
    const { travelers } = useSelector((state) => state.trip);

    // Needed to update the Redux store
    const dispatch = useDispatch();

    /* handleInputChange: event handling function
      - handles the number of travelers inputted by the user
      - updates the travelers state 
    */
    const handleInputChange = (e) => {
        const { value } = e.target;
        dispatch(updateTravelers(value));
    };

    /* handleSubmit: event handling function
      - handles updating the form page state to load the next form page
    */
      const handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            dispatch(updateForm('groupDescription'));
        };
    };

    /* handlePrevious: event handling function
      - handles updating the form page state to load the previous form page
    */
      const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(updateForm('budget'));
    };

    return(
        <div>
            <label>Number of Travelers:</label>
            <input className='typed-input'
            type='number'
            name='travelers'
            value={travelers}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            />
            <div>
                <button onClick={handlePrevious}>Back</button>
            </div>
            <div>
                <button onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default Travelers;