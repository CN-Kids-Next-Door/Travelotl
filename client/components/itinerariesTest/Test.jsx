import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ItinerariesPopOver from './itinerariesPopOver.jsx'
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
      <ItinerariesPopOver user={user} userNavigation={userNavigation} navigation={navigation} classNames ={classNames} />

        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Travelotl: Plan the trip of your dreams...</h1>

            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">


              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Filter
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">{/* Your content */}</div>
                    <div className="itinerary-page">
                      <ItinerariesList itineraries={itineraries} />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Display
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">{/* Your content */}</div>
                    <p> CONTENT2</p>
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


// export default function Example() {
//   return (

//     <div className="flex">

//     <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
//       <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
//         <div className="ml-4 mt-2 flex">
//           <div>
//           <h3 className="text-base font-semibold leading-6 text-gray-900">Job Postings</h3>

//           <button
//             type="button"
//             className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Create new job
//           </button>

//           </div>


//         </div><ul className="space-y-3 my-5"><li className="text-sm text-gray-700">Software Engineer</li>
//             <li className="text-sm text-gray-700">Data Scientist</li>
//             <li className="text-sm text-gray-700">Product Manager</li>
//             <li className="text-sm text-gray-700">Graphic Designer</li>
//             <li className="text-sm text-gray-700">Sales Manager</li>
//             <li className="text-sm text-gray-700">Human Resources Coordinator</li>
//             <li className="text-sm text-gray-700">Marketing Specialist</li>
//             <li className="text-sm text-gray-700">Financial Analyst</li>
//             <li className="text-sm text-gray-700">UX Designer</li>
//             <li className="text-sm text-gray-700">Mobile Developer</li>
//             <li className="text-sm text-gray-700">Systems Administrator</li>
//             <li className="text-sm text-gray-700">Content Strategist</li>
//             <li className="text-sm text-gray-700">SEO Specialist</li>
//             <li className="text-sm text-gray-700">Operations Manager</li>
//             <li className="text-sm text-gray-700">Customer Service Representative</li>
//             <li className="text-sm text-gray-700">Business Analyst</li>
//             <li className="text-sm text-gray-700">Network Engineer</li>
//             <li className="text-sm text-gray-700">Social Media Manager</li>
//             <li className="text-sm text-gray-700">Public Relations Specialist</li>
//             <li className="text-sm text-gray-700">Quality Assurance Engineer</li></ul>
//         <div className="ml-4 mt-2 flex-shrink-0">

//         </div>
//       </div>
//     </div>

//     <div className="bg-white px-4 py-5 sm:px-6">
//       <div className="flex space-x-3">
//         <div className="flex-shrink-0">
//           <img
//             className="h-10 w-10 rounded-full"
//             src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//         </div>
//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-semibold text-gray-900">
//             <a href="#" className="hover:underline">
//               Chelsea Hagon
//             </a>
//           </p>
//           <p className="text-sm text-gray-500">
//             <a href="#" className="hover:underline">
//               December 9 at 11:43 AM
//             </a>
//           </p>
//         </div>
//         <div className="flex flex-shrink-0 self-center">
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
//                 <span className="sr-only">Open options</span>
//                 <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
//               </Menu.Button>
//             </div>

//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         className={classNames(
//                           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                           'flex px-4 py-2 text-sm'
//                         )}
//                       >
//                         <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//                         <span>Add to favorites</span>
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         className={classNames(
//                           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                           'flex px-4 py-2 text-sm'
//                         )}
//                       >
//                         <CodeBracketIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//                         <span>Embed</span>
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         className={classNames(
//                           active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                           'flex px-4 py-2 text-sm'
//                         )}
//                       >
//                         <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//                         <span>Report content</span>
//                       </a>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>
//       </div>
//     </div>

//     </div>

//   )
// }