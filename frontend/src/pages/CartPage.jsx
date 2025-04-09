import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";
import { Trash, Redo } from "lucide-react";
import { Helmet } from "react-helmet";
import { useUserCart } from "../hooks/useUserCart";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CartPage = () => {
  const { products } = useContext(AppContext);
  const { cartData } = useUserCart();
  const cartItems = [];

  // Flatten cart data into usable format
  for (const productId in cartData) {
    const product = products?.find((p) => p._id === productId);
    const colorObj = cartData[productId];

    for (const color in colorObj) {
      const quantity = colorObj[color];

      cartItems.push({
        productId,
        color,
        quantity,
        ...product,
      });
    }
  }

  cartItems.reverse();

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

          <div className="">
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={item?.productImages?.[0]?.url}
                      alt="Product"
                      className="w-16 sm:w-20"
                    />

                    <div className="text-xs sm:text-lg font-medium">
                      <p className="truncate w-52 sm:w-96">{item?.title}</p>

                      <div className="flex items-center gap-5 mt-2">
                        <p>Rs. {item?.price}</p>

                        {/* Color */}
                        <p className="px-2 sm:py-1 border bg-slate-50 text-sm">
                          {item.color}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <input
                    className="border border-gray-300 rounded-md max-w-[80px] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-100 w-full sm:w-auto"
                    type="number"
                    min={1}
                    value={item.quantity}
                  />

                  {/* Remove */}
                  <Trash
                    className="cursor-pointer mr-4 sm:mr-5 hover:text-red-600 transition-colors duration-100 ease-in-out"
                    size={20}
                  />
                </div>
              );
            })}
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
