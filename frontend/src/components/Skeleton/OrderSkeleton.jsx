import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => {
  return (
    <div className="border-t border-b border-gray-300 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
        {/* Left Section - Product Info */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="flex gap-4">
            <Skeleton height={60} width={60} className="rounded-md" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton height={20} width="80%" />
              <div className="flex flex-wrap gap-3">
                <Skeleton height={16} width={70} />
                <Skeleton height={16} width={60} />
                <Skeleton height={16} width={60} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <Skeleton height={13} width={100} />
            <Skeleton height={13} width={120} />
            <Skeleton height={13} width={130} />
          </div>
        </div>

        {/* Middle Section - Order Status */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Skeleton height={15} width={15} circle />
          <Skeleton height={18} width={100} />
        </div>

        {/* Right Section - Cancel Button */}
        <div className="w-full md:w-[140px] flex justify-start md:justify-end">
          <Skeleton height={36} width={140} />
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
