/**
 * @module GroupDescription
 * @description form page component for selecting group description. Also final form page
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader.jsx';

import { updateGroupDescription } from '../../reducers/tripReducer';
import { updateForm } from '../../reducers/formReducer';
import { updateItinerary } from '../../reducers/itineraryReducer';

const GroupDescription = () => {
    // Get applicable state from Redux store
    const { groupDescription } = useSelector((state) => state.trip);
    const formData = useSelector((state) => state.trip);

    // Initialize loading state
    const [loading, setLoading] = useState(false);

    // Needed to update the Redux store
    const dispatch = useDispatch();
    // Needed to navigate to different pathways
    const navigate = useNavigate();

    /* handleDescriptionChange: event handling function
      - handles the group description selected by the user
      - updates the group description state 
    */
    const handleDescriptionChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            dispatch(updateGroupDescription(value));
        };
    };

    /* handleSubmit: asynchoronous event handling function
      - handles the submission of the trip form
      - makes a POST request to the server with updated trip details
      - navigates to itinerary page
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.key === 'Enter' || event.type === 'click') {
            setLoading(true);
            try {
                console.log('data sent to backend server to make API request');
                // Make fetch request with submitted data
                const response = await fetch('/api/itnry/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify(formData)
                });
                const parsedData = await response.json();
                // Check for ok response and redirect to itinerary page
                if (response.ok) {
                    dispatch(updateItinerary(parsedData.itinerary));
                    setLoading(false);
                    navigate('/itinerary'); 
                } else {
                    throw new Error('failed to retrieve data');
                };
            } catch (error) {
                console.error('Error with request:', error);
            };
        };
    };

    /* handlePrevious: event handling function
      - handles updating the form page state to load the previous form page
    */
    const handlePrevious = (e) => {
        e.preventDefault();
        dispatch(updateForm('travelers'));
    };

    return(
        <div>
            <div>{
                loading ? (<div id='loader'><Loader /></div>) : (
                    <>
                    <p>What best describes your travel group...</p>
                    <ul className='groups'>
                        <li className='group-card'>
                            <label>
                                <input type='radio'
                                name='groupDescription'
                                value='Solo traveler'
                                onChange={handleDescriptionChange}
                                checked={groupDescription === 'Solo traveler'}
                                onKeyDown={handleSubmit}
                                />
                                Solo traveler
                            </label>
                        </li>
                        <li className='group-card'>
                            <label>
                                <input type='radio'
                                name='groupDescription'
                                value='Family with young kids'
                                onChange={handleDescriptionChange}
                                checked={groupDescription === 'Family with young kids'}
                                onKeyDown={handleSubmit}
                                />
                                Family (young kids)
                            </label>
                        </li>
                        <li className='group-card'>
                            <label>
                                <input type='radio'
                                name='groupDescription'
                                value='Family of all ages'
                                onChange={handleDescriptionChange}
                                checked={groupDescription === 'Family of all ages'}
                                onKeyDown={handleSubmit}
                                />
                                Family (all ages)
                            </label>
                        </li>
                        <li className='group-card'>
                            <label>
                                <input type='radio'
                                name='groupDescription'
                                value='Family of adults'
                                onChange={handleDescriptionChange}
                                checked={groupDescription === 'Family of adults'}
                                onKeyDown={handleSubmit}
                                />
                                Family (adults)
                            </label>
                        </li>
                        <li className='group-card'>
                            <label>
                                <input type='radio'
                                name='groupDescription'
                                value='Friends'
                                onChange={handleDescriptionChange}
                                checked={groupDescription === 'Friends'}
                                onKeyDown={handleSubmit}
                                />
                                Friends
                            </label>
                        </li>
                    </ul>
                    <div>
                        <button onClick={handlePrevious}>Back</button>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    </>
                )
            }</div>
        </div>
    );
};

export default GroupDescription;