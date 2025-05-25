import { useEffect, useRef, useState } from "react";

import { Undo } from "lucide-react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { Input, Select, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
// imports End

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    colors: [],
    tags: [],
    price: "",
    productImages: [],
  });

  const [productImgPreview, setProductImgPreview] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const editor = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brand/all");
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Fetch Categoeis from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/all");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category.name || "",
          brand: data.brand.name || "",
          colors: data.colors || "",
          tags: data.tags || "",
          price: data.price || "",
          productImages: data.productImages || [],
        });

        if (data.productImages) {
          setProductImgPreview(data.productImages.map((img) => img.url));
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Mutation to save product
  const {
    mutate: saveProduct,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/product/update/${id}` : "/api/product/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save product");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Product "${formData.title}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/product/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} Product`);
    },
  });

  // Input Handlers
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDescriptionChange = (newContent) =>
    setFormData({ ...formData, description: newContent });

  const handleSelectChange = (value, key) =>
    setFormData({ ...formData, [key]: value });

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
                <h3 className="page-title mb-0">
                  {id ? "Edit Product" : "Add New Product"}
                </h3>

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
              </div>

              {/* Category & Brand */}
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Category</label>
                    <Select
                      style={{ width: "100%" }}
                      value={formData.category}
                      onChange={(value) =>
                        handleSelectChange(value, "category")
                      }
                      placeholder="Select Category"
                      showSearch
                    >
                      {categories.map((category) => (
                        <Select.Option key={category._id} value={category._id}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Brand</label>
                    <Select
                      style={{ width: "100%" }}
                      value={formData.brand}
                      onChange={(value) => handleSelectChange(value, "brand")}
                      placeholder="Select Brand"
                      showSearch
                    >
                      {brands.map((brand) => (
                        <Select.Option key={brand._id} value={brand._id}>
                          {brand.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>

              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Tags</label>
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Enter or Select Tags"
                      value={formData.tags}
                      onChange={(value) => handleSelectChange(value, "tags")}
                      tokenSeparators={[","]}
                    >
                      <Select.Option value="featured">Featured</Select.Option>
                      <Select.Option value="special">Special</Select.Option>
                      <Select.Option value="popular">Popular</Select.Option>
                      <Select.Option value="sale">Sale</Select.Option>
                    </Select>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="mb-3">
                    <label className="label">Colors</label>
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Enter or Select Colors"
                      value={formData.colors}
                      onChange={(value) => handleSelectChange(value, "colors")}
                      tokenSeparators={[","]}
                    >
                      {[
                        "Red",
                        "Blue",
                        "Green",
                        "Black",
                        "White",
                        "Yellow",
                        "Purple",
                        "Orange",
                        "Pink",
                        "Brown",
                        "Golden",
                        "Silver",
                      ].map((color) => (
                        <Select.Option key={color} value={color}>
                          {color}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>

              {/* Price  */}
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
              </Row>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="label">Product Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  required={id ? false : true}
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
                    <>{id ? "Update Product" : "Add Prodcut"}</>
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
