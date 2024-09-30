import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";

const PlaceOrderPage = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:gap-5 pt-3 sm:pt-14 min-h-[80vh] border-t sm:px-32">
      {/* -----Left Side----- */}
      <div className="flex flex-col gap-2 sm:gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <SectionHeading text1={"DELIVERY  "} text2={"INFORMATION"} />
        </div>

        <form className="flex flex-col gap-4">
          {/* Name Inputs */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            inputMode="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded py-2 px-4 w-full"
            required
          />

          {/* Street */}
          <input
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded py-2 px-4 w-full"
            required
          />

          {/* City & State */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              required
            />
            <input
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded py-2 px-4 w-full"
              required
            />
          </div>

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            inputMode="numeric"
            minLength={11}
            maxLength={11}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            required
          />
        </form>
      </div>

      {/* ------Right Side----- */}
      <div className="mt-5">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <SectionHeading text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className="min-w-3.5 h-3.5 border rounded-full bg-green-400"></p>
            <p className="text-grap-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
          <div className="w-full mt-8">
            <button
              type="submit"
              className="bg-black text-white text-sm px-6 py-2.5 sm:px-8 sm:py-3 w-full text-center rounded"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
