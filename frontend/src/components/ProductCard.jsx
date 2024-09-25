import watch from "../assets/watch.webp";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link>
      <div className="rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-sm mx-auto sm:max-w-none group">
        <div className="relative">
          <img
            src={watch}
            alt="Apple Watch"
            className="w-full h-auto rounded-t-md"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            Sale
          </div>
        </div>

        {/* Product Info */}
        <div className="py-2 px-2">
          <p className="text-xs sm:text-sm text-gray-500">POEDAGAR</p>
          <h3
            className="font-semibold text-xs sm:text-xl md:text-base tracking-tight"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.3",
            }}
          >
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h3>

          {/* Price */}
          <div className="flex gap-1 sm:gap-2 items-center mt-2">
            <p className="text-lg sm:text-xl font-bold text-gray-900">
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

export default ProductCard;
