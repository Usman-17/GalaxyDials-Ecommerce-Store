import SectionHeading from "./SectionHeading";
import SpecialProductCard from "./SpecialProductCard";
import InViewAnimation from "./InViewAnimation";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// imports End

const SpecialProduct = () => {
  const { products } = useGetAllProducts();

  return (
    <>
      {products && (
        <div className="slider-container sm:mt-5">
          <InViewAnimation delay={0.1}>
            <div className="py-1 text-3xl">
              <SectionHeading text1={"Our"} text2={"Special Products"} />
            </div>
          </InViewAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products?.slice(0, 2).map((product, index) => {
              if (product.tags.includes("special")) {
                return (
                  <InViewAnimation key={product._id} delay={index * 0.1}>
                    <SpecialProductCard product={product} key={product?._id} />
                  </InViewAnimation>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialProduct;
