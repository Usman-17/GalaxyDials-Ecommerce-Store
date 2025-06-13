import toast from "react-hot-toast";
import useGetAuth from "./useGetAuth";
import { useGetAllProducts } from "./useGetAllProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { products } = useGetAllProducts();
  const { data: authUser } = useGetAuth();

  const { mutate, isPending: cartIsPending } = useMutation({
    mutationFn: async ({ itemId, color, quantity }) => {
      if (!authUser) throw new Error("Please log in first.");

      const product = products?.find((p) => p._id === itemId);

      const hasColors = product?.colors?.length > 0;
      if (hasColors && !color) {
        throw new Error("Please select a product color!");
      }

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          itemId,
          color: hasColors ? color : "default",
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      queryClient.invalidateQueries(["authUser"]);
    },

    onSuccess: () => {
      toast.success("Added to cart successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  return { addToCart: mutate, cartIsPending };
};
