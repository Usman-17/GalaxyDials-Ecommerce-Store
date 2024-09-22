import banner from "../assets/banner.webp";
import { Link } from "react-router-dom";
import { Redo } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative">
      <img src={banner} alt="banner" className="w-full h-auto sm:h-[540px]" />

      <div className="absolute bottom-10 md:bottom-5 lg:bottom-10 left-5 md:left-2 lg:left-10 text-black p-4 rounded-md max-w-xs sm:max-w-md hidden sm:block">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-1 uppercase">
          Galaxy Dials
        </h1>
        <h5 className="text-md sm:text-md font-light mb-4">
          Discover exclusive collections and shop the latest trends.
        </h5>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-black py-2 px-6 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-200 transition-colors duration-300 ease-in-out"
        >
          Shop Now
          <Redo size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
