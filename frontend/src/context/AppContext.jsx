import { createContext } from "react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { products, productIsLoading } = useGetAllProducts();
  const value = {
    products,
    productIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
