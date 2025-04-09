import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// imports End

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { products, productIsLoading } = useGetAllProducts();

  // Fetching User
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.error || !res.ok) return null;
      return data;
    },
    retry: false,
  });

  const value = {
    products,
    productIsLoading,
    authUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
