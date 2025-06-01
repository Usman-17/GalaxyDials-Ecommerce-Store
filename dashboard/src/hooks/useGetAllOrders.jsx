import { useQuery } from "@tanstack/react-query";

const useGetAllOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("/api/order/all");

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return response.json();
    },
    retry: false,
  });

  return {
    orders,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  };
};

export { useGetAllOrders };
