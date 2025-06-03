import { Link } from "react-router";
import { X, UserRound, LogOut } from "lucide-react";
import useLogout from "../hooks/useLogout";
import { useSidebar } from "../context/SidebarContext";
import menu from "../assets/menu.png";
import useGetAuth from "../hooks/useGetAuth";

const Header = () => {
  const { logoutMutation } = useLogout();

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const { data: authUser } = useGetAuth();

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
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

          <div className="flex items-center justify-end gap-3">
            {/* 2 User */}
            <Link to="/" className="flex items-center gap-3 p-2 rounded-md">
              <div>
                {authUser.profileImg.url ? (
                  <img
                    src={authUser.profileImg.url}
                    alt="image"
                    className="w-9 h-9 rounded-full"
                  />
                ) : (
                  <UserRound className="w-5 h-5" />
                )}
              </div>

              <div className="flex flex-col text-sm leading-tight">
                <span className="font-medium text-gray-800">
                  {authUser?.fullName}
                </span>
                <span className="text-gray-500 text-xs">{authUser?.email}</span>
              </div>
            </Link>

            <div className="cursor-pointer hover:text-gray-700">
              <LogOut size={20} onClick={() => logoutMutation()} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
