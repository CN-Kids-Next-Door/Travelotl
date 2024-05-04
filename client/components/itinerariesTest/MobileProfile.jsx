import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MobileProfile({ open, user, userNavigation, classNames }) {
  return (
    <div className="absolute right-0 flex-shrink-0 lg:hidden z-10">
      {/* Mobile menu button */}
      <Popover.Button
        className="inline-flex items-center justify-center rounded-md p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Toggle mobile menu"
      >
        {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition-opacity duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          focus
          className="absolute top-0 right-0 mt-12 mr-2 origin-top-right z-30 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <div className="block px-4 py-2 text-sm text-gray-700">
              <div className="flex items-center space-x-3">
                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt={user.name + " profile"} />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            {userNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                  { 'bg-gray-100': item.current }
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </div>
  );
}
