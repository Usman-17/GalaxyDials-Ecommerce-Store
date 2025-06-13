import { useQuery } from "@tanstack/react-query";

const useUserCart = () => {
  const {
    data: cartData,
    isLoading: cartIsLoading,
    error: cartError,
    refetch: cartRefetch,
    isRefetching: cartIsRefetching,
  } = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart/get");

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data = await response.json();
      return data.cartData;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    cartData,
    cartIsLoading,
    cartError,
    cartRefetch,
    cartIsRefetching,
  };
};

export { useUserCart };
