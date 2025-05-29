import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "../context/SidebarContext";

// Lucide React icons
import { X, Search } from "lucide-react";
import menu from "../assets/menu.png";
import user from "../assets/user.png";

const Header = () => {
  const inputRef = useRef(null);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* 1 Menu Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 lg:flex lg:h-11 lg:w-11 lg:border cursor-pointer hover:bg-gray-50"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <X size={24} />
            ) : (
              <img src={menu} className="w-6 h-6" />
            )}
          </button>
          {/* Menu Button End */}

          {/* 2 Logo */}
          <Link to="/" className="lg:hidden">
            <img src="./images/logo/logo.svg" alt="Logo" />
          </Link>

          <div className="hidden lg:block w-full max-w-md">
            <form>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Search size={20} />
                </span>
                <input
                  id="search"
                  type="search"
                  ref={inputRef}
                  placeholder="Search..."
                  className="w-full h-10 pl-11 pr-3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
