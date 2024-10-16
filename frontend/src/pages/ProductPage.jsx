import { useParams } from "react-router-dom";
import { Redo } from "lucide-react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import ProductSlider from "../components/ProductSlider";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductPage = ({ products }) => {
  const [activeImage, setActiveImage] = useState(""); // State for active image

  const [activeTab, setActiveTab] = useState("description");

  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/product/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
      }
    },

    retry: false,
  });

  const mainImageUrl = product?.productImages?.[0]?.url || "";

  const handleImageClick = (url) => {
    setActiveImage(url);
  };

  return (
    <div className="border-t-2 pt-5 sm:pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Detail */}

      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
          {/* ---Product Images--- */}
          <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3 sm:gap-6">
            <div className="flex sm:flex-col  sm:w-[18.5%] w-full gap-1 sm:gap-0">
              {product?.productImages?.slice(0).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(image.url)}
                  className="w-[24%] sm:w-full sm:mb-3 cursor-pointer rounded-md transition-transform duration-300 transform hover:scale-105 object-contain"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full sm:w-[80%] flex items-center justify-center">
              <InnerImageZoom
                src={activeImage || mainImageUrl}
                zoomType="hover"
                zoomScale={1}
                className="rounded-md object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* ---Product Info---- */}
          <div className="flex-1">
            <h4 className="text-gray-600 text-sm sm:text-base">
              {product?.brand}
            </h4>
            <h1
              className="font-semibold text-lg sm:text-2xl sm:mt-2 tracking-wide"
              style={{
                lineHeight: "1.2",
              }}
            >
              {product?.title}
            </h1>

            {/* Price */}
            <div className="flex items-center">
              {(product?.price || product?.salePrice) && (
                <div className="flex items-center gap-1 sm:gap-2 mt-2">
                  {product?.salePrice ? (
                    <>
                      <p className="text-lg sm:text-2xl font-bold text-red-600">
                        Rs. {product?.salePrice}
                      </p>
                      <p className="text-xs sm:text-lg text-gray-500 line-through">
                        Rs. {product?.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      Rs. {product?.price}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <p className="text-sm sm:text-base text-gray-500 mt-4">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product?.category}
              </span>
            </p>

            <div className="flex flex-col gap-4 my-4">
              <p>Select Color</p>
              <div className="flex gap-2">
                <button className="border py-1 px-4 bg-gray-100 text-sm sm:text-base rounded-sm">
                  Red
                </button>
                <button className="border py-1 px-4 bg-gray-100 text-sm sm:text-base rounded-sm">
                  Gold
                </button>
                <button className="border py-1 px-4 bg-gray-100 text-sm sm:text-base rounded-sm">
                  Black
                </button>
              </div>
            </div>

            <button className="uppercase bg-black text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded mt-7 sm:mt-8 hover:bg-gray-800 transition duration-300 flex items-center gap-2">
              Add to cart <Redo size={18} />
            </button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      )}

      {/* ----Description & Reviews Tabs---- */}
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
            Reviews (122)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col gap-4 border px-3 sm:px-6 py-3 sm:py-6 text-sm text-gray-500">
          {activeTab === "description" ? (
            <div
              dangerouslySetInnerHTML={{ __html: product?.description || "" }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                  <button className="hover:text-black mt-1 sm:mt-0 transition-opacity duration-200 text-sm">
                    Write a Review
                  </button>
                </div>

                {/* Review 1 */}
                <div className="flex items-start gap-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-gray-500 text-sm">
                      Great product, loved the quality!
                    </p>
                    <div className="flex gap-2 mt-2">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 1"
                        className="w-16 h-16 rounded-md"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 2"
                        className="w-16 h-16 rounded-md"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 3"
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="flex items-start gap-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-gray-500 text-sm">Worth the price.</p>
                    <div className="flex gap-2 mt-2">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 1"
                        className="w-16 h-16 rounded-md"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 2"
                        className="w-16 h-16 rounded-md"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Review Image 3"
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -----Related Products---- */}
      <div className="mt-10">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Related"} text2={"Products"} />
        </div>
      </div>

      <ProductSlider>
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            to={`/product/${product._id}`}
            image={product.productImages[0]?.url}
            title={product.title}
            brand={product.brand}
            price={product.price}
            salePrice={product.salePrice}
          />
        ))}
      </ProductSlider>
    </div>
  );
};

export default ProductPage;
