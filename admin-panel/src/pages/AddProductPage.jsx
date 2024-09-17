import { Input, Select, Spin } from "antd";
import { Undo } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    color: "",
    tags: [],
    price: "",
    salePrice: "",
    productImages: [],
  });

  const [productImgPreview, setProductImgPreview] = useState([]);
  const editor = useRef(null);
  const navigate = useNavigate();

  // Mutation to save product
  const {
    mutate: saveProduct,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const url = "/api/product/create";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success(`Product "${formData.title}" created`);
      navigate("/product/manage");
    },
    onError: () => {
      toast.error("Failed to create Product");
    },
  });

  // Input Handlers
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDescriptionChange = (newContent) =>
    setFormData({ ...formData, description: newContent });

  const handleSelectChange = (value) =>
    setFormData((prevState) => ({ ...prevState, tags: value }));

  // Multiple Image Upload Handler
  const handleProductImgChange = (e) => {
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
            setProductImgPreview(imagePreviews);
            setFormData((prevState) => ({
              ...prevState,
              productImages: imageFiles,
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
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, value);
      }
    });
    saveProduct(formDataToSend);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="app-container pt-4">
          <div className="custom-card">
            {/* Page Title */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mb-4">
              <div className="page-title">
                <h3 className="page-title mb-0">Add New Product</h3>
                <p className="mb-2 mb-lg-0">
                  Fill out the details below to add a product
                </p>
              </div>

              <Link to="/product/manage" className="w-fit">
                <button className="button border-0 gap-2 d-flex">
                  <Undo size={18} />
                  Manage All Products
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="label">Title</label>
                <Input
                  placeholder="Enter Product Title"
                  size="large"
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="label">Description</label>
                <JoditEditor
                  ref={editor}
                  required
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />

                {formData.description === "" && (
                  <div className="text-danger mt-1">Description is required!</div>
                )}
              </div>

              {/* Category & Brand */}
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div className="mb-0 mb-lg-3">
                    <label className="label">Category</label>
                    <Input
                      placeholder="Enter Product Category"
                      size="large"
                      id="category"
                      name="category"
                      type="text"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Brand</label>
                    <Input
                      placeholder="Enter Product Brand"
                      size="large"
                      id="brand"
                      name="brand"
                      type="text"
                      required
                      value={formData.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
              </Row>

              {/* Color & Tags */}
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div className="mb-0 mb-lg-3">
                    <label className="label">Colors</label>
                    <Input
                      placeholder="Enter Product Colors"
                      size="large"
                      id="color"
                      name="color"
                      type="text"
                      required
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Tags</label>
                    <Select
                      mode="multiple"
                      required
                      placeholder="Select or Enter Tags"
                      style={{ width: "100%", height: "40px" }}
                      value={formData.tags}
                      onChange={handleSelectChange}
                    >
                      <Select.Option value="featured">Featured</Select.Option>
                      <Select.Option value="special">Special</Select.Option>
                      <Select.Option value="popular">Popular</Select.Option>
                      <Select.Option value="sale">Sale</Select.Option>
                    </Select>
                  </div>
                </Col>
              </Row>

              {/* Price & Sale Price */}
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div className="mb-0 mb-lg-3">
                    <label className="label">Price</label>
                    <Input
                      placeholder="Enter Product Price"
                      size="large"
                      id="price"
                      name="price"
                      type="number"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Sale Price</label>
                    <Input
                      placeholder="Enter Product Sale Price"
                      size="large"
                      id="salePrice"
                      name="salePrice"
                      type="number"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
              </Row>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="label">Product Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleProductImgChange}
                  className="custom-file-input"
                />

                <div>
                  {productImgPreview &&
                    productImgPreview.map((img, index) => (
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

              {/* Submit Button */}
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
                    "Add Product"
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

export default AddProductPage;
