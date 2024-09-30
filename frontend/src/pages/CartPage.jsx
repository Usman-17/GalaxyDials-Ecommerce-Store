import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";
import img from "../assets/watch.webp";
import { Trash, Redo } from "lucide-react";
import { Helmet } from "react-helmet";

const CartPage = () => {
  return (
    <>
      <Helmet>
        <title>Shopping Cart - GalaxyDials</title>
        <meta
          name="description"
          content="Review the items in your shopping cart and proceed to checkout for premium wristwatches at GalaxyDials."
        />
        <meta
          name="keywords"
          content="shopping cart, wristwatches, luxury watches, men's watches, women's watches, GalaxyDials"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shopping Cart - GalaxyDials" />
        <meta
          property="og:description"
          content="Check your selected wristwatches and finalize your purchase at GalaxyDials."
        />
        <meta property="og:url" content="https://galaxydials.com/cart" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://galaxydials.com/cart" />
      </Helmet>

      <div className="border-t pt-4 sm:pt-14">
        <div className="mb-3">
          <SectionHeading text1={"Shopping"} text2={"Cart"} />

          <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
            <div className="flex items-start gap-2 sm:gap-6">
              <img
                src={img}
                alt=""
                className="w-16 sm:w-20 rounded-b-md"
                loading="lazy"
                decoding="async"
              />

              <div>
                {/* title */}
                <p
                  className="text-xs sm:text-lg font-medium"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.3",
                  }}
                >
                  POEDAGAR Luxury Men ograph P996 POEDAGAR Luxury
                </p>

                <div className="flex items-center gap-5 sm:mt-2">
                  {/* Price */}
                  <p className="text-sm sm:text-lg">Rs. 4000</p>

                  {/* Color */}
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm rounded">
                    Gold
                  </p>
                </div>
              </div>
            </div>

            <input
              type="number"
              min={1}
              max={5}
              defaultValue={1}
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
            />

            <Trash
              className="cursor-pointer mr-4 sm:mr-5 hover:text-red-600 transition-colors duration-100 ease-in-out"
              size={20}
            />
          </div>

          <div className="flex justify-end my-20 ">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button className="bg-black text-white text-sm my-8 px-3 py-2.5 sm:px-6 sm:py-3 rounded flex items-center gap-1 justify-end float-end">
                  PROCEED TO CHECKOUT
                  <Redo size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
