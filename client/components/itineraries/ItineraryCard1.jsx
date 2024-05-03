import React from 'react';

function ItineraryCard1({ itinerary }) {
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const renderItineraryDetails = (itineraryDetails) => {

    return Object.entries(itineraryDetails).map(([date, activities]) => (
      <div key={date} className="mb-4">
        <h4 className="text-base font-semibold">{formatDate(date)}</h4>
        {Object.entries(activities).map(([timeOfDay, details]) => (

          <div key={timeOfDay} className="pl-4 text-sm">
            <h5 className="font-semibold">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}:</h5>
            <p>Activity: {details.activity}</p>
            <p>Cost: ${details.cost}</p>
            <p>Address: {details.address}</p>
            <p>Description: {details.description}</p>
          </div>

        ))}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
      
      <div className="flex flex-col justify-start">
        <h3 className="text-base font-semibold text-blue-800">{itinerary.location_destination}</h3> 
        <p>from: {itinerary.location_source}</p>
        <p>User ID: {itinerary.user_id}</p>
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

      <div className="prose col-span-2 flex flex-col justify-start" dangerouslySetInnerHTML={{ __html: itinerary.itinerary_ai_preamble }} />
      

      {/* <div className="prose col-span-2 flex flex-col justify-start">
        {itinerary.itinerary_ai_json && renderItineraryDetails(itinerary.itinerary_ai_json)}
      </div> */}
      
    </div>
  );
}

export default ItineraryCard1;
