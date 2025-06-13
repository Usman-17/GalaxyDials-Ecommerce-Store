import { useQuery } from "@tanstack/react-query";

const useGetAllBrands = () => {
  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch("/api/brand/all");

      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }

      return response.json();
    },

    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    brands,
    brandIsLoading: isLoading,
    isError,
    error,
  };
};

export { useGetAllBrands };
