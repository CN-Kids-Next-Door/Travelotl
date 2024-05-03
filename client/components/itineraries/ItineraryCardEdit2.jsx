import React, { useState } from 'react';

function ItineraryCard({ itinerary }) {
  // Use state to manage input values so they are editable
  const [editableItinerary, setEditableItinerary] = useState(itinerary);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const handleInputChange = (key, value) => {
    setEditableItinerary((prev) => ({ ...prev, [key]: value }));
  };

  const renderItineraryDetails = (itineraryDetails) => {
    return Object.entries(itineraryDetails).map(([date, activities]) => (
      <div key={date} className="mb-4">
        <input
          className="text-base font-semibold w-full"
          value={formatDate(date)}
          readOnly // date is formatted, should not be editable
        />
        {Object.entries(activities).map(([timeOfDay, details]) => (
          <div key={timeOfDay} className="pl-4 text-sm">
            <input
              className="font-semibold w-full"
              value={`${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}:`}
              readOnly // time of day is not typically editable
            />
            <input
              value={details.activity}
              onChange={(e) => handleInputChange('activity', e.target.value)}
              className="w-full"
            />
            <input
              value={`$${details.cost}`}
              onChange={(e) => handleInputChange('cost', e.target.value)}
              className="w-full"
            />
            <input
              value={details.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full"
            />
            <input
              value={details.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full"
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
      <div className="flex flex-col justify-start">
        <input
          type="text"
          value={editableItinerary.location_destination}
          onChange={(e) => handleInputChange('location_destination', e.target.value)}
          className="text-base font-semibold text-blue-800 w-full"
        />
        <input
          type="text"
          value={`from: ${editableItinerary.location_source}`}
          onChange={(e) => handleInputChange('location_source', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={`User ID: ${editableItinerary.user_id}`}
          onChange={(e) => handleInputChange('user_id', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col justify-start">
        <input
          type="text"
          value={`$${editableItinerary.budget}`}
          onChange={(e) => handleInputChange('budget', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={`A ${editableItinerary.travelers} person trip`}
          onChange={(e) => handleInputChange('travelers', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={`Itnry ID: ${editableItinerary.itnry_id}`}
          onChange={(e) => handleInputChange('itnry_id', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="prose col-span-2 flex flex-col justify-start">
        <input
          type="text"
          value={`Travelers: ${editableItinerary.group_description}`}
          onChange={(e) => handleInputChange('group_description', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={`Dates: ${formatDate(editableItinerary.date_start)} to ${formatDate(editableItinerary.date_end)}`}
          onChange={(e) => {
            handleInputChange('date_start', e.target.value.split(' to ')[0]);
            handleInputChange('date_end', e.target.value.split(' to ')[1]);
          }}
          className="w-full"
        />
      </div>

      <div className="prose col-span-2 flex flex-col justify-start">
        <textarea
          value={editableItinerary.itinerary_ai_preamble}
          onChange={(e) => handleInputChange('itinerary_ai_preamble', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Uncomment and adapt if editable JSON structure is needed */}
      {/* <div className="prose col-span-2 flex flex-col justify-start">
        {editableItinerary.itinerary_ai_json && renderItineraryDetails(editableItinerary.itinerary_ai_json)}
      </div> */}
    </div>
  );
}

export default ItineraryCard;
