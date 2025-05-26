import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";
import InViewAnimation from "./InViewAnimation";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const PopularProduct = () => {
  const { products, productIsLoading, productIsRefetching } =
    useGetAllProducts();

  return (
    <>
      {products && (
        <div className="mt-4 sm:mt-10">
          <InViewAnimation delay={0.1}>
            <div className="py-1 text-3xl">
              <SectionHeading text1={"Our"} text2={"Popular Products"} />
            </div>
          </InViewAnimation>

          <div>
            <ProductSlider>
              {productIsLoading || productIsRefetching
                ? Array.from({ length: 6 }).map((_, index) => (
                    <InViewAnimation key={index} delay={index * 0.1}>
                      <ProductCardSkeleton />
                    </InViewAnimation>
                  ))
                : products?.map((product, index) => {
                    if (product.tags.includes("popular")) {
                      return (
                        <InViewAnimation key={product._id} delay={index * 0.1}>
                          <ProductCard product={product} key={product?._id} />
                        </InViewAnimation>
                      );
                    }
                  })}
            </ProductSlider>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularProduct;
