import React, { useState } from 'react';
import ItineraryCardEdit from '../../itineraries/ItineraryCardEdit.jsx';

function ItineraryCard({ itinerary }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEdit = () => setIsEditMode(!isEditMode);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (isEditMode) {
    return <ItineraryCardEdit itinerary={itinerary} toggleEdit={toggleEdit} />;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
      <div className="flex flex-col justify-start">
        <h3 className="text-base font-semibold text-blue-800">{itinerary.location_destination}</h3>
        <p>from: {itinerary.location_source}</p>
        <p>User ID: {itinerary.user_id}</p>
        <button onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </div>
      <div className="flex flex-col justify-start">
        <p>${itinerary.budget}</p>
        <p>A {itinerary.travelers} person trip</p>
        <p>Itnry ID: {itinerary.itnry_id}</p>
      </div>
      <div className="prose col-span-2 flex flex-col justify-start">
        <p>Travelers: {itinerary.group_description}</p>
        <p>Dates: {formatDate(itinerary.date_start)} to {formatDate(itinerary.date_end)}</p>
      </div>
    </div>
  );
}

export default ItineraryCard;
