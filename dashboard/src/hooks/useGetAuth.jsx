import { useQuery } from "@tanstack/react-query";

const fetchAuthUser = async () => {
  const res = await fetch("/api/auth/user", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
};

const useGetAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetAuth;
