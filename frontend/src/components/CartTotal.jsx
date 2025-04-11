import { useContext } from "react";
import SectionHeading from "./SectionHeading";
import { AppContext } from "../context/AppContext";

const CartTotal = () => {
  const { cartTotalAmount } = useContext(AppContext);

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
