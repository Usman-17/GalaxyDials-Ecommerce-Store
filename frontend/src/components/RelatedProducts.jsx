import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import SectionHeading from "./SectionHeading";

import { useGetAllProducts } from "../hooks/useGetAllProducts";
// Imports End

const RelatedProducts = ({ category, brand }) => {
  const location = useLocation();
  const [related, setRelated] = useState([]);
  const { products } = useGetAllProducts();

  useEffect(() => {
    if (products.length > 0 && category && brand) {
      const matched = products
        .filter(
          (item) => item.category.name === category && item.brand.name === brand
        )
        .slice(0, 5);
      setRelated(matched);
    }
  }, [products, category, brand]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (related.length === 0) return null;

  return (
    <div className="my-20">
      <div className="text-center py-8 text-3xl">
        <SectionHeading text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
