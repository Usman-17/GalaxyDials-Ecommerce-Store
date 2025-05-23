import { useQuery } from "@tanstack/react-query";

const useGetAllCategories = () => {
  const {
    data: categories,
    categoryIsLoading,
    categoryError,
    categoryRefetch,
    categoryIsRefetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/category/all");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return response.json();
    },
    retry: false,
  });

  return {
    categories,
    categoryIsLoading,
    categoryError,
    categoryRefetch,
    categoryIsRefetching,
  };
};

export { useGetAllCategories };
