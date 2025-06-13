import { useEffect, useRef, useState } from "react";
import { Undo } from "lucide-react";
import toast from "react-hot-toast";
import { Input, Select } from "antd";
import JoditEditor from "jodit-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetAllBrands } from "../hooks/useGetAllBrands";
import { useGetAllCategories } from "../hooks/useGetAllCategories";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    sold: "",
    colors: [],
    tags: [],
    price: "",
    secondaryPrice: "",
    productImages: [],
    existingImages: [],
  });

  const [productImages, setProductImages] = useState([]);
  const [productImgPreview, setProductImgPreview] = useState([]);

  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const { brands = [] } = useGetAllBrands();
  const { categories = [] } = useGetAllCategories();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category?._id || "",
          brand: data.brand?._id || "",
          colors: data.colors || [],
          tags: data.tags || [],
          price: data.price || "",
          secondaryPrice: data.secondaryPrice || "",
          sold: data.sold || "",
          productImages: data.productImages || [],
        });

        if (data.productImages) {
          setProductImgPreview(data.productImages.map((img) => img.url));
        }
      };
      fetchProduct();
    }
  }, [id]);

  const {
    mutate: saveProduct,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formDataToSend) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/product/update/${id}` : "/api/product/create";
      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });
      if (!res.ok) throw new Error("Failed to save product");
      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Product "${formData.title.slice(0, 10)}" ${
          id ? "updated" : "created"
        } successfully`
      );

      navigate("/product/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} Product`);
    },
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDescriptionChange = (newContent) =>
    setFormData({ ...formData, description: newContent });

  const handleSelectChange = (value, key) =>
    setFormData({ ...formData, [key]: value });

  const handleProductImgChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setProductImgPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "productImages") return;

      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, value);
      }
    });

    productImages.forEach((file) => {
      formDataToSend.append("productImages", file);
    });

    saveProduct(formDataToSend);
  };

  const handleDeleteImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductImgPreview((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-0">
        <SectionHeading
          title={id ? "Edit Product" : "Add New Product"}
          subtitle="Fill out the details below to add a product"
        />
        <Button title="Manage Products" to="/product/manage" Icon={Undo} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title  */}
        <div>
          <label className="block mb-1 text-sm font-medium">Title*</label>
          <Input
            placeholder="Enter Product Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price*
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="secondaryPrice"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Secondary Price
            </label>
            <Input
              id="secondaryPrice"
              name="secondaryPrice"
              type="number"
              placeholder="Enter Secondary Price"
              value={formData.secondaryPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5">
          {/* Left Side */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Description*
              </label>
              <JoditEditor
                ref={editor}
                required
                value={formData.description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-white">
                Product Images*
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleProductImgChange}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-black file:text-white hover:file:bg-neutral-800 cursor-pointer"
              />

              {productImgPreview.length > 0 && (
                <div className="flex flex-wrap mt-4 gap-3">
                  {productImgPreview.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover  rounded shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full 
                        w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-3 mt-5">
            <div>
              <label className="block mb-1 text-sm font-medium">Sold*</label>
              <Input
                placeholder="Enter number of products sold"
                name="sold"
                type="text"
                value={formData.sold}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="category" className="text-sm font-medium">
                  Category*
                </label>
                <Link
                  to="/category/create"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Add New Category
                </Link>
              </div>

              <Select
                className="w-full"
                value={formData.category}
                onChange={(value) => handleSelectChange(value, "category")}
                placeholder="Select Category"
                showSearch
              >
                {categories.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="brand" className="text-sm font-medium">
                  Brand
                </label>
                <Link
                  to="/brand/create"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Add New Brand
                </Link>
              </div>
              <Select
                className="w-full"
                value={formData.brand}
                onChange={(value) => handleSelectChange(value, "brand")}
                placeholder="Select Brand"
                showSearch
              >
                {brands.map((b) => (
                  <Select.Option key={b._id} value={b._id}>
                    {b.name}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Tags</label>
              <Select
                mode="tags"
                className="w-full"
                value={formData.tags}
                placeholder="Enter or Select Tags"
                onChange={(value) => handleSelectChange(value, "tags")}
                tokenSeparators={[","]}
              >
                {["Special", "Popular", "Sale"].map((tag) => (
                  <Select.Option key={tag} value={tag}>
                    {tag}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Colors</label>
              <Select
                mode="tags"
                className="w-full"
                value={formData.colors}
                placeholder="Enter or Select Colors"
                onChange={(value) => handleSelectChange(value, "colors")}
                tokenSeparators={[","]}
              >
                {[
                  "Gold",
                  "Rose Gold",
                  "Silver",
                  "Silver Black",
                  "Gold Black",
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
                ].map((color) => (
                  <Select.Option key={color} value={color}>
                    {color}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {isError && <div className="text-red-600">{error.message}</div>}

        <div className="pt-5">
          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-900
           disabled:opacity-50 w-full cursor-pointer"
          >
            {isPending ? (
              <LoadingSpinner content="Saving..." />
            ) : (
              <>{id ? "Update Product" : "Create Product"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProductPage;
