import { useEffect, useState } from "react";
import { Undo } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

const AddBrandPage = () => {
  const [formData, setFormData] = useState({ name: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch brand if editing
  useEffect(() => {
    if (id) {
      const fetchBrand = async () => {
        try {
          const res = await fetch(`/api/brand/${id}`);
          const data = await res.json();
          setFormData({ name: data.name || "" });
        } catch (error) {
          toast.error("Failed to fetch brand data");
          console.error("Error fetching category:", error);
        }
      };
      fetchBrand();
    }
  }, [id]);

  const {
    mutate: saveBrand,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/brand/update/${id}` : "/api/brand/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save brand");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Brand "${formData.name}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/brand/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} brand`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    saveBrand(formDataToSend);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-0">
        <SectionHeading
          title={id ? "Edit Brand" : "Add New Brand"}
          subtitle="Fill out the details below to add a brand"
        />

        <Button title="Manage All Brands" to="/brand/manage" Icon={Undo} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Brand Name */}
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Brand Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        {/* Error Message */}
        {isError && <p className="text-sm text-red-600">{error?.message}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-900
           disabled:opacity-50 w-full cursor-pointer"
          >
            {isPending ? (
              <LoadingSpinner content="Saving..." />
            ) : (
              <>{id ? "Update Brand" : "Add Brand"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBrandPage;
