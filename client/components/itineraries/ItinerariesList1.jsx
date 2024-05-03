import React from 'react';
import { useSelector } from 'react-redux';
import ItineraryCard1 from './ItineraryCard1.jsx';

function ItineraryList1(
  // { itineraries }
) {
  const itineraries = useSelector(state => state.itnryState.itineraries);
  if (!itineraries || itineraries.length === 0) {
    return <div>No itineraries available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4"> 
      {itineraries.map(itinerary => (
        <ItineraryCard1 key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
    </div>

  );
}

export default ItineraryList1;