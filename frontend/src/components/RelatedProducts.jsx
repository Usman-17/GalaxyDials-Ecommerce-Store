import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

import { AppContext } from "../context/AppContext";
// Imports End

const RelatedProducts = ({ category, brand }) => {
  const location = useLocation();
  const { products } = useContext(AppContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category && brand) {
      const matched = products
        .filter((item) => item.category === category && item.brand === brand)
        .slice(0, 5);
      setRelated(matched);
    }
  }, [products, category, brand]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="my-20">
      <div className="text-center py-8 text-3xl">
        <SectionHeading text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
        {related.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product?.productImages[0]?.url}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
