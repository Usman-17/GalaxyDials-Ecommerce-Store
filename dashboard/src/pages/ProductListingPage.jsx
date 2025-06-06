import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2, Redo, SquarePen } from "lucide-react";

import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import TableSkeleton from "../components/Skeletons/TableSkeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const ProductListingPage = () => {
  const queryClient = useQueryClient();
  const { products = [], productIsLoading, productError } = useGetAllProducts();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },

    onSuccess: () => {
      toast.success("product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },

    onError: () => toast.error("Failed to delete product"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-0">
        <SectionHeading title="Products" subtitle="Manage products below" />

        <Button title="Create Product" to="/product/create" Icon={Redo} />
      </div>

      {productError && (
        <p className="text-red-600 font-medium mb-4">{productError.message}</p>
      )}

      {productIsLoading ? (
        <TableSkeleton />
      ) : products.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-6 py-4 text-left text-nowrap">
                  Sr No.
                </th>
                <th className="px-2 sm:px-6 py-4 text-left">Image</th>
                <th className="px-2 sm:px-6 py-4 text-left">Title</th>
                <th className="px-2 sm:px-6 py-4 text-left">Category</th>
                <th className="px-2 sm:px-6 py-4 text-left">Sold</th>
                <th className="px-2 sm:px-6 py-4 text-left">Price</th>
                <th className="px-2 sm:px-6 py-4 text-left">Action</th>
                <th className="px-2 sm:px-6 py-4 text-left">Updated Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-2 sm:px-6 py-4 font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-6 py-4">
                    <img
                      src={product?.productImages[0]?.url}
                      alt="Product"
                      className="w-12 h-12 object-fit rounded"
                    />
                  </td>

                  <td className="px-2 sm:px-6 py-4 truncate max-w-[250px]">
                    {product.title}
                  </td>

                  <td className="px-2 sm:px-6 py-4 truncate max-w-xs text-center">
                    {product.category?.name}
                  </td>

                  <td className="px-2 sm:px-6 py-4 truncate max-w-xs text-center">
                    {product.sold}
                  </td>

                  <td className="px-2 sm:px-6 py-4 truncate max-w-xs text-center">
                    {product.price}
                  </td>

                  <td className="px-2 sm:px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/product/edit/${product._id}`}
                        className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                        title="Edit Product"
                        aria-label="Edit Product"
                      >
                        <SquarePen
                          size={20}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deleteMutation.isLoading}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete product"
                        aria-label="Delete product"
                      >
                        <Trash2
                          size={20}
                          className="text-red-600 hover:text-red-800"
                        />
                      </button>
                    </div>
                  </td>

                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-center">
                    {moment(product.updatedAt).format("DD MMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500 text-lg">
          No products available
        </div>
      )}
    </>
  );
};

export default ProductListingPage;
