import Skeleton from "react-loading-skeleton";
import { Undo } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";

const EnquiryDetailsPage = () => {
  const { id } = useParams();

  const {
    data: enquiry,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enquiry", id],
    queryFn: async () => {
      const res = await fetch(`/api/enquiry/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return res.json();
    },

    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-0">
        <SectionHeading
          title="Enquiry Details"
          subtitle="View detailed information about the enquiry"
        />

        <div>
          <button className="bg-gray-100 hover:bg-gray-200 text-sm  px-3 py-2 rounded-md transition cursor-pointer">
            <Link to="/enquiries" className="flex items-center gap-2">
              <Undo size={18} />
              Back to Enquiries
            </Link>
          </button>
        </div>
      </div>

      {/* Skeleton */}
      <div className="mt-6 space-y-3">
        {isLoading ? (
          <div className="mt-6 space-y-4">
            <div>
              <Skeleton height={20} width={200} />
            </div>
            <div>
              <Skeleton height={20} width={250} />
            </div>
            <div>
              <Skeleton height={20} width={180} />
            </div>
            <div>
              <Skeleton height={20} width={220} />
            </div>
            <div>
              <Skeleton height={20} count={5} />
            </div>
          </div>
        ) : (
          // Details
          <>
            <div>
              <strong>Name:</strong> {enquiry?.name}
            </div>
            <div>
              <strong>Email:</strong> {enquiry?.email}
            </div>
            <div>
              <strong>Mobile:</strong> {enquiry?.mobile}
            </div>
            <div>
              <strong>Subject:</strong> {enquiry?.subject}
            </div>
            <div>
              <strong>Comment:</strong> {enquiry?.comment}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EnquiryDetailsPage;
