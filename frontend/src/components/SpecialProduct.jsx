import SectionHeading from "./SectionHeading";
import SpecialProductCard from "./SpecialProductCard";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
// imports End

const SpecialProduct = () => {
  const { products } = useGetAllProducts();

  return (
    <>
      {products && (
        <div className="slider-container sm:mt-5">
          <div className="py-1 text-3xl">
            <SectionHeading text1={"Our"} text2={"Special Products"} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products?.slice(0, 2).map((product) => {
              if (product.tags.includes("special")) {
                return (
                  <SpecialProductCard product={product} key={product?._id} />
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
