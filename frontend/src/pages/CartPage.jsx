import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash, Redo, ShoppingCart, ChevronDown } from "lucide-react";

import CartTotal from "../components/CartTotal";
import SectionHeading from "../components/SectionHeading";

import { useUserCart } from "../hooks/useUserCart";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// Imports End

// Helper to generate a consistent unique key
const getCartItemKey = (itemId, color = "") =>
  `${itemId}-${color || "no-color"}`;

const CartPage = () => {
  const queryClient = useQueryClient();
  const { cartData } = useUserCart();
  const { products = [] } = useGetAllProducts();

  const [updatingItemKey, setUpdatingItemKey] = useState(null);
  const [removingItemKey, setRemovingItemKey] = useState(null);

  const cartItems = useMemo(() => {
    const items = [];
    for (const productId in cartData) {
      const product = products.find((p) => p._id === productId);
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

  // Update Cart Mutation
  const { mutate: updateCartMutation } = useMutation({
    mutationFn: async ({ itemId, color, quantity }) => {
      const key = getCartItemKey(itemId, color);
      setUpdatingItemKey(key);

      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ itemId, color, quantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(["userCart"]),
    onError: () => toast.error("Something went wrong"),
    onSettled: () => setTimeout(() => setUpdatingItemKey(null), 300),
  });

  // Delete Cart Mutation
  const { mutate: deleteCartMutation } = useMutation({
    mutationFn: async ({ itemId, color }) => {
      const key = getCartItemKey(itemId, color);
      setRemovingItemKey(key);

      const res = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ itemId, color }),
      });

      if (!res.ok) throw new Error("Failed to delete cart item");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["userCart"]);
      toast.success("Product removed from cart");
    },

    onError: () => toast.error("Something went wrong"),
    onSettled: () => setTimeout(() => setRemovingItemKey(null), 300),
  });

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Jemzy.pk</title>
        <meta
          name="description"
          content="Review your selected jewelry items and proceed to checkout. Enjoy timeless elegance with Jemzy.pk — Pakistan's premium jewelry store."
        />
        <meta
          name="keywords"
          content="Jemzy.pk cart, shopping cart jewelry, earrings, rings, necklaces, bracelets, checkout jewelry Pakistan"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shopping Cart - Jemzy.pk" />
        <meta
          property="og:description"
          content="Check your selected jewelry pieces and finalize your order at Jemzy.pk."
        />
        <meta property="og:url" content="https://www.jemzy.pk/cart" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.jemzy.pk/cart" />
      </Helmet>

      <div className="border-t pt-4 sm:pt-14 mb-16">
        <div className="mb-3">
          <SectionHeading text1="Shopping" text2="Cart" />

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
              const itemKey = getCartItemKey(item.productId, item.color);

              return (
                <div
                  key={itemKey}
                  className="py-4 border-t border-b border-gray-200 text-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-start gap-4">
                      <p className="text-sm">{i + 1}.</p>
                      <img
                        src={item?.productImages?.[0]?.url}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p
                          className="font-semibold sm:font-medium w-full sm:w-96 text-sm sm:text-base leading-tight truncate text-wrap"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item?.title}
                        </p>

                        <div className="flex items-center gap-2 text-sm mt-1">
                          <p>Rs. {item?.price}</p>

                          {item.color && (
                            <span className="px-2 py-0.5 border rounded bg-gray-50 text-gray-700 text-xs">
                              {item.color}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:ml-auto items-center gap-4 sm:gap-6 justify-between">
                      {/* Quantity Selector */}
                      <div className="my-2 w-full max-w-xs flex items-center gap-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Qty:
                        </label>

                        <div className="relative">
                          <select
                            id={`quantity-select-${item._id}`}
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartMutation({
                                itemId: item.productId,
                                color: item.color,
                                quantity: Number(e.target.value),
                              })
                            }
                            className="block appearance-none w-full bg-[#fffaf1] border border-gray-300 text-gray-800 py-1 px-3 pr-8 rounded-md leading-tight focus:outline-none transition duration-150 ease-in-out cursor-pointer"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              )
                            )}
                          </select>

                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            {updatingItemKey === itemKey ? (
                              <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-700" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      {removingItemKey === itemKey ? (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span className="block w-4 h-4 border-[2px] border-red-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        <Trash
                          onClick={() =>
                            deleteCartMutation({
                              itemId: item.productId,
                              color: item.color,
                            })
                          }
                          className="cursor-pointer hover:text-red-600 transition"
                          size={22}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {cartItems.length > 0 && (
            <div className="flex justify-end my-10">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                  <Link
                    to={"/place-order"}
                    className="bg-black text-white text-sm my-8 px-3 py-2.5 sm:px-6 sm:py-3 rounded flex items-center gap-2 justify-end float-end"
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
