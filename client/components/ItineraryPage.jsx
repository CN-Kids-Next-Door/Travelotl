/**
 * @module ItineraryPage
 * @description stateful component that renders the itinerary
 */

import React, {useEffect} from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import {
  useGetItinerariesQuery,
  useAddItineraryMutation
} from './../features/itnrySlice.js';
import { setItineraries } from './../features/state_itnrySlice.js';


import Header from './Header.jsx';
import travelVideo from './../assets/AdobeStock_118726863_travel_Preview.mp4'

const ItineraryPage = () => {
  // Grab itinerary state from redux store
  const { data: itineraries, error, isLoading } = useGetItinerariesQuery();
  // const itinerary = useSelector(state => state.itinerary|| {});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Fetching data', itineraries);
    if (itineraries) {
      dispatch(setItineraries(itineraries));
    }
  }, [itineraries, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return(
    <div>
      <div>
      <h1>Itineraries</h1>
      {itineraries?.map(itinerary => (
        <div key={itinerary.id}>{itinerary.name}</div>
      ))}
    </div>
      {/* <div className="min-h-screen flex justify-center items-center">

        <video
            autoPlay
            loop
            muted
            className="absolute min-w-screen min-h-screen"
            style={{height:'105vh', width: '115vw' }}>
            <source
                src={travelVideo}
                type="video/mp4" />
        Your browser does not support the video tag.
        </video>

      </div>
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
      )} */}
    </div>
  );
};

export default ItineraryPage;