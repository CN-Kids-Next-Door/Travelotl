import React, { useState, useEffect } from 'react';

// Sample data for people
const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];

// Sample data for files
const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  // More files...
];

function iCardHorizontal() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatically update the currentIndex to cycle through files for images
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % files.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [files.length]);

  return (
    <div>
      {people.map((person, index) => (
        <div
          key={person.email}
          className="m-5 relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0 h-20 w-20"> {/* Adjusted size */}
            <img className="h-full w-full object-cover rounded-full" src={files[currentIndex % files.length].source} alt={files[currentIndex % files.length].title} />
          </div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="truncate text-sm text-gray-500">{person.role}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default iCardHorizontal;
