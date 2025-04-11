import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => {
  return (
    <div className="relative flex items-center justify-between border-t border-b border-gray-300 py-6 min-h-[120px]">
      {/* Left Section - Product Info */}
      <div className="flex flex-col gap-4 w-[45%]">
        <div className="flex items-start gap-4">
          <Skeleton height={60} width={60} className="rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton height={20} width={250} />
            <div className="flex gap-4">
              <Skeleton height={16} width={70} />
              <Skeleton height={16} width={60} />
              <Skeleton height={16} width={60} />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <Skeleton height={13} width={100} />
          <Skeleton height={13} width={120} />
          <Skeleton height={13} width={130} />
        </div>
      </div>

      {/* Middle Section - Order Status */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Skeleton height={15} width={15} circle />
        <Skeleton height={18} width={100} />
      </div>

      {/* Right Section - Cancel Button */}
      <div className="self-center w-[25%] flex justify-end">
        <Skeleton height={36} width={140} />
      </div>
    </div>
  );
};

export default OrderSkeleton;
