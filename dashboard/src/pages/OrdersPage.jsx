import parcel_icon from "../assets/parcel_icon.svg";
import toast from "react-hot-toast";
import { Ban, CheckCircle, Printer, Truck, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import SectionHeading from "../components/SectionHeading";
import OrdersSkeleton from "../components/Skeletons/OrdersSkeleton";
import SummaryCard from "../components/SummaryCard";
import { handlePrint } from "../utils/printUtils";

const OrdersPage = () => {
  const queryClient = useQueryClient();
  const { orders = [], error, isLoading } = useGetAllOrders();

  // Count logic
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
  const pendingOrders = orders.filter(
    (o) => !["Delivered", "Cancelled"].includes(o.status)
  ).length;

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const res = await fetch(`/api/order/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      return res.json();
    },
    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries(["orders"]);
      const previousOrders = queryClient.getQueryData(["orders"]);
      queryClient.setQueryData(["orders"], (oldOrders) =>
        oldOrders?.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      return { previousOrders };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["orders"], context.previousOrders);
      toast.error("Failed to update order status");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onSuccess: () => {
      toast.success("Order status updated");
    },
  });

  const statusColors = {
    Delivered: "text-green-600",
    Cancelled: "text-red-600",
  };

  return (
    <div>
      <SectionHeading
        title="Orders List"
        subtitle="Manage all users orders below"
      />

      {isLoading ? (
        <OrdersSkeleton />
      ) : error ? (
        <p className="p-4 text-red-500">
          Failed to load orders. Please try again.
        </p>
      ) : totalOrders === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <img
            src={parcel_icon}
            alt="No Orders"
            className="mx-auto mb-4 w-20 h-20 opacity-50"
          />
          <p className="text-lg font-medium">No orders found.</p>
          <p className="text-sm mt-1">
            Once orders are placed, they will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <SummaryCard
              icon={Users}
              title="Total Orders"
              count={totalOrders}
              color="#3B82F6"
            />
            <SummaryCard
              icon={CheckCircle}
              title="Delivered"
              count={deliveredOrders}
              color="#10B981"
            />
            <SummaryCard
              icon={Truck}
              title="Pending"
              count={pendingOrders}
              color="#F59E0B"
            />
            <SummaryCard
              icon={Ban}
              title="Cancelled"
              count={cancelledOrders}
              color="#EF4444"
            />
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-start">
                  {/* Icon */}
                  <div className="hidden sm:flex sm:justify-start ">
                    <img
                      src={parcel_icon}
                      alt="Order Icon"
                      className="w-14 h-14"
                    />
                  </div>

                  {/* Items + Address */}
                  <div className="col-span-2 space-y-2">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center text-sm"
                      >
                        <span className="mr-1 font-medium">
                          {itemIndex + 1}.
                        </span>

                        <span className="font-light flex items-center gap-2">
                          <strong className="block max-w-[200px] truncate">
                            {item.title}
                          </strong>
                          x {item.quantity}
                          {item.color && (
                            <span className="ml-2 inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
                              {item.color}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}

                    <div className="pt-3 text-sm">
                      <p className="font-semibold">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-gray-500">
                        {order.address.address}, {order.address.city}
                      </p>
                      <p className="text-gray-500">{order.address.phone}</p>
                    </div>
                  </div>

                  {/* Payment + Date */}
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>Products: {order.items.length}</p>
                    <p>Method: {order.paymentMethod}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>

                  {/* Total + Actions */}
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-semibold">
                      Total: Rs. {order.amount.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus({
                            orderId: order._id,
                            status: e.target.value,
                          })
                        }
                        className={`cursor-pointer text-sm border rounded px-2 py-1 focus:outline-none ${
                          statusColors[order.status] || "text-yellow-600"
                        }`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <div>
                        <Printer
                          size={24}
                          onClick={() => handlePrint(order)}
                          className="cursor-pointer hover:text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
