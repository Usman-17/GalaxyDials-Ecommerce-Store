import { useState } from "react";
import { Helmet } from "react-helmet";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const CollectionPage = ({ products, isLoading }) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <Helmet>
        <title>Explore Our Premium Wrist Watches | Galaxy Dials</title>
        <meta
          name="description"
          content="Discover a stunning collection of wrist watches at Galaxy Dials. Shop luxury, affordable, and stylish watches designed for every occasion."
        />
        <meta
          name="keywords"
          content="wrist watches, luxury watches, affordable watches, stylish watches, Galaxy Dials"
        />
        <link rel="canonical" href="https://www.galaxydials.com/collections" />
      </Helmet>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-3 sm:pt-10 border-t">
        {/* Left Side Filter  */}
        <div className="min-w-60 md:min-w-40 lg:min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl uppercase flex items-center gap-1"
          >
            Filters
            <ChevronDown
              size={18}
              className={`sm:hidden ${
                showFilter ? "rotate-90" : ""
              } text-gray-500`}
            />
          </p>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? " " : "hidden"
            } sm:block`}
          >
            <p className="uppercase mb-3 text*sm font-medium ">Categories</p>

            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Men"
                  aria-label="Men"
                />
                <span className="font-medium">Men</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Women"
                  aria-label="Women"
                />
                <span className="font-medium">Women</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Kids"
                  aria-label="Kids"
                />
                <span className="font-medium">Kids</span>
              </label>
            </div>
          </div>

          {/* Brand Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? " " : "hidden"
            } sm:block`}
          >
            <p className="uppercase mb-3 text*sm font-medium ">Brands </p>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Men"
                  aria-label="Men"
                />
                <span className="font-medium">Men</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Women"
                  aria-label="Women"
                />
                <span className="font-medium">Women</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  value="Kids"
                  aria-label="Kids"
                />
                <span className="font-medium">Kids</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side All Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center text-xs sm:text-2xl mb-4 gap-6">
            {/* Section Heading */}
            <SectionHeading
              text1={"ALL"}
              text2={"COLLECTIONS"}
              className="text-[14px]"
            />

            {/* Product Sorting */}
            <select className="border border-gray-300 bg-white text-xs sm:text-sm px-0 py-2 sm:px-3 sm:py-2 rounded-md focus:outline-none transition duration-100 ease-in-out hover:bg-gray-50 mb-3">
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* All Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : products.map((product) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
