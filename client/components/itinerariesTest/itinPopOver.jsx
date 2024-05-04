import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Logo from './../../assets/Travelotl_Logo.png';
import DesktopProfile from './trashcan/DesktopProfile.jsx';
import MobileProfile from './MobileProfile.jsx';
import UniformProfile from './trashcan/UniformProfile.jsx';
import TravelotlProfile from './TravelotlProfile.jsx';


export default function ItinerariesPopover({ user, userNavigation, navigation, classNames }) {
  return (
    <Popover as="header" className="bg-indigo-600 pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex items-center justify-center py-5 lg:justify-between">

              {/* Logo */}
              {/* <div className="absolute left-0 flex-shrink-0 lg:static">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[3%] top-[-1rem] z-30 -translate-x-1/2"/>
                </a>
              </div> */}

              {/* Profile components */}
              {/* <DesktopProfile userNavigation={userNavigation} classNames={classNames} /> */}
              {/* <MobileProfile open={open} user={user} userNavigation={userNavigation} classNames={classNames} /> */}
              {/* <UniformProfile open={open} user={user} userNavigation={userNavigation} classNames={classNames} /> */}
              {/* <TravelotlProfile open={open} user={user} userNavigation={userNavigation} classNames={classNames} /> */}
            </div>
          </div>
        </>
      )}
    </Popover>
  );
};
