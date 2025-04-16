import parcel_icon from "../assets/parcel_icon.svg";

import { Printer } from "lucide-react";
import { Empty, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Col, Container, Row } from "react-bootstrap";
// Imports End

const OrdersPage = () => {
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
                              <select className="form-select">
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
