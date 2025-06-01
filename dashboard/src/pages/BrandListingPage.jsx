import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2, Redo, SquarePen } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BrandListingPage = () => {
  const queryClient = useQueryClient();

  // Fetch all brands
  const {
    data: brands = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await fetch("/api/brand/all");
      if (!res.ok) throw new Error("Failed to fetch brands");
      return res.json();
    },
    retry: false,
  });

  // Delete brand mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/brand/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete brand");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      queryClient.invalidateQueries(["brands"]);
    },
    onError: () => toast.error("Failed to delete brand"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <SectionHeading title="Brands" subtitle="Manage brands below" />

        <div>
          <Link to="/brand/create">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm transition cursor-pointer">
              <Redo size={18} />
              Create New Brand
            </button>
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-red-600 font-medium mb-4">{error.message}</p>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : brands.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-6 py-4 text-left text-nowrap">
                  Sr No.
                </th>
                <th className="px-2 sm:px-6 py-4 text-left">Name</th>
                <th className="px-2 sm:px-6 py-4 text-left">Action</th>
                <th className="px-2 sm:px-6 py-4 text-left">Updated Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brands.map((brand, index) => (
                <tr
                  key={brand._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 sm:px-10 py-4 font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-6 py-4 truncate max-w-xs">
                    {brand.name}
                  </td>

                  <td className="px-2 sm:px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Edit Button */}
                      <Link
                        to={`/brand/edit/${brand._id}`}
                        className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                        title="Edit Brand"
                        aria-label="Edit Brand"
                      >
                        <SquarePen
                          size={20}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(brand._id)}
                        disabled={deleteMutation.isLoading}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Brand"
                        aria-label="Delete Brand"
                      >
                        <Trash2
                          size={20}
                          className="text-red-600 hover:text-red-800"
                        />
                      </button>
                    </div>
                  </td>

                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    {moment(brand.updatedAt).format("DD MMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500 text-lg">
          No brands available
        </div>
      )}
    </>
  );
};

export default BrandListingPage;
