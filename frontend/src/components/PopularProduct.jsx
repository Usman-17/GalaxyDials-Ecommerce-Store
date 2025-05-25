import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const PopularProduct = () => {
  const { products, productIsLoading } = useGetAllProducts();
  return (
    <>
      {products && (
        <div className="mt-4 sm:mt-5">
          <div className="py-1 text-3xl">
            <SectionHeading text1={"Our"} text2={"Popular Products"} />
          </div>

          <div>
            <ProductSlider>
              {productIsLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : products?.map((product) => {
                    if (product.tags.includes("popular")) {
                      return (
                        <ProductCard key={product._id} product={product} />
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
