import React from 'react';

const HoverSidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-full transition-all duration-300 ease-in-out group hover:w-64 w-16 bg-zinc-900  text-white shadow-lg z-50">
      <div className="flex flex-col items-center group-hover:items-start h-full p-4 space-y-6">
        {/* Logo or Icon */}
        

        {/* Menu Items */}
        {['Home', 'Profile', 'Settings', 'Logout'].map((item) => (
          <div
            key={item}
            className="flex items-center w-full gap-3 cursor-pointer hover:text-pink-400 transition-colors"
          >
           
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverSidebar;
