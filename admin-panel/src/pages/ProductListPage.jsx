import { useState } from "react";
import toast from "react-hot-toast";
import { Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { Empty, Row, Skeleton, Table, Tag, Modal, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    sorter: (a, b) => a.price.localeCompare(b.price),
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
  const queryClient = useQueryClient();
  const [deletingProductId, setDeletingProductId] = useState(null);

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

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeletingProductId(null);
    },

    onError: () => {
      toast.error("Failed to delete product");
      setDeletingProductId(null);
    },
  });

  const handleDeleteProduct = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setDeletingProductId(id);
        deleteProduct(id);
      },
    });
  };

  const data = products?.map((product, i) => ({
    key: i + 1,
    img: product?.productImages[0]?.url || "placeholder-image-url",
    title: product?.title,
    category: product.category,
    price: `Rs. ${product.price}`,
    salePrice: `Rs. ${product.salePrice || product.price}`,

    action: (
      <div className="d-flex align-items-center">
        <EditButton to={`/product/edit/${product._id}`} />

        {deletingProductId === product._id ? (
          <Spin className="ms-4" />
        ) : (
          <DeleteButton
            onClick={() => handleDeleteProduct(product._id)}
            disabled={deletingProductId !== null}
          />
        )}
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
