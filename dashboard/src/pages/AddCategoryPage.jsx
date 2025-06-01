import { useEffect, useState } from "react";
import { Undo } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";

const AddCategoryPage = () => {
  const [formData, setFormData] = useState({ name: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch category if editing
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const res = await fetch(`/api/category/${id}`);
          const data = await res.json();
          setFormData({ name: data.name || "" });
        } catch (error) {
          console.error("Error fetching category:", error);
          toast.error("Failed to fetch category data");
        }
      };
      fetchCategory();
    }
  }, [id]);

  const {
    mutate: saveCategory,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/category/update/${id}` : "/api/category/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save category");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Category "${formData.name}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/category/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} category`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    saveCategory(formDataToSend);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <SectionHeading
          title={id ? "Edit Category" : "Add New Category"}
          subtitle="Fill out the details below to add a category"
        />

        <div>
          <Link to="/category/manage">
            <button className="bg-gray-100 hover:bg-gray-200 text-sm  px-3 py-2 rounded-md transition cursor-pointer flex items-center gap-2">
              <Undo size={18} />
              Manage All Categories
            </button>
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Name */}
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
            placeholder="Enter Category Name"
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
            className="w-full flex items-center justify-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-md transition cursor-pointer"
          >
            {isPending ? (
              <LoadingSpinner content="Saving..." />
            ) : (
              <>{id ? "Update Category" : "Add Category"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCategoryPage;
