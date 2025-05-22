import { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import toast from "react-hot-toast";
import { Undo } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddBrandPage = () => {
  const [formData, setFormData] = useState({ name: "" });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBrand = async () => {
        try {
          const res = await fetch(`/api/brand/${id}`);
          const data = await res.json();
          setFormData({ name: data.name || "" });
        } catch (error) {
          console.error("Failed to fetch brands:", error);
        }
      };

      fetchBrand();
    }
  }, [id]);

  const {
    mutate: saveBrand,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/brand/update/${id}` : "/api/brand/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save brand");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Brand "${formData.name}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/brand/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} brand`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    saveBrand(formDataToSend);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="app-container pt-4">
          <div className="custom-card">
            {/* Page Title */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
              <div className="page-title">
                <h3 className="page-title mb-0">
                  {id ? "Edit Brand" : "Add New Brand"}
                </h3>
                <p className="mb-2 mb-lg-0">
                  Fill out the details below to {id ? "edit" : "add"} a brand
                </p>
              </div>

              <Link to="/brand/manage" className="w-fit">
                <button className="button border-0 gap-2 d-flex">
                  <Undo size={18} />
                  Manage All Brands
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="label">Brand Name</label>
                <Input
                  placeholder="Enter Brand Name"
                  size="large"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {isError && <div className="text-danger">{error.message}</div>}

              <div className="mt-4">
                <button
                  className="button border-0 d-flex align-items-center justify-content-center w-100"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="d-flex align-items-center gap-2">
                      <Spin size="small" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>{id ? "Update Brand" : "Add Brand"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBrandPage;
