/**
 * @module Budget
 * @description form page component for selecting trip budget
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudget } from '../../reducers/tripReducer.js';

const Budget = () => {
    // Get current budget state from Redux store
    const { budget } = useSelector((state) => state.trip);

    // Needed to update the Redux store
    const dispatch = useDispatch();

    /* handleInputChange: event handling function
      - handles the budget inputted by the user
      - updates the budget state 
    */
    const handleInputChange = (e) => {
        const { value } = e.target;
        dispatch(updateBudget(value));
    };

    /* handleSubmit: event handling function
      - handles updating the form page state to load the next form page
    */
      const handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            dispatch(updateForm('travelers'));
        };
    };

    /* handlePrevious: event handling function
      - handles updating the form page state to load the previous form page
    */
      const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(updateForm('activities'));
    };

    return(
        <div>
            <label>Budget:</label>
            <div>$
                <input className='typed-input'
                type='number'
                name='budget'
                value={budget}
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

export default Budget;