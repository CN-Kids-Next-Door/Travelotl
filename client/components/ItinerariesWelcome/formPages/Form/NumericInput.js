// NumericInput.js
import React from 'react';

const NumericInput = ({ label, id, value, onChange, error, prefix }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-2">{label}:</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-blue-500 focus-within:border-blue-500 sm:text-sm p-3">
                {prefix && <span className="mr-2">{prefix}</span>}
                <input
                    id={id}
                    type="number"
                    value={value}
                    onChange={onChange}
                    className="block w-full outline-none border-none p-0"
                />
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

export default NumericInput;
