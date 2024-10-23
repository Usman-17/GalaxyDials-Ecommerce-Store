import { Skeleton } from "antd";
import { Undo } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const EnquiryDetailsPage = () => {
  const { id } = useParams();

  const {
    data: enquiry,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["enquiry", id],
    queryFn: async () => {
      const res = await fetch(`/api/enquiry/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return res.json();
    },
  });

  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="app-container pt-4">
            <div className="custom-card pb-5">
              <div className="d-flex items-center justify-content-between">
                <div className="page-title d-flex flex-column">
                  <h3 className="page-title mb-0"> Enquiry Details</h3>
                  <p>View detailed information about the enquiry</p>
                </div>
                <Link to="/enquiries">
                  <button className="button border-0 d-flex gap-2">
                    <Undo size={18} />
                    Back to Enquiries
                  </button>
                </Link>
              </div>

              <div className="d-flex flex-column gap-3 mt-4">
                {isLoading ? (
                  <Skeleton active className="mt-5" />
                ) : (
                  <>
                    <div>
                      <strong>Name:</strong> {enquiry?.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {enquiry?.email}
                    </div>
                    <div>
                      <strong>Mobile:</strong> {enquiry?.mobile}
                    </div>
                    <div className="pb-1">
                      <strong>Subject:</strong> {enquiry?.subject}
                    </div>
                    <div>
                      <strong>Comment:</strong> {enquiry?.comment}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EnquiryDetailsPage;
