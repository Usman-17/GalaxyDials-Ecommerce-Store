import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ShoppingBag, Redo } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import OrderSkeleton from "../components/Skeleton/OrderSkeleton";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
// Imports End

const MyOrdersPage = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  // Get User Order Query
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["userOrders", authUser?._id],
    queryFn: async () => {
      const res = await fetch("/api/order/userorders");
      if (!res.ok) throw new Error("Failed to fetch user orders");
      const result = await res.json();
      return result.orders;
    },
    enabled: !!authUser?._id,
    retry: false,
  });

  // Cancel Order Mutation
  const { mutate: cancelOrder } = useMutation({
    mutationFn: async (orderId) => {
      setCancellingOrderId(orderId);
      const res = await fetch(`/api/order/status/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) throw new Error("Failed to cancel order");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["userOrders", authUser?._id]);
      toast.success("Order cancelled successfully");
    },

    onError: () => {
      toast.error("Unable to cancel order");
    },

    onSettled: () => {
      setCancellingOrderId(null);
    },
  });

  return (
    <div className="border-t border-gray-300 pt-4 sm:pt-8 min-h-screen">
      <div className="sm:mb-6">
        <SectionHeading text1="My" text2="Orders" />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        ) : Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm flex-col">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <p>{idx + 1}.</p>
                    <img
                      src={item.productImages?.[0]?.url}
                      alt={item.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="sm:text-base font-medium w-full sm:w-96">
                        {item.title}
                      </p>
                      <div className="flex gap-3 mt-1 text-base">
                        <p>Rs. {item.price.toLocaleString()}</p>
                        <p>
                          <strong>Qty:</strong> {item.quantity}
                        </p>

                        {item.color && (
                          <p>
                            <strong>Color:</strong> {item.color}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-2">
                  <p>
                    Date:{" "}
                    <span className="text-gray-800 font-medium">
                      {new Date(order.date).toDateString()}
                    </span>
                  </p>
                  <p>
                    Payment:{" "}
                    <span className="text-gray-800 font-medium">
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p>
                    Total Amount:{" "}
                    <span className="text-gray-800 font-medium">
                      Rs. {order.amount?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : order.status === "Out for delivery"
                        ? "bg-orange-500"
                        : order.status === "Packing"
                        ? "bg-purple-500"
                        : order.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                  <p className="text-sm md:text-base font-medium capitalize">
                    {order.status}
                  </p>
                </div>

                {order.status === "Order Placed" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    disabled={cancellingOrderId === order._id}
                    className="border px-4 py-2 text-sm font-medium rounded-sm border-gray-500 cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    {cancellingOrderId === order._id
                      ? "Cancelling..."
                      : "Cancel My Order"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          authUser && (
            <div className="text-center py-28 text-gray-500">
              <ShoppingBag size={64} className="mx-auto mb-3" />
              <p className="text-lg font-medium">You have no orders yet.</p>
              <Link
                to="/collection"
                className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                <p>Continue Shopping</p>
                <Redo size={20} />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
