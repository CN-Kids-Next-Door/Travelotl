import React from 'react';
import Activities from './Activities.jsx';
import Budget from './Budget.jsx';
import Dates from './Dates.jsx';
import Destination from './Destination.jsx';
import GroupDescription from './GroupDescription.jsx';
import Travelers from './Travelers.jsx';

const ScrollForm = () => {
    return (
        <div className="p-4 space-y-8">
            <h2 className="text-xl font-bold text-blue-500">Destination</h2>
            <Destination />
            <h2 className="text-xl font-bold text-blue-500">Dates</h2>
            <Dates />
            <h2 className="text-xl font-bold text-blue-500">Activities</h2>
            <Activities />
            <h2 className="text-xl font-bold text-blue-500">Budget</h2>
            <Budget />
            <h2 className="text-xl font-bold text-blue-500">Travelers</h2>
            <Travelers />
            <h2 className="text-xl font-bold text-blue-500">Group Description</h2>
            <GroupDescription />
        </div>
    );
};

export default ScrollForm;