import parcel_icon from "../assets/parcel_icon.svg";

import toast from "react-hot-toast";
import { Printer } from "lucide-react";
import { Empty, Skeleton } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Imports End

const OrdersPage = () => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await fetch("/api/order/all");
      if (!res.ok) throw new Error("Failed to fetch Enquires");
      const result = await res.json();
      return result.orders;
    },
    retry: false,
  });

  // Update Order Status Mutation
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

    // Optimistic Update
    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries(["allOrders"]);

      const previousOrders = queryClient.getQueryData(["allOrders"]);

      queryClient.setQueryData(["allOrders"], (oldOrders) =>
        oldOrders?.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );

      return { previousOrders };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["allOrders"], context.previousOrders);
      toast.error("Failed to update order status");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["allOrders"]);
    },

    onSuccess: () => {
      toast.success("Order status updated");
    },
  });

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="pt-4 app-container">
            <div className="custom-card">
              <div className="page-title d-flex flex-column">
                <h3 className="page-title mb-0">Orders Details</h3>
                <p className="text-muted">View and Manage All Orders</p>
              </div>

              {error ? (
                <p>{error.message}</p>
              ) : (
                <>
                  {isLoading ? (
                    <>
                      <Skeleton active className="mt-2" />
                      <Skeleton active className="mt-2" />
                      <Skeleton active className="mt-2" />
                    </>
                  ) : orders.length > 0 ? (
                    <div>
                      {orders?.map((order, orderIndex) => (
                        <div
                          key={orderIndex}
                          className="border rounded p-3 mb-4"
                        >
                          <Row className="align-items-start">
                            <Col xs={12} sm={1} className="mb-3">
                              <img
                                src={parcel_icon}
                                alt="Order Icon"
                                className="w-14"
                              />
                            </Col>

                            <Col xs={12} sm={5} className="mb-3">
                              {order?.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="d-flex">
                                  <p className="me-1">{itemIndex + 1}.</p>
                                  <span>
                                    <strong>{item?.title}</strong> x{" "}
                                    {item?.quantity}
                                    <span className="ms-2 px-2 py-1 bg-light rounded text-muted small">
                                      {item?.color}
                                    </span>
                                  </span>
                                </div>
                              ))}

                              {/* User Info */}
                              <p className="mt-3 fw-semibold mb-0">
                                {order?.address.firstName}{" "}
                                {order?.address.lastName}
                              </p>
                              <p className="text-muted mb-1">
                                {order?.address.address}, {order?.address.city}
                              </p>
                              <p className="text-muted mb-0">
                                {order?.address.phone}
                              </p>
                            </Col>

                            <Col xs={12} sm={2} className="">
                              <p className="mb-0">
                                Products: {order?.items?.length}
                              </p>
                              <p className="mb-0">
                                Method: {order.paymentMethod}
                              </p>
                              <p>
                                Date:{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </Col>

                            <Col xs={12} sm={2} className="mb-3">
                              <p>
                                <strong>Total:</strong> Rs.{" "}
                                {order.amount.toLocaleString()}
                              </p>
                            </Col>

                            <Col
                              xs={12}
                              sm={2}
                              className="d-flex align-items-center gap-3"
                            >
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateStatus({
                                    orderId: order._id,
                                    status: e.target.value,
                                  })
                                }
                                className="form-select"
                              >
                                <option value="Order Placed">
                                  Order Placed
                                </option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">
                                  Out for delivery
                                </option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>

                              <Printer size={40} />
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty description="No data available" className="py-5" />
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrdersPage;
