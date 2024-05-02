/**
 * @module Activities
 * @description form page component for selecting trip activities
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Activities = () => {
    // Get current activities state from Redux store
    const { activities } = useSelector((state) => state.trip);
    const selected = new Array(...activities);

    // Needed to update the Redux store
    const dispatch = useDispatch();

    /* handleActivitiesChange: event handling function
      - handles the activities selected by the user
      - updates the activities state 
    */
    const handleActitiviesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            selected.push(value);
        } else {
            const index = selected.indexOf(value);
            selected.splice(index, 1);
        }
        dispatch(updateActivities(selected));
    };

    /* handleSubmit: event handling function
      - handles updating the form page state to load the next form page
    */
      const handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            dispatch(updateForm('budget'));
        };
    };

    /* handlePrevious: event handling function
      - handles updating the form page state to load the previous form page
    */
      const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(updateForm('dates'));
    };

    return(
        <div>
            <p>Select activities you are interested in...</p>
            <ul className='activities'>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Hiking'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Hiking')}
                        onKeyDown={handleSubmit}
                        />
                        Hiking
                    </label>
                </li>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Local Events'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Local Events')}
                        onKeyDown={handleSubmit}/>
                        Local Events
                    </label>
                </li>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Restaurants'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Restaurants')}
                        onKeyDown={handleSubmit}/>
                        Restaurants
                    </label>
                </li>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Danger'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Danger')}
                        onKeyDown={handleSubmit}/>
                        Danger
                    </label>
                </li>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Safety'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Safety')}
                        onKeyDown={handleSubmit}/>
                        Safety
                    </label>
                </li>
                <li className='activity-card'>
                    <label>
                        <input type='checkbox'
                        value='Museums'
                        onChange={handleActitiviesChange}
                        checked={activities.includes('Museums')}
                        onKeyDown={handleSubmit}/>
                        Museums
                    </label>
                </li>
            </ul>
            <div>
                <button onClick={handlePrevious}>Back</button>
            </div>
            <div>
                <button onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default Activities;