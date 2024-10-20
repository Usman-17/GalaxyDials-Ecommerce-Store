import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, LogOut, ShoppingCart, UserRound } from "lucide-react";
// Imports End

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <>
      {authUser ? (
        <div className="relative z-10 group" onMouseLeave={closeDropdown}>
          {/* Avatar */}
          <img
            src={
              (authUser && authUser?.profileImg && authUser.profileImg.url) ||
              "/avatar-placeholder.png"
            }
            alt="avatar"
            onClick={toggleDropdown}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition duration-200 object-contain"
          />

          <div
            className={`absolute right-0 pt-1 sm:pt-2 px-1 sm:px-3 transition-opacity duration-200 ${
              isOpen ? "block" : "hidden sm:group-hover:block"
            }`}
          >
            <div className="flex flex-col gap-1 w-40 sm:w-48 px-1 sm:px-2 py-2 sm:py-3 bg-white border border-gray-200 shadow-lg rounded-lg text-gray-600">
              {/* Profile */}
              <Link
                to="profile"
                className="flex items-center gap-3 py-1 px-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                onClick={closeDropdown}
              >
                <UserRound size={16} />
                My Profile
              </Link>

              {/* Order */}
              <Link
                to="/order"
                className="flex items-center gap-3 py-1 px-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                onClick={closeDropdown}
              >
                <ShoppingCart size={16} />
                Orders
              </Link>

              {/* Admin */}
              {authUser.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 py-1 px-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                  onClick={closeDropdown}
                >
                  <ExternalLink size={16} />
                  <p>Admin Panel</p>
                </Link>
              )}

              <hr />

              {/* Logout */}
              <div
                onClick={closeDropdown}
                className="flex items-center gap-3 py-1 px-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200 mt-1"
              >
                <LogOut size={16} />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <UserRound className="cursor-pointer" />
        </Link>
      )}
    </>
  );
};

export default ProfileDropdown;
