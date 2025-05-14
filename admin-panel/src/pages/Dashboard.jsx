import { Card, Container, Row, Col } from "react-bootstrap";
import { ShoppingCart, PackageCheck, Wallet } from "lucide-react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { Empty, Skeleton } from "antd";
import parcel_icon from "../assets/parcel_icon.svg";

const DashboardPage = () => {
  const { products = [] } = useGetAllProducts();
  const { orders = [], ordersError, ordersIsLoading } = useGetAllOrders();

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="app-container pt-4">
            <div className="custom-card">
              {/* Page Title */}
              <div className="page-title d-flex flex-column">
                <h3 className="page-title mb-10">Dashboard</h3>
              </div>

              <Row className="mb-4">
                {/* Total Products */}
                <Col md={4} className="mb-2 lg:mb-0">
                  <Card className="border-primary h-100">
                    <Card.Body className="d-flex align-items-center gap-3">
                      <PackageCheck size={36} className="text-success" />
                      <div>
                        <h4>{products.length.toLocaleString()}</h4>
                        <p className="mb-0 text-muted">Total Products</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Total Orders */}
                <Col md={4} className="mb-2 lg:mb-0">
                  <Card className="border-primary h-100">
                    <Card.Body className="d-flex align-items-center gap-3">
                      <ShoppingCart size={36} className="text-primary" />
                      <div>
                        <h4>{orders.length.toLocaleString()}</h4>
                        <p className="mb-0 text-muted">Total Orders</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Total Revenue */}
                <Col md={4} className="mb-2 lg:mb-0">
                  <Card className="border-primary h-100">
                    <Card.Body className="d-flex align-items-center gap-3">
                      <Wallet size={36} className="text-warning" />
                      <div>
                        <h4>
                          Rs.{" "}
                          {orders
                            .reduce(
                              (acc, order) => acc + (order.amount || 0),
                              0
                            )
                            .toFixed()}
                        </h4>
                        <p className="mb-0 text-muted">Total Revenue</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="page-title d-flex flex-column">
                <h3 className="page-title mb-3">Recent Orders</h3>
              </div>
              {ordersError ? (
                <p>{ordersError.message}</p>
              ) : (
                <>
                  {ordersIsLoading ? (
                    <>
                      <Skeleton active className="mt-2" />
                      <Skeleton active className="mt-2" />
                      <Skeleton active className="mt-2" />
                    </>
                  ) : orders.length > 0 ? (
                    <div>
                      {orders?.slice(0, 5).map((order, orderIndex) => (
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

                            <Col xs={12} sm={3} className="">
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

                            <Col xs={12} sm={3} className="mb-3">
                              <p>
                                <strong>Total:</strong> Rs.{" "}
                                {order.amount.toLocaleString()}
                              </p>
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
    </>
  );
};

export default DashboardPage;
