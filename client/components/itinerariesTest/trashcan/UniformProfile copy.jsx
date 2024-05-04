import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Logo from './../../../assets/Travelotl_Logo.png';

export default function UniformProfile({ user, userNavigation, classNames, buttonImage }) {
  return (
    <div className="absolute top-0 left-0 m-4 flex items-center z-10">
      {/* Profile button */}
      <Popover className="relative">
        <Popover.Button
          className="flex items-center justify-center rounded-full focus:outline-none"
        >
          <img
            className="h-32 rounded-full"
            src={Logo}
            alt="Menu Button"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute mt-2 w-48 bg-white shadow-lg">
            {/* User navigation items */}
            <div className="py-1">{/* Add navigation links here */}</div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
