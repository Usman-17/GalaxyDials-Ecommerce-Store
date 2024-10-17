import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FilterSkeleton = () => {
  return (
    <div>
      <Skeleton height={20} width={100} className="mb-4" />

      {/* Skeleton for each checkbox and label */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center gap-2 mb-3">
          <Skeleton height={16} width={16} />
          <Skeleton height={16} width={100} />
        </div>
      ))}
    </div>
  );
};

export default FilterSkeleton;
