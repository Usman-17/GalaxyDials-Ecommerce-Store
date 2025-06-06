import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
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

  return {
    products,
    productIsLoading: isLoading,
    productError: isError,
    productRefetch: refetch,
    productIsRefetching: isRefetching,
  };
};

export { useGetAllProducts };
