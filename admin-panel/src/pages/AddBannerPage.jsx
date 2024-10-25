import { useMutation } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import { Undo } from "lucide-react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// imports End

const AddBannerPage = () => {
  const [formData, setFormData] = useState({
    type: "",
    bannerImg: [],
  });
  const [bannerImgPreview, setBannerImgPreview] = useState([]);
  const navigate = useNavigate();

  const {
    mutate: saveBanner,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = "POST";
      const url = "/api/banner/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save Banner");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Banner created successfully");
      navigate("/banners/manage");
    },

    onError: () => {
      toast.error("Failed to  create Banner");
    },
  });

  const handleSelectChange = (value) =>
    setFormData((prevState) => ({ ...prevState, type: value }));

  const handleBannerImgChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const imagePreviews = [];
      const imageFiles = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreviews.push(reader.result);
          imageFiles.push(file);

          if (imagePreviews.length === files.length) {
            setBannerImgPreview(imagePreviews);
            setFormData((prevState) => ({
              ...prevState,
              bannerImg: imageFiles,
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append non-file fields
    formDataToSend.append("type", formData.type);

    // Append each file with the key "bannerImg"
    formData.bannerImg.forEach((file) => {
      formDataToSend.append("bannerImg", file); // Ensure "bannerImg" matches server-side expectation
    });

    saveBanner(formDataToSend);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="app-container pt-4">
          <div className="custom-card">
            {/* Page Title */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
              <div className="page-title">
                <h3 className="page-title mb-0">Add New Banner</h3>

                <p className="mb-2 mb-lg-0">
                  Fill out the details below to add a banner
                </p>
              </div>

              <Link to="/banners/manage" className="w-fit">
                <button className="button border-0 gap-2 d-flex">
                  <Undo size={18} />
                  Manage All Banners
                </button>
              </Link>
            </div>

            {/* Form */}
            <Col xs={12} sm={6}>
              <form className="d-flex flex-column w-10" onSubmit={handleSubmit}>
                <label className="label">Banner Type:</label>

                <Select
                  required
                  placeholder="Select Banner Type"
                  className="mb-3"
                  value={formData.type}
                  onChange={handleSelectChange}
                >
                  <Select.Option value="heroBanner">Hero Banner</Select.Option>
                  <Select.Option value="adBanner">Ad Banner</Select.Option>
                  <Select.Option value="collectionBanner">
                    Collection Banner
                  </Select.Option>
                </Select>

                <div className="mb-3">
                  <label className="label">Upload Images:</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    required
                    onChange={handleBannerImgChange}
                    className="custom-file-input"
                  />

                  <div>
                    {bannerImgPreview &&
                      bannerImgPreview.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`preview-${index}`}
                          style={{ width: "100px", margin: "10px" }}
                        />
                      ))}
                  </div>
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
                      <>Add Banner</>
                    )}
                  </button>
                </div>
              </form>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBannerPage;
