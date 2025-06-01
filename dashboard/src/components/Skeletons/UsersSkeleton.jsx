import Skeleton from "react-loading-skeleton";

const UsersSkeleton = () => {
  const skeletonArray = Array.from({ length: 5 });

  return (
    <div className="space-y-6">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
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

      {/* Users Table Skeleton */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {["Sr No.", "Name", "Email", "Role"].map((heading, idx) => (
                <th key={idx} className="px-2 sm:px-6 py-4 text-left">
                  <Skeleton height={16} width={64} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skeletonArray.map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-2 sm:px-6 py-4">
                  <Skeleton height={16} width={24} />
                </td>
                <td className="px-2 sm:px-6 py-4">
                  <Skeleton height={16} width={96} />
                </td>
                <td className="px-2 sm:px-6 py-4">
                  <Skeleton height={16} width={128} />
                </td>
                <td className="px-2 sm:px-6 py-4">
                  <Skeleton height={32} width={80} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSkeleton;
