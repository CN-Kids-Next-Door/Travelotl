/**
 * @module Header
 * @description header component that has navigation links
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-500 font-montserrat text-white z-[100]">
      <nav className="flex justify-between items-center p-4">
        <div className="font-bold font-montserrat text-lg">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
          Travelolt
        </NavLink>
        </div>
        <ul className="flex space-x-6">
            <li className="mr-6">
            <NavLink to="/newitineraryform" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
              Travel Form
            </NavLink>
          </li>
          {/* <li className="mr-6">
            <NavLink to="/itinerary" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
              View Small Itineraries
            </NavLink>
          </li> */}
          <li className="mr-6">
            <NavLink to="/itinerary1" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
              Itineraries
            </NavLink>
          </li>

          {/* <li className="mr-6">
            <NavLink to="/itinerarieswelcome" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
              Profile
            </NavLink>
          </li> */}
          {/* <li className="mr-6">
            <NavLink to="/success" className={({ isActive }) => isActive ? "text-blue-300 font-montserrat hover:text-blue-200" : "hover:text-blue-200"}>
              OAuth
            </NavLink> */}
          {/* </li> */}
          {/* <li className="mr-6">
            <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Login
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
