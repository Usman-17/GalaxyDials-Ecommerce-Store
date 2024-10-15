import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/product/all");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
    retry: false,
  });

  return { products, isLoading, error, refetch, isRefetching };
};

export { useGetAllProducts };
