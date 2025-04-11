import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";
import { AppContext } from "../context/AppContext";
import { useUserCart } from "../hooks/useUserCart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Redo } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const PlaceOrderPage = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { cartTotalAmount } = useContext(AppContext);
  const { cartData } = useUserCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartData || Object.keys(cartData).length === 0) {
      toast.error("Cart is empty.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const response = await fetch("/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          cart: cartData,
          totalAmount: cartTotalAmount,
          deliveryInfo: formData,
        }),
      });

      if (response.ok) {
        toast.success("Your order has been placed successfully!");
        navigate("/order");
      } else {
        toast.error("Unable to place your order. Please try again later.");
      }

      await response.json();
    } catch {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[100vh] border-t border-gray-300 px-0 sm:px-20"
    >
      {/*----- Left Side -----*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <SectionHeading text1={"Delivery"} text2={"information"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <input
            required
            type="text"
            placeholder="0300 0000000"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
      </div>

      {/*----- Right Side -----*/}
      <div className="mt-0 sm:mt-8">
        <div className="mt-4 sm:mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <SectionHeading text1={"payment"} text2={"method"} />

          {/* ----Payment Method Selection--- */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border border-gray-300 rounded px-4 py-3 cursor-pointer w-full sm:w-auto hover:shadow-sm transition">
              <span className="min-w-3.5 h-3.5 border border-gray-600 bg-green-400 rounded-full" />
              <p className="ml-3 text-sm text-gray-700 font-medium">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-5 mb-10">
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full sm:w-full bg-black text-white text-sm font-medium px-10 py-3 rounded hover:bg-gray-900 transition-all duration-200 flex items-center justify-center gap-2 mx-auto sm:mx-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPlacingOrder ? (
                <LoadingSpinner content="PLACING ORDER..." />
              ) : (
                <>
                  PLACE ORDER
                  <Redo size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
