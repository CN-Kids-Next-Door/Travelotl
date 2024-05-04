// SinglePageForm.jsx
import React, { useState } from 'react';
import Modal from './Form/Modal.js';
import TripForm from './Form/TripForm.js';
import Header from './../../Header.jsx';
import { useNavigate } from "react-router-dom";
import PlaneVideo from './../../../assets/flying.mp4';

import background from './../../../assets/blue_plane_background.png';
const SinglePageForm = () => {
    const [modalOpen, setModalOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleToggleModal = () => setModalOpen(!modalOpen);

    const handleFormSubmit = (formData) => {
        setLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setLoading(false);
            handleToggleModal(); // Close the modal after submission
            navigate('/itinerary1');
        }, 7050);


    };

  return (
  <div className="">
    {/* <div className="NewItineraryForm min-h-screen" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', objectFit: 'cover'}}> */}
    <Header />

    <div className="container z-[800] mt-[70px]">

              {/* <button
            onClick={handleToggleModal}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 left-[4] font-montserrat focus:outline-none focus:ring-2 focus:ring-green-500"
        >
            Plan Your Adventure
        </button> */}
    </div>

        
    {/* <video autoPlay muted loop className="fixed top-0 left-0 w-full h-[calc(100vh)] object-cover z-0">
      <source src={PlaneVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}

    <video autoPlay muted loop className="fixed top-[4rem] left-0 w-full h-[calc(100vh-4rem)] object-cover z-[-10]">
          <source src={PlaneVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        <h1 className="text-2xlfont-montserrat z-[100] font-bold mb-6"></h1>


        <Modal isOpen={modalOpen} toggleModal={handleToggleModal}>
          <h2 className="text-xl font-montserrat z-[100]font-semibold mb-4 text-center">Time to plan the trip of your dreams!</h2>
          <TripForm onSubmit={handleFormSubmit} loading={loading} />
        </Modal>

      </div>
    // </div>
  );
};

export default SinglePageForm;
