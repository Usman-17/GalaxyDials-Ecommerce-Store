import Skeleton from "react-loading-skeleton";

const OrdersSkeleton = () => {
  const skeletonArray = Array.from({ length: 4 });

  return (
    <div className="space-y-6">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 items-center">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex items-center gap-4 rounded-lg p-5 bg-white border border-gray-200 shadow"
          >
            {/* Icon Circle */}
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <Skeleton circle height={40} width={40} />
            </div>

            {/* Text Lines */}
            <div className="flex flex-col justify-center w-full">
              <Skeleton height={16} width="75%" className="mb-2" />
              <Skeleton height={16} width="50%" />
            </div>
          </div>
        ))}
      </div>

      {/* Order list skeleton */}
      {skeletonArray.map((_, i) => (
        <div
          key={i}
          className="animate-pulse border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-start">
            {/* Icon */}
            <div className="flex justify-center sm:justify-start">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Skeleton circle height={56} width={56} />
              </div>
            </div>

            {/* Items + Address */}
            <div className="col-span-2 space-y-3 mb-5">
              <Skeleton height={16} width="85%" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="60%" />
            </div>

            {/* Payment + Date */}
            <div className="space-y-2">
              <Skeleton height={16} width="66%" />
              <Skeleton height={16} width="50%" />
              <Skeleton height={16} width="75%" />
            </div>

            {/* Total + Actions */}
            <div className="space-y-2">
              <Skeleton height={20} width="75%" />
              <div className="flex items-center gap-4">
                <Skeleton height={24} width={128} />
                <Skeleton height={24} width={32} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
