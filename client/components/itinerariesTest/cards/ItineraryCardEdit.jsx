import React, { useState, useEffect } from 'react';

function ItineraryCardEdit({ itinerary, toggleEdit }) {
  const [editableItinerary, setEditableItinerary] = useState(itinerary);

  useEffect(() => {
    setEditableItinerary(itinerary);
  }, [itinerary]);

  const handleInputChange = (field, value) => {
    setEditableItinerary(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here, you would handle the API update or any validation
    toggleEdit(); // Toggle back after saving changes
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
      <div className="flex flex-col justify-start">
        <input
          type="text"
          value={editableItinerary.location_destination}
          onChange={(e) => handleInputChange('location_destination', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={editableItinerary.location_source}
          onChange={(e) => handleInputChange('location_source', e.target.value)}
          className="w-full"
        />
        <input
          type="text"
          value={editableItinerary.user_id}
          onChange={(e) => handleInputChange('user_id', e.target.value)}
          className="w-full"
        />
        <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
        <button onClick={toggleEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ItineraryCardEdit;
