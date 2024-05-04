import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Logo from './../../../assets/Travelotl_Logo.png';

export default function UniformProfile({ user, userNavigation, classNames, buttonImage }) {

    return (
        <div className="relative flex items-center justify-center z-10 w-full">
            {/* Image button will be clickable to open the menu */}
            <Popover className="relative">
                <Popover.Button
                    className="flex items-center justify-center rounded-full focus:outline-none"
                >
                    <img
                        className="h-32 rounded-full"
                        src={Logo}
                        // src={buttonImage || user.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt="Menu Button"
                    />
                </Popover.Button>

                {/* Dropdown menu that opens on clicking the image button */}
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <div className="px-4 py-2">
                                {/* Profile photo inside the menu */}
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={user.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                    alt="Profile Photo"
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
