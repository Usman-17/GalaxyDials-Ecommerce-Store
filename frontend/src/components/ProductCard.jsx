import { Link } from "react-router-dom";

const ProductCard = ({ to, image, title, brand, price, salePrice }) => {
  return (
    <Link to={to}>
      <div className="rounded-lg transition-shadow duration-300 ease-in-out max-w-sm mx-auto sm:max-w-none group py-2 hover:shadow-sm mb-2">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-0 pb-[100%] rounded-t-md overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105 shadow-lg hover:shadow-xl"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Sale Badge */}
          {salePrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 sm:py-0.5 rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="py-2 px-2">
          <p className="text-xs sm:text-sm text-gray-500">{brand?.name}</p>
          <h3
            className="font-medium text-xs sm:text-sm md:text-base tracking-tight text-gray-800"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.3",
            }}
          >
            {title}
          </h3>

          {/* Price */}
          {(price || salePrice) && (
            <div className="flex gap-1 sm:gap-2 items-center">
              {salePrice ? (
                <>
                  <p className="text-lg sm:text-md font-semibold text-red-500">
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
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
