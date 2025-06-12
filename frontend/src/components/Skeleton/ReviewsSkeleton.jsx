import { Star } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewsSkeleton = () => {
  return (
    <div aria-busy="true" aria-label="Loading reviews">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-start gap-4 border-b pb-4 mt-3">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="w-full">
            <Skeleton width={100} height={10} />

            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className="text-gray-300"
                  size={16}
                  fill={starIndex < 4 ? "currentColor" : "none"}
                />
              ))}
            </div>

            <div className="mt-2 space-y-1">
              <Skeleton height={10} className="w-56 sm:w-96" />
              <Skeleton height={10} className="w-52 sm:w-80" />
              <Skeleton height={10} className="w-48 sm:w-72" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSkeleton;
