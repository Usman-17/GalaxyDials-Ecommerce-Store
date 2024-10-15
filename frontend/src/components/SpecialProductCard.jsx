import { Link } from "react-router-dom";

const SpecialProductCard = ({ to, image, title, brand, price, salePrice }) => {
  return (
    <Link to={to}>
      <div className="bg-white rounded-2xl flex overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-sm max-w-4xl mx-auto mb-2 border group">
        {/* Image Section */}
        <div className="w-1/2 sm:w-1/4">
          <div className="relative w-full h-0 pb-[100%] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-2/3 px-1.5 sm:px-2 flex flex-col rounded-r-md mt-1 sm:mt-2">
          <p className="text-xs sm:text-sm text-gray-500">{brand}</p>

          <h3
            className="text-sm sm:text-lg font-semibold text-gray-900 mb-1"
            style={{ lineHeight: "1.2" }}
          >
            {title}
          </h3>

          {/* Rating Section */}
          <div className="flex items-center sm:mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
              </svg>
            ))}
          </div>

          {/* Price Section */}
          {price || salePrice ? (
            <div className="flex gap-1 sm:gap-2 items-center">
              {salePrice ? (
                <>
                  <p className="text-lg sm:text-xl font-bold text-red-500">
                    Rs. {salePrice}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 line-through">
                    Rs. {price}
                  </p>
                </>
              ) : (
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  Rs. {price}
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default SpecialProductCard;
