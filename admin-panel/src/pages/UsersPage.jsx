import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Empty, Skeleton, Table } from "antd";
import { Col, Container, Row } from "react-bootstrap";

const UsersPage = () => {
  // Fetch all Users
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/user/");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    retry: false,
  });

  const columns = [
    {
      title: "Sr No.",
      dataIndex: "key",
      className: "column-fix",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "User Name",
      dataIndex: "userNmae",
      className: "column-fix",
      sorter: (a, b) => a.userNmae.localeCompare(b.userNmae),
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "column-fix",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      className: "column-fix",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },

    {
      title: "Created Date",
      dataIndex: "createdDate",
      className: "column-fix",
      sorter: (a, b) =>
        moment(a.createdDate).unix() - moment(b.createdDate).unix(),
    },
    {
      title: "Role",
      dataIndex: "role",
      className: "column-fix",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
  ];

  const data = users?.map((user, i) => ({
    key: i + 1,
    userNmae: `${user.fullName}`,
    email: user.email,
    mobile: user.mobile,
    createdDate: moment(user.createdAt).format("D MMM YYYY"),
    role: user.role,
  }));
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="app-container pt-4">
            <div className="page-title d-flex flex-column">
              <h3 className="page-title mb-0">Users Details</h3>
              <p>View and Manage All Users</p>
            </div>

            {error ? (
              <p>{error.message}</p>
            ) : (
              <>
                {isLoading ? (
                  <Skeleton active className="mt-5" />
                ) : users?.length > 0 ? (
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
    </div>
  );
};

export default UsersPage;
