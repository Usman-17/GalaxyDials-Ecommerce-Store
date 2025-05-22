import { useState } from "react";

import toast from "react-hot-toast";
import { Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Table, Skeleton, Modal, Empty, Spin } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { useGetAllBrands } from "../hooks/useGetAllBrands";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const BrandListingPage = () => {
  const { brands = [], brandIsLoading, brandError } = useGetAllBrands();
  const queryClient = useQueryClient();
  const [deletingBrandId, setDeletingBrandId] = useState(null);

  const { mutate: deleteBrand } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/brand/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete brand");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      setDeletingBrandId(null);
    },
    onError: () => {
      toast.error("Failed to delete brand");
      setDeletingBrandId(null);
    },
  });

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setDeletingBrandId(id);
        deleteBrand(id);
      },
    });
  };

  const data = brands.map((brand, index) => ({
    key: index + 1,
    Name: brand.name,
    action: (
      <div className="d-flex align-items-center">
        <EditButton to={`/brand/edit/${brand._id}`} />
        {deletingBrandId === brand._id ? (
          <Spin className="ms-4" />
        ) : (
          <DeleteButton
            onClick={() => handleDelete(brand._id)}
            disabled={!!deletingBrandId}
          />
        )}
      </div>
    ),
  }));

  const columns = [
    {
      title: "Sr No.",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      className: "column-fix",
    },
    {
      title: "Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      className: "column-fix truncate",
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "column-fix",
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col className="app-container mb-5 mb-lg-0 pt-4">
          <div className="custom-card">
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
              <div className="page-title">
                <h3 className="mb-0">View All Brands</h3>
                <p className="mb-2 mb-lg-0">View and manage all brands</p>
              </div>

              <Link to="/brand/add" className="w-fit">
                <button className="button border-0 d-flex align-items-center gap-2">
                  <Redo size={18} />
                  <span>Add New Brand</span>
                </button>
              </Link>
            </div>

            {brandError ? (
              <p className="text-danger">{brandError.message}</p>
            ) : brandIsLoading ? (
              <Skeleton active className="mt-5" />
            ) : brands.length > 0 ? (
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: "auto" }}
              />
            ) : (
              <Empty description="No brands found" />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BrandListingPage;
