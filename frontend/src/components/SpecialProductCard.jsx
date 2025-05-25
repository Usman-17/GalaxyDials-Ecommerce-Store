import { Link } from "react-router-dom";

const SpecialProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group block max-w-4xl mx-auto rounded-xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-sm hover:shadow-md transition-shadow duration-400 bg-white"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Side */}
        <div className="relative w-full sm:w-1/3 bg-white clip-image-curve">
          <img
            src={product?.productImages?.[0]?.url}
            alt={product?.title}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-64 sm:h-full transition-transform duration-200 ease-in-out group-hover:scale-105"
          />

          {/*  tag */}
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm select-none sm:opacity-0 sm:group-hover:opacity-100">
            Special
          </div>
        </div>

        {/* Content side */}
        <div className="px-4 sm:px-6 py-5 sm:py-3 flex flex-col sm:w-2/3 rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none bg-white">
          <div>
            <p className="uppercase tracking-widest font-semibold text-xs sm:text-sm text-gray-500">
              {product?.brand.name}
            </p>

            <p className="text-red-600 font-semibold text-sm">
              Limited Time Deals
            </p>

            <h3 className="text-xl font-bold mb-1 line-clamp-2 leading-tight">
              {product?.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-5 sm:mb-0">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Price & button */}
          <div className="flex items-center justify-between sm:mt-10">
            <p className="text-3xl font-bold text-gray-800">
              Rs. {product?.price.toLocaleString()}
            </p>

            <button
              className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-opacity duration-300 shadow-md"
              aria-label={`View details of ${product?.title}`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpecialProductCard;
