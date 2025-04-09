import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { authUser } = useContext(AppContext);

  const { mutate, isPending: cartIsPending } = useMutation({
    mutationFn: async ({ itemId, color, quantity }) => {
      if (!authUser) {
        throw new Error("Please log in first.");
      }

      if (!color) {
        throw new Error("Please select a product color!");
      }

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ itemId, color, quantity }),
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
