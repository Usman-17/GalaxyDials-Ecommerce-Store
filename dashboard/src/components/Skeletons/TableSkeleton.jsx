import Skeleton from "react-loading-skeleton";

const TableSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-2 sm:px-6 py-4 text-left">Sr No.</th>
            <th className="px-2 sm:px-6 py-4 text-left">Name</th>
            <th className="px-2 sm:px-6 py-4 text-left">Email</th>
            <th className="px-2 sm:px-6 py-4 text-left">Phone</th>
            <th className="px-2 sm:px-6 py-4 text-left">Message</th>
            <th className="px-2 sm:px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map((_, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-2 sm:px-6 py-4">
                <Skeleton width={20} height={20} />
              </td>
              <td className="px-2 sm:px-6 py-4">
                <Skeleton width={80} />
              </td>
              <td className="px-2 sm:px-6 py-4">
                <Skeleton width={140} />
              </td>
              <td className="px-2 sm:px-6 py-4">
                <Skeleton width={100} />
              </td>
              <td className="px-2 sm:px-6 py-4">
                <Skeleton />
              </td>

              <td className="px-2 sm:px-6 py-4 flex items-center gap-4">
                <Skeleton circle width={24} height={24} />
                <Skeleton circle width={24} height={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
