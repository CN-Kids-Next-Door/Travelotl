import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Logo from './../../../assets/Travelotl_Logo.png';

export default function UniformProfileCopy2({
  user,
  userNavigation,
  classNames,
  buttonImage,
  imageViewportWidth = 35, // Percentage of viewport width
  maxWidth = 800, // Maximum pixel width of the image
  minWidth = 20 // Minimum pixel width of the image
}) {
  // Calculate image width based on viewport percentage
  const imageWidth = `calc(${imageViewportWidth}vw)`;
  const imageStyle = {
    width: `min(${imageWidth}, ${maxWidth}px)`,
    minWidth: `${minWidth}px`,
    height: 'auto', // Maintain aspect ratio
  };

  return (
    <div className="absolute top-0 left-0 m-4 flex items-start z-50">
      {/* Profile Button */}
      <Popover className="relative">
        <Popover.Button className="focus:outline-none">
          <img
            src={Logo}
            alt="Profile Button"
            style={imageStyle}
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute mt-4 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {/* Menu Items */}
            <div className="py-1">
              <div className="px-4 py-2">
                {/* Profile photo inside the menu */}
                <img
                  src={user.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt="Profile Photo"
                  className="rounded-full"
                />
                <p className="mt-2 text-sm font-medium">{user.name}</p>
              </div>
              {userNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
