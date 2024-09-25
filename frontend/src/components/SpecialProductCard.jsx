import watch from "../assets/watch2.webp";
import { Link } from "react-router-dom";

const SpecialProductCard = () => {
  return (
    <Link>
      <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl max-w-4xl mx-auto">
        {/* Img Side */}
        <div className="w-1/2 sm:w-1/4">
          <img
            className="h-full w-full object-cover transition-opacity duration-300 ease-in-out hover:opacity-80 rounded-l-md"
            src={watch}
            alt="Apple Watch Series 7 GPS"
          />
        </div>

        {/* Content Side */}
        <div className="w-2/3 px-1 sm:px-3 flex flex-col rounded-r-md">
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Brand
          </p>

          <h3
            className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3"
            style={{ lineHeight: "1.2" }}
          >
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
          </div>

          {/* Price */}
          <div className="flex gap-1 sm:gap-2 items-center mt-1">
            <p className="text-lg sm:text-xl font-bold text-gray-700">
              Rs. 4000
            </p>
            <p className="text-xs sm:text-sm text-gray-500 line-through">
              Rs. 5000
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpecialProductCard;
