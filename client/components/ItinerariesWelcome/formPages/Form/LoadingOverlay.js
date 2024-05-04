// LoadingOverlay.jsx
import React from 'react';
import Axolotl from './../../../../assets/loadervp9chrome.webm';

const LoadingOverlay = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <video autoPlay loop className="w-full max-w-lg rounded-lg">
                <source src={Axolotl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default LoadingOverlay;
