import { createContext, useMemo } from "react";
import { useUserCart } from "../hooks/useUserCart";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// imports End

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { products, productIsLoading } = useGetAllProducts();
  const { cartData } = useUserCart();

  // Cart Total
  const cartTotalAmount = useMemo(() => {
    let total = 0;

    if (!products || !cartData) return 0;

    for (const productId in cartData) {
      const product = products.find((p) => p._id === productId);

      if (!product) {
        console.warn("Product not found for ID:", productId);
        continue;
      }

      const colors = cartData[productId];
      if (typeof colors === "number") {
        const quantity = colors;
        const price = Number(product.price);

        if (!isNaN(price)) {
          total += quantity * price;
        } else {
          console.warn("Invalid price for product:", product);
        }
      } else {
        // Handle products with colors
        for (const color in colors) {
          const quantity = colors[color];
          const price = Number(product.price);

          if (!isNaN(price)) {
            total += quantity * price;
          } else {
            console.warn("Invalid price for product:", product);
          }
        }
      }
    }

    return total;
  }, [cartData, products]);

  const value = {
    products,
    productIsLoading,
    cartTotalAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
