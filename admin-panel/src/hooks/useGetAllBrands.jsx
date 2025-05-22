import { useQuery } from "@tanstack/react-query";

const useGetAllBrands = () => {
  const {
    data: brands,
    brandIsLoading,
    brandError,
    brandRefetch,
    brandIsRefetching,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch("/api/brand/all");

      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }

      return response.json();
    },
    retry: false,
  });

  return {
    brands,
    brandIsLoading,
    brandError,
    brandRefetch,
    brandIsRefetching,
  };
};

export { useGetAllBrands };
