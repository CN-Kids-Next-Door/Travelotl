import React, { useState } from 'react';
import LoadingOverlay from './LoadingOverlay.js'; // Adjust the path according to your project structure

const TripForm = ({ onSubmit, loading }) => {
    const initialFormState = {
        fromLocation: '',
        destination: '',
        budget: '',
        startDate: '',
        endDate: '',
        groupDescription: '',
        travelers: '',
        itineraryName: '',
        newActivity: '',
        activities: [],
    };

    const [formState, setFormState] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const groupOptions = ['Solo', 'Family (Kids)', 'Family (All Ages)', 'Family (Adults)', 'Friends'];

    const handleAddActivity = () => {
        const { newActivity, activities } = formState;
        if (newActivity.trim() && !activities.includes(newActivity)) {
            setFormState({ ...formState, activities: [...activities, newActivity.trim()], newActivity: '' });
        }
    };

    const handleRemoveActivity = (activity) => {
        setFormState({ ...formState, activities: formState.activities.filter(a => a !== activity) });
    };

    const dismissError = (field) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validateFields = () => {
        const newErrors = {};
        const { itineraryName, fromLocation, destination, budget, startDate, endDate, travelers } = formState;

        if (!itineraryName.trim()) newErrors.itineraryName = "Itinerary name is required.";
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
            const { itineraryName, fromLocation, destination, budget, startDate, endDate, groupDescription, travelers, activities } = formState;
            onSubmit({ itineraryName, fromLocation, destination, budget, startDate, endDate, groupDescription, travelers, activities });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleTravelersChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setFormState({ ...formState, travelers: value > 0 ? value : '' });
    };

    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setFormState({ ...formState, budget: value > 0 ? value : '' });
    };

    const handleReset = () => {
        setFormState(initialFormState);
        setErrors({});
    };

    return (
        <>
            <LoadingOverlay isVisible={loading} />
            <form onSubmit={handleSubmit}>
                {/* Itinerary Name */}
                <div className="mb-6">
                    <label htmlFor="itineraryName" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Itinerary Name:</label>
                    <input
                        id="itineraryName"
                        name="itineraryName"
                        type="text"
                        value={formState.itineraryName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                        disabled={loading}
                    />
                </div>

                {/* From and To */}
                <div className="mb-6 grid font-montserrat grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fromLocation" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">From:</label>
                        <input
                            id="fromLocation"
                            name="fromLocation"
                            type="text"
                            value={formState.fromLocation}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">To:</label>
                        <input
                            id="destination"
                            name="destination"
                            type="text"
                            value={formState.destination}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 font-montserrat rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Start/End Dates */}
                <div className="mb-6 grid font-montserrat grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Start Date:</label>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formState.startDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">End Date:</label>
                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formState.endDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 font-montserrat focus:border-blue-500 sm:text-sm p-3"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Travelers, Budget, and Group */}
                <div className="mb-6 grid font-montserrat grid-cols-4 gap-4">
                    {/* Travelers - Takes up A (1 out of 4 columns) */}
                    <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Travelers:</label>
                        <div className="flex mt-1">
                            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-200 border border-gray-300 font-montserrat rounded-l-md">#</span>
                            <input
                                name="travelers"
                                type="number"
                                value={formState.travelers}
                                onChange={handleTravelersChange}
                                className="block w-full border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Budget and Group - Takes up 3A (3 out of 4 columns) */}
                    <div className="grid grid-cols-5 font-montserrat gap-4 col-span-3">
                        {/* Budget - 2/5 of 3A */}
                        <div className="col-span-2">
                            <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Budget:</label>
                            <div className="flex mt-1">
                                <span className="inline-flex items-center px-3 font-montserrat text-gray-500 bg-gray-200 border border-gray-300 rounded-l-md">$</span>
                                <input
                                    name="budget"
                                    type="number"
                                    value={formState.budget}
                                    onChange={handleBudgetChange}
                                    className="block w-full border border-gray-300 rounded-r-md shadow-sm font-montserrat focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Group - 3/5 of 3A */}
                        <div className="col-span-3">
                            <label htmlFor="groupDescription" className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Group:</label>
                            <select
                                id="groupDescription"
                                name="groupDescription"
                                value={formState.groupDescription}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 font-montserrat focus:border-blue-500 sm:text-sm p-3"
                                disabled={loading}
                            >
                                <option value="" disabled>Select a group...</option>
                                {groupOptions.map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Activities */}
                <div className="mb-6">
                    <label className="block text-sm font-montserrat font-medium text-gray-800 mb-2">Activities:</label>
                    <div className="flex mb-2">
                        <input
                            name="newActivity"
                            type="text"
                            placeholder="Add activity..."
                            value={formState.newActivity}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-montserrat sm:text-sm p-3"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={handleAddActivity}
                            className={`ml-2 inline-flex justify-center w-32 py-3 px-5 border border-transparent shadow-sm text-sm font-medium font-montserrat rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formState.activities.map((activity, index) => (
                            <div key={index} className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-1 shadow-sm">
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

                {/* Submit and Reset Buttons */}
                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        className={`inline-flex justify-center w-32 py-3 px-5 border border-transparent shadow-sm text-sm font-medium font-montserrat rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex justify-center w-32 py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md font-montserrat text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Reset
                    </button>
                </div>

                {/* Errors List */}
                <div className="mt-4">
                    {Object.entries(errors).map(([field, errorMsg], index) => (
                        <div key={index} className="flex items-center bg-red-100 border border-red-400 text-red-700 rounded-md px-4 py-2 mb-2">
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
