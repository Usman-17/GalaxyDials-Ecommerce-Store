import moment from "moment";
import { Link } from "react-router-dom";
import { ScanSearch } from "lucide-react";
import { Empty, Skeleton, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Col, Container, Row } from "react-bootstrap";

import DeleteButton from "../components/DeleteButton";
// Imports End

const EnquiryPage = () => {
  // Fetch all Enquiry
  const {
    data: enquiry,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enquiry"],
    queryFn: async () => {
      const res = await fetch("/api/enquiry/all");
      if (!res.ok) throw new Error("Failed to fetch Enquires");
      return res.json();
    },
    retry: false,
  });

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

  const data = enquiry?.map((enquiry, i) => ({
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
        <DeleteButton />
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
                  ) : enquiry?.length > 0 ? (
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EnquiryPage;
