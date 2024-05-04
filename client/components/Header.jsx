/**
 * @module Header
 * @description header component that has navigation links
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white w-full z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="font-bold text-lg">
          Travelolt
        </div>
        <ul className="flex">
          <li className="mr-6">
            <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Login
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/form" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Form
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/itinerary" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Itinerary
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/itinerary1" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Itinerary
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/success" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Success
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/tabbedform" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Tabbed Form
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/singlepageform" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              Single Page Form
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/test" className={({ isActive }) => isActive ? "text-blue-300 hover:text-blue-200" : "hover:text-blue-200"}>
              test
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
