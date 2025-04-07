import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  const {
    data: products,
    productIsLoading,
    productError,
    productRefetch,
    productIsRefetching,
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
    productIsLoading,
    productError,
    productRefetch,
    productIsRefetching,
  };
};

export { useGetAllProducts };
