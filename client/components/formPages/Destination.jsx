/**
 * @module Destination
 * @description form page component for selecting destination
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { updateDestination } from '../../reducers/tripReducer';
// import { updateForm } from '../../reducers/formReducer';

const Destination = () => {
    // Get current destination state from Redux store
    const { destination } = useSelector((state) => state.trip);

    // Needed to update the Redux store
    const dispatch = useDispatch();

    /* handleInputChange: event handling function
      - handles the destination inputted by the user
      - updates the destination state 
    */
    const handleInputChange = (e) => {
        const { value } = e.target;
        dispatch(updateDestination(value));
    };

    /* handleSubmit: event handling function
      - handles updating the form page state to load the next form page
    */
      const handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            dispatch(updateForm('dates'));
        };
    };

    return(
        <div>
            <label>Destination:</label>
            <input className='typed-input'
            type='text'
            name='destination'
            value={destination}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            />
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default Destination;