import React from 'react';
import { useSelector } from 'react-redux';
import ItineraryCard from './ItineraryCard.jsx';

function ItineraryList(
  // { itineraries }
) {
  const itineraries = useSelector(state => state.itnryState.itineraries);
  if (!itineraries || itineraries.length === 0) {
    return <div>No itineraries available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4"> 
      {itineraries.map(itinerary => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
    </div>

  );
}

export default ItineraryList;