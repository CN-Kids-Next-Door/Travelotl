// Modal.js
import React from 'react';

const Modal = ({ isOpen, toggleModal, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white max-w-lg w-full rounded-lg shadow-lg">
                <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    X
                </button>
                <div className="p-8">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
