import { useState } from "react";
import { Helmet } from "react-helmet";
import { ChevronDown } from "lucide-react";

import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import InViewAnimation from "../components/InViewAnimation";
import FilterSkeleton from "../components/Skeleton/FilterSkeleton";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// Imports End

const CollectionPage = () => {
  const { products = [], productIsLoading } = useGetAllProducts();

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brandName)
        ? prevSelected.filter((br) => br !== brandName)
        : [...prevSelected, brandName]
    );
  };

  const uniqueBrands = [
    ...new Map(
      products
        .map((p) => p.brand)
        .filter(Boolean)
        .map((brand) => [brand._id, brand])
    ).values(),
  ];

  const uniqueCategories = [
    ...new Map(
      products
        .map((p) => p.category)
        .filter(Boolean)
        .map((category) => [category._id, category])
    ).values(),
  ];

  const filteredProducts = products.filter((product) => {
    const categoryName = product.category?.name || product.category;
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(categoryName);

    const brandName = product.brand?.name || product.brand;
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(brandName);

    return matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") {
      return a.price - b.price;
    } else if (sortOption === "high-low") {
      return b.price - a.price;
    }
    return 0;
  });

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
            className="my-2 text-xl uppercase flex items-center gap-1 cursor-pointer"
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
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="uppercase mb-3 text-sm font-medium">Categories</p>
            {productIsLoading ? (
              <FilterSkeleton />
            ) : (
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {uniqueCategories.map((category, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-gray-700"
                      value={category.name}
                      onChange={() => handleCategoryChange(category.name)}
                      checked={selectedCategories.includes(category.name)}
                    />
                    <span className="font-medium">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="uppercase mb-3 text-sm font-medium">Brands</p>
            {productIsLoading ? (
              <FilterSkeleton />
            ) : (
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {uniqueBrands.map((brand) => (
                  <label
                    key={brand._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-gray-700"
                      value={brand.name}
                      onChange={() => handleBrandChange(brand.name)}
                      checked={selectedBrands.includes(brand.name)}
                    />
                    <span className="font-medium">{brand.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side All Products */}
        <div className="flex-1 mb-20">
          <div className="flex justify-between items-center text-xs sm:text-2xl mb-2 gap-6">
            <InViewAnimation delay={0.1}>
              <SectionHeading
                text1={"ALL"}
                text2={"COLLECTIONS"}
                className="text-[11.5px] select-none"
              />
            </InViewAnimation>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 bg-white text-xs sm:text-sm px-0 py-2 sm:px-3 sm:py-2 rounded-md focus:outline-none transition duration-100 ease-in-out hover:bg-gray-50 mb-3"
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* All Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
            {productIsLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : sortedProducts.map((product, index) => (
                  <InViewAnimation key={product._id} delay={index * 0.1}>
                    <ProductCard key={product._id} product={product} />
                  </InViewAnimation>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
