import { useState } from "react";

import toast from "react-hot-toast";
import { Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Table, Skeleton, Modal, Empty, Spin } from "antd";

import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

import { useGetAllCategories } from "../hooks/useGetAllcategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const CategoryListingPage = () => {
  const {
    categories = [],
    categoryIsLoading,
    categoryError,
  } = useGetAllCategories();
  const queryClient = useQueryClient();
  const [deletingcategoryId, setDeletingcategoryId] = useState(null);

  // Delete Category Mutation
  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: () => {
      toast.success("category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setDeletingcategoryId(null);
    },
    onError: () => {
      toast.error("Failed to delete category");
      setDeletingcategoryId(null);
    },
  });

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setDeletingcategoryId(id);
        deleteCategory(id);
      },
    });
  };

  const data = categories.map((category, index) => ({
    key: index + 1,
    Name: category.name,
    action: (
      <div className="d-flex align-items-center">
        <EditButton to={`/category/edit/${category._id}`} />
        {deletingcategoryId === category._id ? (
          <Spin className="ms-4" />
        ) : (
          <DeleteButton
            onClick={() => handleDelete(category._id)}
            disabled={!!deletingcategoryId}
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
                <h3 className="mb-0">View All categories</h3>
                <p className="mb-2 mb-lg-0">View and manage all categories</p>
              </div>

              <Link to="/category/add" className="w-fit">
                <button className="button border-0 d-flex align-items-center gap-2">
                  <Redo size={18} />
                  <span>Add New category</span>
                </button>
              </Link>
            </div>

            {categoryError ? (
              <p className="text-danger">{categoryError.message}</p>
            ) : categoryIsLoading ? (
              <Skeleton active className="mt-5" />
            ) : categories.length > 0 ? (
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: "auto" }}
              />
            ) : (
              <Empty description="No categories found" />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryListingPage;
