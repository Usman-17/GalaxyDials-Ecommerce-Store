import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../components/SectionHeading";
import OrderSkeleton from "../components/Skeleton/OrderSkeleton";

const OrdersPage = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const res = await fetch("/api/order/userorders");
      if (!res.ok) {
        throw new Error("Failed to fetch user orders");
      }
      const result = await res.json();
      return result.orders;
    },
    retry: false,
  });

  return (
    <div className="border-t border-gray-300 pt-4 sm:pt-12">
      <div className="text-2xl font-semibold mb-6">
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
                      className="w-12 sm:w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="sm:text-base font-medium flex-wrap w-80 sm:w-96">
                        {item.title}
                      </p>

                      <div className="flex gap-3 mt-1 text-base">
                        <p>Rs. {item.price.toLocaleString()}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Color: {item.color}</p>
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
                        : order.status === "Cancel"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                  <p className="text-sm md:text-base font-medium capitalize">
                    {order.status}
                  </p>
                </div>

                {order.status === "Order Placed" && (
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm border-gray-500 cursor-pointer hover:bg-gray-200 transition">
                    Cancel My Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
