import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse border-t-2">
      {/* Breadcrumb Skeleton */}
      <nav
        aria-label="breadcrumb"
        className="my-4 text-sm text-gray-600 select-none hidden sm:block"
      >
        <ol className="flex items-center space-x-1">
          <li className="flex items-center">
            <Skeleton width={90} height={12} />
          </li>
          <li className="flex items-center">
            <span className="mx-1 text-gray-400">•</span>
            <Skeleton width={270} height={12} />
          </li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
        {/* Image Section Skeleton */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3 sm:gap-6">
          {/* Product Images */}
          <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3 sm:gap-1">
            {/*  small images */}
            <div className="flex sm:flex-col items-center justify-center sm:justify-normal sm:items-start sm:w-[25%] w-full gap-1 sm:gap-2">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-20 sm:w-36  h-20 sm:h-28 rounded-md"
                  />
                ))}
            </div>

            {/*  Main Image */}
            <div className="w-full flex justify-center">
              <Skeleton className="w-80 h-80 sm:h-[500px] sm:w-[500px]" />
            </div>
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1">
          <Skeleton width={80} height={18} className="mb-2" />
          <Skeleton width={`70%`} height={28} className="mb-3" />
          <Skeleton width={100} height={24} className="mb-2" />
          <Skeleton width={`40%`} height={20} className="mb-5" />

          <Skeleton width={80} height={16} className="mb-2" />
          <Skeleton width={60} height={32} className="mb-5" />

          <Skeleton width={100} height={18} className="mb-2" />
          <div className="flex gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width={50} height={30} />
            ))}
          </div>

          <Skeleton width={140} height={40} className="mb-6" />

          <Skeleton width={`60%`} height={14} className="mb-1" />
          <Skeleton width={`40%`} height={14} className="mb-1" />
          <Skeleton width={`50%`} height={14} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 sm:mt-20">
        <div className="flex border-b">
          <Skeleton width={100} height={30} className="mr-4" />
          <Skeleton width={100} height={30} />
        </div>

        <div className="border px-3 sm:px-6 py-3 sm:py-6 mt-4">
          <Skeleton count={5} height={16} className="mb-2" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
