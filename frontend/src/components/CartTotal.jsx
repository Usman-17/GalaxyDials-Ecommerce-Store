import { useContext, useMemo } from "react";
import SectionHeading from "./SectionHeading";
import { AppContext } from "../context/AppContext";
import { useUserCart } from "../hooks/useUserCart";

const CartTotal = () => {
  const { products } = useContext(AppContext);
  const { cartData } = useUserCart();

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

    return total;
  }, [cartData, products]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <SectionHeading text1={"Cart"} text2={"totals"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs. {cartTotalAmount.toLocaleString()}.00</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>Rs. 00.00</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>Rs. {cartTotalAmount.toLocaleString()}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
