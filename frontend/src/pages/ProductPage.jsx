import { useState } from "react";
import { Dot, Redo } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import LoadingSpinner from "../components/LoadingSpinner";
import RelatedProducts from "../components/RelatedProducts";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";

import { useQuery } from "@tanstack/react-query";
import { useAddToCart } from "../hooks/useAddToCart";
import ProductReviews from "../components/ProductReviews";
// Imports End

const ProductPage = () => {
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cartIsPending } = useAddToCart();

  // Get Product Query
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/product/${id}`);

      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    retry: false,
  });

  if (isLoading) return <ProductSkeleton />;
  if (!product) return <div className="p-4">Product not found.</div>;

  const mainImageUrl = product?.productImages?.[0]?.url || "";

  const handleImageClick = (url) => setActiveImage(url);

  const handleAddToCart = (itemId, color, quantity) => {
    addToCart({ itemId, color, quantity });
  };

  return (
    <div className="border-t transition-opacity ease-in duration-500 opacity-100">
      {/* Breadcrumb  */}
      <nav
        aria-label="breadcrumb"
        className="my-4 text-sm text-gray-600 select-none hidden sm:block"
      >
        <ol className="flex items-center space-x-1">
          <li className="flex items-center">
            <Link
              to="/collection"
              className="hover:text-rose-500 transition-colors duration-200"
            >
              All Products
            </Link>
          </li>
          <li className="flex items-center">
            <Dot size={14} className="mx-1 text-gray-400" />
            <span className="font-semibold text-gray-800 sm:max-w-xs truncate">
              {product?.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 pt-5 sm:pt-0">
        {/* Images */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3 sm:gap-6">
          {/* Thumbnails */}
          <div className="flex sm:flex-col sm:w-[17.5%] w-full gap-1 sm:gap-0 overflow-y-auto max-h-[510px]">
            {product?.productImages?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(image.url)}
                className="w-[20.5%] sm:w-full sm:mb-3 cursor-pointer rounded-md transition-transform duration-300 transform hover:scale-105 object-contain"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[82.5%] flex items-center justify-center">
            <div className="w-full sm:h-[510px] relative">
              <InnerImageZoom
                src={activeImage || mainImageUrl}
                zoomType="hover"
                zoomScale={1}
                className="rounded-md object-contain sm:h-full w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h4 className="text-gray-600 text-sm sm:text-base uppercase">
            {product?.brand?.name || ""}
          </h4>

          <h1
            className="font-medium text-md sm:text-lg sm:mt-1 tracking-normal sm:tracking-wide"
            style={{ lineHeight: "1.1" }}
          >
            {product?.title}
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-red-600 mt-2">
            Rs. {product?.price.toLocaleString()}
          </p>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {product?.category.name || "N/A"}
            </span>
          </p>

          <div className="my-4 flex items-center gap-4">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              min={1}
              className="border w-20 px-2 py-1 rounded"
            />
          </div>

          {/* Colors */}
          {product?.colors?.length > 0 && (
            <div className="">
              <p>Select Color</p>
              <div className="flex gap-2 flex-wrap mt-3 sm:mt-2">
                {product.colors.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(item)}
                    className={`border py-1 px-3 bg-gray-100 cursor-pointer rounded-sm ${
                      item === color ? "border-gray-800 " : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleAddToCart(product._id, color, quantity)}
            disabled={cartIsPending}
            className="uppercase bg-gray-900 text-white px-4 sm:px-5 py-2.5 text-sm rounded mt-7 sm:mt-8 hover:bg-gray-950 transition duration-100 flex items-center gap-2"
          >
            {cartIsPending ? (
              <LoadingSpinner content="Adding to cart" />
            ) : (
              <>
                Add to cart <Redo size={18} />
              </>
            )}
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Tabs - Description & Reviews */}
      <div className="mt-10 sm:mt-20">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm ${
              activeTab === "description" ? "border-b-2 border-black" : ""
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
          >
            Reviews
          </button>
        </div>

        <div className="flex flex-col gap-4 border px-3 sm:px-6 py-3 sm:py-6 text-sm">
          {activeTab === "description" ? (
            <div
              dangerouslySetInnerHTML={{ __html: product?.description || "" }}
            />
          ) : (
            <ProductReviews />
          )}
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts
        category={product.category.name || ""}
        brand={product?.brand?.name || ""}
      />
    </div>
  );
};

export default ProductPage;
