import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon, CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid';

import PlaneVideo from './../../assets/flying.mp4';
import Logo from './../../assets/Travelotl_Logo_normal.png';
import ItinerariesPopOver from '../itinerariesTest/ItinerariesPopOver.jsx';
import ICardFront from './cards/iCardFrontPage.jsx';
import ICardBack from './cards/iCardBackPage.jsx';
import ICardHorizontal from './cards/iCardHorizontalPage.jsx';
import ProfileBadge from './Badge/ProfileBadge.jsx';
import DesktopBadge from './Badge/DesktopBadge.jsx';
import UniformBadge from './Badge/UniformBadge.jsx';
// import NewItineraryForm from './NewItineraryForm.jsx';
import { useGetItinerariesQuery, useAddItineraryMutation } from '../../features/itnrySlice.js';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ItinerariesWelcome() {
  const { firstname: firstName, lastname: lastName, email: userEmail, profile_image } = useSelector((state) => state.authState.userInfo);

  const user = {
    name: `${firstName} ${lastName}`,
    email: `${userEmail}`,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  const userId = useSelector((state) => state.authState.userInfo.user_id);
  
  const { data: itineraries, isLoading, isError, error } = useGetItinerariesQuery({ userId }, { skip: !userId });

  // useAddItineraryMutation({ userId, data }, { skip: !userId });

  return (
    <>
      {/* <ProfileBadge open={open} user={user} userNavigation={userNavigation} classNames={classNames} /> */}

      <DesktopBadge open={open} user={user} userNavigation={userNavigation} classNames={classNames} />

      {/* <UniformBadge open={open} user={user} userNavigation={userNavigation} classNames={classNames} /> */}



      <div className="min-h-full">
      
      <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[8%] top-[-2rem] z-30 -translate-x-1/2" />
        
        <video autoPlay muted loop className="fixed top-0 left-0 w-full h-[calc(100vh)] object-cover z-0">
          <source src={PlaneVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <main className="mt-32 pb-8"> {/* Adjusted margin-top */}
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl left-[8%] lg:px-8">
            <h1>Travelotl: Plan the trip of your dreams...</h1>

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 mt-12"> {/* Added top margin */}
              {/* Left Column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-1">
                <section className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6 ">
                    <ICardHorizontal />
                  </div>
                </section>
              </div>

              {/* Middle Column */}
              <div className="grid grid-cols-1 gap-4 lg:col-start-2">
                <section className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <ICardBack />
                    <p>COLUMN 2</p>
                  </div>
                </section>
              </div>
              
              {/* Right Column */}
              <div className="grid grid-cols-1 gap-4 lg:col-start-3">
                <section className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <ICardFront />
                    <p>COLUMN 3</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <footer></footer>
      </div>
    </>
  );
}
