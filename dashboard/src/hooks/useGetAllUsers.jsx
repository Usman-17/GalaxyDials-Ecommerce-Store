import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/user/");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    },

    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    users,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  };
};

export { useGetAllUsers };
