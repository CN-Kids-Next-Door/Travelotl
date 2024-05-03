/**
 * @module ItineraryPage
 * @description stateful component that renders the itinerary
 */

import React from 'react';
import { useSelector } from 'react-redux';

import Header from './Header.jsx';


const ItineraryPage = () => {
    // Grab itinerary state from redux store
    const itinerary = useSelector(state => state.itinerary);

    return(
        <div>
            <Header/>
            <h2>Your Itinerary</h2>
            {(itinerary.itinerary) ? (
                <div id='itinerary-details'>
                    {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
                        <div className='day-entry' key={date}>
                            <h2 className='date'>{date}</h2>
                            <div className='day-details'>
                                {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
                                    <div className='activity-details' key={timeOfDay}>
                                        <h3 className='time-of-day'>{timeOfDay}</h3>
                                        <p>Activity: {suggestion.activity}</p>
                                        <p>Description: {suggestion.description}</p>
                                        <p>Address: {suggestion.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Could not load itinerary!</div>
            )}
        </div>
    );
};

export default ItineraryPage;

//sends post request to server