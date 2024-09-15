import { Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Empty, Row, Skeleton, Table, Tag } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
// imports End

const columns = [
  {
    title: "Sr No.",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    className: "column-fix",
  },
  {
    title: "Image",
    dataIndex: "img",
    className: "column-fix",
    render: (imgUrl) => (
      <img
        src={imgUrl}
        alt="Product"
        loading="lazy"
        decoding="async"
        style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    className: "column-fix",
    render: (text) => (
      <div className="d-inline-block w-100 text-truncate">{text}</div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
    className: "column-fix",
  },
  {
    title: "Price",
    dataIndex: "price",
    className: "column-fix",
  },
  {
    title: "Sale Price",
    dataIndex: "salePrice",
    className: "column-fix",
    render: (text) => (
      <Tag color="red" style={{ fontSize: "16px" }}>{`${text}`}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    className: "column-fix",
  },
];

const ProductListPage = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/product/all");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    retry: false,
  });

  const data = products?.map((product, i) => ({
    key: i + 1,
    img: product?.productImages[1]?.url || "placeholder-image-url",
    title: product?.title,
    category: product.category,
    price: `Rs. ${product.price}`,
    salePrice: `Rs. ${product.salePrice || product.price}`,

    action: (
      <div className="d-flex">
        <EditButton />
        <DeleteButton />
      </div>
    ),
  }));

  return (
    <Container fluid>
      <Row>
        <Col lg={2} className="d-none d-lg-flex"></Col>

        <Col lg={10} className="app-container mb-5 mb-lg-0 pt-4">
          <div className="d-flex align-nav-item justify-content-between">
            <div className="d-flex flex-column mb-2">
              <h3 className="page-title mb-0">View All Products</h3>
              <p>View and Manage All Products</p>
            </div>

            <Link to="/product/add" className="w-fit">
              <button className="button border-0 d-flex align-items-center gap-2">
                <Redo size={18} />
                Add New Product
              </button>
            </Link>
          </div>

          {error ? (
            <p>{error.message}</p>
          ) : (
            <>
              {isLoading ? (
                <Skeleton active className="mt-5" />
              ) : products?.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={data}
                  scroll={{ x: true }}
                />
              ) : (
                <Empty description="No data available" />
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
