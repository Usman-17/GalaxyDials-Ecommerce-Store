import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product?._id}`}>
      <div className="rounded-lg transition-shadow duration-300 ease-in-out max-w-sm mx-auto sm:max-w-none group py-2 hover:shadow-sm mb-2">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-0 pb-[100%] rounded-t-md overflow-hidden">
            {/* First Image (Default) */}
            <img
              src={product?.productImages[0]?.url}
              alt={product?.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0 "
              loading="lazy"
              decoding="async"
            />

            {/* Second Image (Shown on Hover) */}
            {product?.productImages[1]?.url && (
              <img
                src={product?.productImages[1].url}
                alt={`${product?.title} - Alt`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="py-2 px-0.5 sm:px-2">
          <p className="text-xs sm:text-sm text-gray-500">
            {product?.brand?.name || ""}
          </p>

          <h3
            className="font-medium text-xs sm:text-sm md:text-sm tracking-tight text-gray-800"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.3",
            }}
          >
            {product?.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">
              Rs. {product?.price.toLocaleString()}
            </p>

            {product?.sold && (
              <div className="mt-0.5 sm:mt-0 text-xs sm:text-[12.5px] text-gray-600 font-medium">
                {product?.sold}+ Sold
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
