import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
      {/* Product Images */}
      <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3 sm:gap-1">
        {/*  small images */}
        <div className="flex sm:flex-col items-center justify-center sm:w-[18.5%] w-full gap-1 sm:gap-2">
          {Array(4)
            .fill()
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-20 sm:w-full h-20 sm:h-24 rounded-md"
                style={{ minWidth: "60px" }}
              />
            ))}
        </div>

        {/*  Main Image */}
        <div className="w-full flex justify-center">
          <Skeleton className="w-80 h-80 sm:h-96 sm:w-96" />
        </div>
      </div>

      {/*  Product Info */}
      <div className="flex-1">
        {/* Brand */}
        <Skeleton className="h-3 sm:h-4 w-20 sm:w-28 mb-2" />

        {/* Product Title */}
        <Skeleton className="h-4 sm:h-6 w-full sm:w-4/5" />
        <Skeleton className="h-4 sm:h-5 w-60 sm:w-3/5 mb-4" />

        {/* Price */}
        <Skeleton className="h-5 sm:h-6 w-28 sm:w-32 mb-3" />
        <Skeleton className="h-4 sm:h-5 w-16 sm:w-20 mb-1" />

        {/* Category */}
        <Skeleton className="h-4 sm:h-5 w-24 sm:w-28 mb-2" />

        {/* Color Options */}
        <div className="flex flex-col gap-4 my-4">
          <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-sm" />
            <Skeleton className="h-8 w-16 rounded-sm" />
            <Skeleton className="h-8 w-16 rounded-sm" />
          </div>
        </div>

        {/*  Add to Cart Button */}
        <Skeleton className="h-10 w-48 sm:w-64 rounded-md" />
        <hr className="mt-8 sm:w-4/5" />

        {/*  Additional Info */}
        <div className="mt-5">
          <Skeleton className="h-4 sm:h-5 w-40 mb-1" />
          <Skeleton className="h-4 sm:h-5 w-56 mb-1" />
          <Skeleton className="h-4 sm:h-5 w-72" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
