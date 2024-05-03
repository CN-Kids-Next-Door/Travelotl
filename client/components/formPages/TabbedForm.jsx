import React, { useState } from 'react';
import Activities from './Activities.jsx';
import Budget from './Budget.jsx';
import Dates from './Dates.jsx';
import Destination from './Destination.jsx';
import GroupDescription from './GroupDescription.jsx';
import Travelers from './Travelers.jsx';

const TabbedForm = () => {
    const [activeTab, setActiveTab] = useState('destination');

    return (
        <div className="p-4">
            <div className="flex space-x-4 border-b">
                <button className={`py-2 ${activeTab === 'destination' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('destination')}>Destination</button>
                <button className={`py-2 ${activeTab === 'dates' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('dates')}>Dates</button>
                <button className={`py-2 ${activeTab === 'activities' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('activities')}>Activities</button>
                <button className={`py-2 ${activeTab === 'budget' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('budget')}>Budget</button>
                <button className={`py-2 ${activeTab === 'travelers' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('travelers')}>Travelers</button>
                <button className={`py-2 ${activeTab === 'groupDescription' ? 'border-b-2 border-blue-500' : 'hover:border-b-2 hover:border-gray-300'}`} onClick={() => setActiveTab('groupDescription')}>Group Description</button>
            </div>
            <div className="mt-4">
                {activeTab === 'destination' && <Destination />}
                {activeTab === 'dates' && <Dates />}
                {activeTab === 'activities' && <Activities />}
                {activeTab === 'budget' && <Budget />}
                {activeTab === 'travelers' && <Travelers />}
                {activeTab === 'groupDescription' && <GroupDescription />}
            </div>
        </div>
    );
};

export default TabbedForm;
