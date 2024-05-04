// Modal.js
import React from 'react';

const Modal = ({ isOpen, toggleModal, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-start z-50">
            <div
                className="relative bg-white max-w-lg w-full rounded-lg shadow-lg p-8"
                style={{
                    width: '60vw',
                    left: '0',
                    right: 'auto',
                    margin: '0 9vw', // Adjusted to move slightly to the left
                    minWidth: '320px',
                    minHeight: '200px',
                }}
            >
                {/* Optional Close Button */}
                {/* <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 font-montserrat hover:text-gray-700">
                    X
                </button> */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
