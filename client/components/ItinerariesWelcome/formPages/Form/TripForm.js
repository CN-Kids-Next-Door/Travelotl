// TripForm.jsx
import React, { useState } from 'react';
import LoadingOverlay from './LoadingOverlay.js'; // Adjust the path according to your project structure

const TripForm = ({ onSubmit, loading }) => {
    const [fromLocation, setFromLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [travelers, setTravelers] = useState('');
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState('');
    const [errors, setErrors] = useState({});
    const [itineraryName, setItineraryName] = useState('');

    const groupOptions = ['Solo', 'Family (Kids)', 'Family (All Ages)', 'Family (Adults)', 'Friends'];

    const handleAddActivity = () => {
        if (newActivity.trim() && !activities.includes(newActivity)) {
            setActivities([...activities, newActivity.trim()]);
        }
        setNewActivity('');
    };

    const handleRemoveActivity = (activity) => setActivities(activities.filter(a => a !== activity));

    const dismissError = (field) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validateFields = () => {
        const newErrors = {};
        if (!fromLocation.trim()) newErrors.fromLocation = "From location is required.";
        if (!destination.trim()) newErrors.destination = "Destination is required.";
        if (budget <= 0 || isNaN(budget)) newErrors.budget = "Budget should be a positive, non-zero number.";
        if (!startDate) newErrors.startDate = "Start date is required.";
        if (!endDate || startDate > endDate) newErrors.endDate = "End date should be after the start date.";
        if (travelers <= 0 || isNaN(travelers)) newErrors.travelers = "Number of travelers should be a positive, non-zero number.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            const formData = {
                fromLocation,
                destination,
                budget,
                startDate,
                endDate,
                groupDescription,
                travelers,
                activities
            };
            onSubmit(formData);
        }
    };

    const handleTravelersChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTravelers(value > 0 ? value : '');
    };

    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setBudget(value > 0 ? value : '');
    };

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleActivityInputChange = (e) => setNewActivity(e.target.value);

    return (
        <>
            <LoadingOverlay isVisible={loading} />
            <form onSubmit={handleSubmit}>
                <div className="mb-6 grid grid-cols-2 gap-4">


                <div className="mb-6 grid grid-cols-2 gap-4">
    <div className="col-span-2">
        <label htmlFor="itineraryName" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Itinerary Name:</label>
        <input
            id="itineraryName"
            type="text"
            value={itineraryName}
            onChange={(e) => setItineraryName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            disabled={loading}
        />
    </div>
</div>
                    {/* From and To */}
                    <div>
                        <label htmlFor="fromLocation" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">From:</label>
                        <input
                            id="fromLocation"
                            type="text"
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            className="mt-1 block  font-montserrat w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">To:</label>
                        <input
                            id="destination"
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Start/End Dates */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Start Date:</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 font-montserrat focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">End Date:</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 font-montserrat focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Travelers, Budget, and Group */}
                <div className="mb-6 grid font-montserrat grid-cols-2 gap-4">
                    {/* Travelers and Budget */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Travelers:</label>
                            <div className="flex mt-1">
                                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-200 border font-montserrat border-gray-300 rounded-l-md">#</span>
                                <input
                                    type="number"
                                    value={travelers}
                                    onChange={handleTravelersChange}
                                    className="block w-full border border-gray-300 rounded-r-md shadow-sm font-montserrat focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Budget:</label>
                            <div className="flex mt-1">
                                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-200 border border-gray-300 font-montserrat rounded-l-md">$</span>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={handleBudgetChange}
                                    className="block w-full border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Group */}
                    <div>
                        <label htmlFor="groupDescription" className="block text-sm font-medium font-montserrat text-gray-800 mb-2">Group:</label>
                        <select
                            id="groupDescription"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            className="mt-1 block w-full font-montserrat border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        >
                            <option value="" disabled>Select a group...</option>
                            {groupOptions.map((group, index) => (
                                <option key={index} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Activities */}
                <div className="mb-6 font-montserrat">
                    <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Activities:</label>
                    <div className="flex font-montserrat mb-2">
                        <input
                            type="text"
                            placeholder="Add activity..."
                            value={newActivity}
                            onChange={handleActivityInputChange}
                            className="block w-full border font-montserrat border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={handleAddActivity}
                            className={`ml-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md font-montserrat hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex font-montserrat flex-wrap gap-2">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex font-montserrat items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-1 shadow-sm">
                                <span className="text-sm font-medium font-montserrat text-gray-700">{activity}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveActivity(activity)}
                                    className={`ml-2 text-red-600 font-montserrat hover:text-red-800 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 font-montserrat">
                    <button
                        type="submit"
                        className={`inline-flex justify-center py-3 px-5 border border-transparent shadow-sm font-montserrat text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

                {/* Errors List */}
                <div className="mt-4">
                    {Object.entries(errors).map(([field, errorMsg], index) => (
                        <div key={index} className="flex items-center bg-red-100 border border-red-400  font-montserrat text-red-700 rounded-md px-4 py-2 mb-2">
                            <span className="flex-1">{errorMsg}</span>
                            <button
                                type="button"
                                onClick={() => dismissError(field)}
                                className="ml-2 text-red-600 font-montserrat hover:text-red-800"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
};

export default TripForm;
