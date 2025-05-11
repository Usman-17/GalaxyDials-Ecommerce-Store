import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Trash, Redo, ShoppingCart } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";

import { useUserCart } from "../hooks/useUserCart";
import { AppContext } from "../context/AppContext";
// imports End

const CartPage = () => {
  const [localQuantities, setLocalQuantities] = useState({});

  const queryClient = useQueryClient();

  const { cartData } = useUserCart();
  const { products } = useContext(AppContext);

  const cartItems = useMemo(() => {
    const items = [];

    for (const productId in cartData) {
      const product = products?.find((p) => p._id === productId);
      const data = cartData[productId];

      if (typeof data === "number") {
        items.push({ productId, color: "", quantity: data, ...product });
      } else {
        for (const color in data) {
          items.push({ productId, color, quantity: data[color], ...product });
        }
      }
    }

    return items.reverse();
  }, [cartData, products]);

  // Delete Cart Item Mutation
  const { mutate: deleteCartMutation } = useMutation({
    mutationFn: async ({ itemId, color }) => {
      const res = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ itemId, color }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userCart"]);
      toast.success("Product removed from cart");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // Update Cart Mutation
  const { mutate: updateCartMutation } = useMutation({
    mutationFn: async ({ itemId, color, quantity }) => {
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ itemId, color, quantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userCart"]);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // Setup local quantities
  useEffect(() => {
    const initial = {};
    cartItems.forEach((item) => {
      const key = `${item.productId}_${item.color}`;
      initial[key] = item.quantity;
    });
    setLocalQuantities(initial);
  }, [cartItems]);

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

      <div className="border-t pt-4 sm:pt-14 mb-16">
        <div className="mb-3">
          <SectionHeading text1={"Shopping"} text2={"Cart"} />

          <div>
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <ShoppingCart size={64} className="mx-auto mb-4" />
                <p className="text-xl font-semibold">Your cart is empty</p>
                <Link
                  to="/collection"
                  className="mt-6 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item, i) => {
                const key = `${item.productId}_${item.color}`;
                return (
                  <div
                    key={i}
                    className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <p>{i + 1}</p>
                      <img
                        src={item?.productImages?.[0]?.url}
                        alt="Product"
                        className="w-12"
                      />
                      <div className="text-xs sm:text-lg font-medium">
                        <p className="truncate w-52 sm:w-96">{item?.title}</p>
                        <div className="flex items-center gap-5 mt-2">
                          <p>Rs. {item?.price}</p>

                          {item.color && (
                            <p className="px-2 sm:py-1 border bg-slate-50 text-sm">
                              {item.color}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <input
                      className="w-20 sm:w-24 text-center text-sm sm:text-base font-medium bg-white border border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 rounded-lg shadow-sm px-2 py-2 transition-all duration-200 outline-none"
                      type="number"
                      min={1}
                      value={localQuantities[key] || item.quantity}
                      onChange={(e) => {
                        const newQty = Number(e.target.value);
                        setLocalQuantities((prev) => ({
                          ...prev,
                          [key]: newQty,
                        }));
                      }}
                      onBlur={(e) => {
                        const newQty = Number(e.target.value);
                        if (newQty !== item.quantity) {
                          updateCartMutation({
                            itemId: item.productId,
                            color: item.color,
                            quantity: newQty,
                          });
                        }
                      }}
                    />

                    <Trash
                      onClick={() =>
                        deleteCartMutation({
                          itemId: item.productId,
                          color: item.color,
                        })
                      }
                      className="cursor-pointer mr-4 sm:mr-5 hover:text-red-600 transition-colors duration-100 ease-in-out"
                      size={20}
                    />
                  </div>
                );
              })
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                  <Link
                    to={"/place-order"}
                    className="bg-black text-white text-sm my-8 px-3 py-2.5 sm:px-6 sm:py-3 rounded flex items-center gap-1 justify-end float-end"
                  >
                    PROCEED TO CHECKOUT
                    <Redo size={18} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
