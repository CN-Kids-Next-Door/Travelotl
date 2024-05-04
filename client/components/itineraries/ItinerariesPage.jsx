/**
 * @module ItineraryPage
 * @description stateful component that renders the itinerary
 */

import React, {useEffect} from 'react';
import { useSelector  } from 'react-redux';
import {
  useGetItinerariesQuery,
  useAddItineraryMutation
} from '../../features/itnrySlice.js';
import ItinerariesList from '../itinerariesTest/cards/ItinerariesList.jsx';

import Header from '../Header.jsx';
import travelVideo from './../../assets/AdobeStock_118726863_travel_Preview.mp4'

const ItinerariesPage = () => {
  const userId = 26; // Example userId, adjust according to your app logic
  const {
    data: itineraries,
    isLoading,
    isError,
    error
  } = useGetItinerariesQuery({ userId }, { skip: !userId });

  // useEffect(() => {
  //   if (!isLoading && !isError && itineraries) {
  //     console.log("Fetched itineraries:", itineraries);
  //     // Perform other actions if needed
  //   }
  // }, [itineraries, isLoading, isError]);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error?.message}</div>;

  return(
    <div>
            <Header />
      <div className="itinerary-page">
        <ItinerariesList itineraries={itineraries} />
      </div>
    </div>
  );
};

export default ItinerariesPage;