import { useQuery } from "@tanstack/react-query";

const useGetAllOrders = () => {
  const {
    data: orders,
    ordersIsLoading,
    ordersError,
    ordersRefetch,
    ordersIsRefetching,
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
    ordersIsLoading,
    ordersError,
    ordersRefetch,
    ordersIsRefetching,
  };
};

export { useGetAllOrders };
