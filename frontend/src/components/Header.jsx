import { NavLink, Link } from "react-router-dom";
import {
  Search,
  UserRound,
  ShoppingCart,
  LogOut,
  ShoppingBag,
} from "lucide-react";

import logo from "../assets/logo.png";
import home from "../assets/home.png";
import products from "../assets/products.png";
import tracking from "../assets/tracking.png";
import inbox from "../assets/inbox.png";
// imports End

const Header = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex items-center justify-between py-2.5 sm:py-3 font-medium">
        <img
          src={logo}
          alt="Logo"
          className="w-20 sm:w-24"
          loading="lazy"
          decoding="async"
        />

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <Search className="cursor-pointer" />

          <div className="relative group">
            <UserRound className="cursor-pointer" />
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-3 w-40 px-5 py-4 bg-white border border-gray-200 shadow-lg rounded-lg text-gray-600">
                <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors duration-200">
                  <UserRound size={16} />
                  <p>My Profile</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors duration-200">
                  <ShoppingCart size={16} />
                  <p>Orders</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors duration-200">
                  <LogOut size={16} />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <ShoppingBag />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full  text-[8px]">
              10
            </p>
          </Link>
        </div>

        {/* Bottom Navigation (visible on small screens) */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md sm:hidden px-2 border-t py-1">
          <ul className="flex justify-around items-center h-12 text-gray-600">
            <NavLink to="/" className="flex items-center gap-1 text-black">
              <div className="flex items-center gap-1">
                <img src={home} alt="home" className="w-7" />
                <p className="hidden mt-1.5 text-md">Home</p>
              </div>
            </NavLink>

            <NavLink
              to="/collection"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <img src={products} alt="products" className="w-7" />
              <p className="hidden mt-1.5 text-md">Collection</p>
            </NavLink>

            <NavLink
              to="/contact"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <img src={tracking} alt="order" className="w-8" />
              <p className="hidden mt-1.5 text-md">Orders</p>
            </NavLink>

            <NavLink
              to="/about"
              className="flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <img src={inbox} alt="contact" className="w-7" />
              <p className="hidden mt-1.5 text-md">Contact</p>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
