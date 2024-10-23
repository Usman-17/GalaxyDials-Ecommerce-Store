import { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ScanSearch } from "lucide-react";
import { Empty, Modal, Skeleton, Table } from "antd";
import { Col, Container, Row } from "react-bootstrap";

import DeleteButton from "../components/DeleteButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Imports End

const EnquiryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const queryClient = useQueryClient();

  // Fetch all Enquiries
  const {
    data: enquiries,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await fetch("/api/enquiry/all");
      if (!res.ok) throw new Error("Failed to fetch Enquires");
      return res.json();
    },
    retry: false,
  });

  //   Delete Enquiry Mutation
  const { mutate: deleteEnquiry } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete enquiry");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Enquiry deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      setIsModalOpen(false);
    },

    onError: () => {
      toast.error("Failed to delete enquiry");
    },
  });

  const showDeleteModal = (id) => {
    setSelectedEnquiryId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEnquiryId) {
      deleteEnquiry(selectedEnquiryId);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Sr.",
      dataIndex: "key",
      className: "column-fix",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      className: "column-fix truncate",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "column-fix truncate",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      className: "column-fix",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      className: "column-fix truncate",
    },
    {
      title: "Comments",
      dataIndex: "comment",
      className: "comment-fix truncate",
    },

    {
      title: "Posted At",
      dataIndex: "postedAt",
      className: "column-fix",
      sorter: (a, b) => moment(a.postedAt).unix() - moment(b.postedAt).unix(),
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "column-fix",
    },
  ];

  const data = enquiries?.map((enquiry, i) => ({
    key: i + 1,
    name: `${enquiry.name}`,
    email: enquiry.email,
    mobile: enquiry.mobile,
    subject: enquiry.subject,
    comment: enquiry.comment,
    postedAt: moment(enquiry.createdAt).format("D MMM YYYY"),
    action: (
      <>
        <Link to={`/enquiries/${enquiry._id}`}>
          <ScanSearch size={28} color="blue" />
        </Link>
        <DeleteButton onClick={() => showDeleteModal(enquiry._id)} />
      </>
    ),
  }));
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="app-container pt-4">
            <div className="custom-card">
              <div className="page-title d-flex flex-column">
                <h3 className="page-title mb-0">Enquiries</h3>
                <p>View and manage all customer enquiries</p>
              </div>

              {error ? (
                <p>{error.message}</p>
              ) : (
                <>
                  {isLoading ? (
                    <Skeleton active className="mt-5" />
                  ) : enquiries?.length > 0 ? (
                    <Table
                      columns={columns}
                      dataSource={data}
                      scroll={{ x: true }}
                    />
                  ) : (
                    <Empty description="No data available" className="py-5" />
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        title="Confirm Deletion"
        visible={isModalOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this enquiry? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default EnquiryPage;
