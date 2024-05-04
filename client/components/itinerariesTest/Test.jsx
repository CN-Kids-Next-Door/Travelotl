import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ItinerariesPopOver from './itinPopOver.jsx';
import PlaneVideo from './../../assets/flying.mp4';
// import { Menu, Transition } from '@headlessui/react';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
  // import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import ItinerariesList from '../itinerariesTest/cards/ItinerariesList.jsx';

import {
  useGetItinerariesQuery,
  useAddItineraryMutation
} from '../../features/itnrySlice.js';
import ICardFront from './cards/iCardFrontPage.jsx'
import ICardBack from './cards/iCardBackPage.jsx'
import ICardHorizontal from './cards/iCardHorizontalPage.jsx'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  // { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
const { firstname: firstName, lastname: lastName, email: userEmail, profile_image } = useSelector(state => state.authState.userInfo)

const user = {
  name: `${firstName} ${lastName}`,
  email: `${userEmail}`,
  test: 'test',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userId = 26; // Example userId, adjust according to your app logic
const {
  data: itineraries,
  isLoading,
  isError,
  error
} = useGetItinerariesQuery({ userId }, { skip: !userId });



  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

      <div className="min-h-full">
      <video autoPlay muted loop className="fixed top-[0rem] left-0 w-full h-[calc(100vh-0rem)] object-cover z-0">
        <source src={PlaneVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <ItinerariesPopOver user={user} userNavigation={userNavigation} navigation={navigation} classNames ={classNames} />

<main className="-mt-24 pb-8">
  <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="sr-only">Travelotl: Plan the trip of your dreams...</h1>

    {/* Main 3 column grid */}
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">


        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-1">
          <section aria-labelledby="section-1-title">
            <h2 className="sr-only" id="section-1-title">
              Filter
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">

              <div className="p-6">{/* Your content */}</div>

              {/* <ICardFront/> */}

              <ICardHorizontal/>

              {/* <div className="itinerary-page">
                <ItinerariesList itineraries={itineraries} />
              </div> */}

            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-start-2">
          <section aria-labelledby="section-2-title">
            
            <h2 className="sr-only" id="section-2-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">{/* Your content */}</div>
              <ICardBack/>
              <p>COLUMN 2</p>
            </div>

          </section>
        </div>

      </div>
    </div>
  </main>

<footer>
</footer>

</div>
</>
)
}
