import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";
import InViewAnimation from "./InViewAnimation";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const SaleProduct = () => {
  const { products, productIsLoading } = useGetAllProducts();

  return (
    <div className="py-2 mt-2 sm:mt-8">
      <div className="sm:mt-5">
        <InViewAnimation delay={0.1}>
          <div className="py-1 text-3xl">
            <SectionHeading text1={"Our"} text2={"Flash Sale"} />
          </div>
        </InViewAnimation>
      </div>

      <div>
        <ProductSlider>
          {productIsLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <InViewAnimation key={index} delay={index * 0.1}>
                  <ProductCardSkeleton />
                </InViewAnimation>
              ))
            : products?.map((product, index) => {
                if (product.tags.includes("sale")) {
                  return (
                    <InViewAnimation key={product._id} delay={index * 0.1}>
                      <ProductCard product={product} key={product._id} />
                    </InViewAnimation>
                  );
                }
              })}
        </ProductSlider>
      </div>
    </div>
  );
};

export default SaleProduct;
