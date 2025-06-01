import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ScanSearch, Trash2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EnquiriesPage = () => {
  const queryClient = useQueryClient();

  // Fetch all enquiries
  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await fetch("/api/enquiry/all");
      if (!res.ok) throw new Error("Failed to fetch Enquires");
      return res.json();
    },
    retry: false,
  });

  // Delete Enquiry Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete enquiry");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Enquiry deleted");
      queryClient.invalidateQueries(["enquiries"]);
    },

    onError: () => toast.error("Failed to delete enquiry"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <SectionHeading
        title="Enquiries"
        subtitle="Manage customer enquiries below"
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Enquiry Table */}
          <div className="overflow-x-hidden rounded-xl shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-2 sm:px-6 py-4 text-left text-nowrap">
                    Sr No.
                  </th>
                  <th className="px-2 sm:px-6 py-4 text-left">Name</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Email</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Phone</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Message</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((enquiry, index) => (
                  <tr
                    key={enquiry._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 sm:px-10 py-4 font-medium text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-2 sm:px-6 py-4 text-nowrap">
                      {enquiry.name}
                    </td>
                    <td className="px-2 sm:px-6 py-4">{enquiry.email}</td>
                    <td className="px-2 sm:px-6 py-4">{enquiry.mobile}</td>
                    <td className="px-2 sm:px-6 py-4 max-w-[180px] truncate">
                      {enquiry.comment}
                    </td>

                    <td className="px-2 sm:px-6 py-4">
                      <div className="flex items-center gap-4">
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(enquiry._id)}
                          className="p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                          title="Delete Enquiry"
                          aria-label="Delete Enquiry"
                        >
                          <Trash2
                            size={20}
                            className="text-red-600 hover:text-red-800"
                          />
                        </button>

                        {/* View Details Button */}
                        <Link
                          to={`/enquiries/${enquiry._id}`}
                          className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                          title="View Details"
                          aria-label="View Enquiry Details"
                        >
                          <ScanSearch
                            size={20}
                            className="text-blue-600 hover:text-blue-800"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default EnquiriesPage;
