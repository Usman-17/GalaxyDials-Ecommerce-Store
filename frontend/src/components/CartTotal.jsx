import SectionHeading from "./SectionHeading";

const CartTotal = () => {
  return (
    <div className="w-full">
      <div className="text-2xl">
        <SectionHeading text1={"Cart"} text2={"Total"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs. 5000</p>
        </div>
        <hr />

        <div className="flex justify-between text-green-500">
          <p>Shipping Charges</p>
          <p>0</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>Rs. 5000</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
