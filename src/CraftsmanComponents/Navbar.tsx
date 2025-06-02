import React, { useState, useRef } from 'react';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  dropdown?: {
    items: {
      label: string;
      href: string;
    }[];
  };
}

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, width: 0 });
  const navbarRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'products', 
      label: 'Products',
      dropdown: {
        items: [
          { label: 'Laptops', href: '/products/laptops' },
          { label: 'Smartphones', href: '/products/smartphones' },
          { label: 'Tablets', href: '/products/tablets' },
          { label: 'Accessories', href: '/products/accessories' },
          { label: 'Gaming', href: '/products/gaming' },
          { label: 'Audio', href: '/products/audio' },
        ]
      }
    },
    { 
      id: 'services', 
      label: 'Services',
      dropdown: {
        items: [
          { label: 'Technical Support', href: '/services/support' },
          { label: 'Installation', href: '/services/installation' },
          { label: 'Maintenance', href: '/services/maintenance' },
          { label: 'Consulting', href: '/services/consulting' },
          { label: 'Training', href: '/services/training' },
          { label: 'Premium Care', href: '/services/premium' },
        ]
      }
    },
    { 
      id: 'solutions', 
      label: 'Solutions',
      dropdown: {
        items: [
          { label: 'Enterprise', href: '/solutions/enterprise' },
          { label: 'Small Business', href: '/solutions/small-business' },
          { label: 'Education', href: '/solutions/education' },
          { label: 'Healthcare', href: '/solutions/healthcare' },
          { label: 'Government', href: '/solutions/government' },
          { label: 'Non-Profit', href: '/solutions/non-profit' },
        ]
      }
    },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  const handleMouseEnter = (itemId: string, e: React.MouseEvent<HTMLLIElement>) => {
    const item = navItems.find(item => item.id === itemId);
    if (!item?.dropdown) return; // Only proceed if item has dropdown
    
    if (navbarRef.current) {
      const navItem = e.currentTarget;
      const rect = navItem.getBoundingClientRect();
      const navbarRect = navbarRef.current.getBoundingClientRect();
      
      setDropdownPosition({
        left: rect.left - navbarRect.left,
        width: rect.width
      });
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = (_: React.MouseEvent) => {
    setActiveDropdown(null);
  };

  const handleDropdownMouseEnter = () => {
    // Keep dropdown open when hovering over dropdown content
  };

  const handleDropdownMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as Element;
    if (!navbarRef.current?.contains(relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  // Check if any item has dropdown
  const hasDropdownItems = navItems.some(item => item.dropdown);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <nav 
        ref={navbarRef}
        className="relative border flex w-200 justify-center shadow-lg bg-black rounded-full border-b border-zinc-900"
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-6">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li 
                    key={item.id}
                    className="relative"
                    onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                  >
                    <a
                      href={item.href || '#'}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
                        activeDropdown === item.id 
                          ? 'text-white bg-gray-800' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      } rounded-lg`}
                    >
                      {item.label}
                      {item.dropdown && (
                        <svg
                          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dropdown Container - Only render if there are dropdown items */}
        {hasDropdownItems && (
          <div 
            className={`absolute top-full left-0 bg-white border-t rounded-xl border-gray-200 shadow-2xl transition-all duration-500 ease-out z-50 ${
              activeDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
            }`}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className="max-w-6xl mx-auto px-6 py-8">
              {/* Animated Indicator */}
              <div 
                className="absolute top-0 h-1 bg-black transition-all duration-500 ease-out"
                style={{
                  left: dropdownPosition.left,
                  width: dropdownPosition.width
                }}
              />
              
              {/* Dropdown Content */}
              <div className="relative">
                {navItems.map((item) => (
                  item.dropdown && (
                    <div 
                      key={item.id}
                      className={`transition-all duration-500 ease-out ${
                        activeDropdown === item.id 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 translate-y-4 invisible absolute inset-0'
                      }`}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {item.dropdown.items.map((dropdownItem, index) => (
                          <a
                            key={index}
                            href={dropdownItem.href}
                            className="group px-6 py-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200 hover:shadow-md"
                          >
                            <div className="font-medium text-sm">{dropdownItem.label}</div>
                            <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">
                              Explore our {dropdownItem.label.toLowerCase()} options
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;