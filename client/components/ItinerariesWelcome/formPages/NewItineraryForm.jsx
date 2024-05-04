// SinglePageForm.jsx
import React, { useState } from 'react';
import Modal from './Form/Modal.js';
import TripForm from './Form/TripForm.js';

const SinglePageForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggleModal = () => setModalOpen(!modalOpen);

    const handleFormSubmit = (formData) => {
        setLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setLoading(false);
            handleToggleModal(); // Close the modal after submission
        }, 5000);
    };

    return (
        <div>

          <h1 className="text-2xl font-bold mb-6">Plan Your Trip</h1>

          <button
              onClick={handleToggleModal}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
              Open Trip Form
          </button>

          <Modal isOpen={modalOpen} toggleModal={handleToggleModal}>
            <h2 className="text-xl font-semibold mb-4 text-center">Travelotl</h2>
            <TripForm onSubmit={handleFormSubmit} loading={loading} />
          </Modal>

        </div>
    );
};

export default SinglePageForm;
