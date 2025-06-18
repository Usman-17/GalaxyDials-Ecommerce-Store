import Animation from "./Animation";
import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";
import InViewAnimation from "./InViewAnimation";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const SpecialProducts = () => {
  const { products = [], productIsLoading } = useGetAllProducts();

  const specialProducts = products?.filter((product) =>
    product.tags.includes("Special")
  );

  return (
    <div className="py-5">
      {specialProducts.length > 0 && (
        <div className="sm:mt-5">
          <InViewAnimation delay={0.1}>
            <div className="py-1 text-3xl">
              <SectionHeading text1="Our" text2="Special Products" />
            </div>
          </InViewAnimation>
        </div>
      )}

      {productIsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        specialProducts.length > 0 && (
          <ProductSlider>
            {specialProducts.map((product, index) => (
              <Animation key={product._id} delay={index * 0.1}>
                <ProductCard product={product} />
              </Animation>
            ))}
          </ProductSlider>
        )
      )}
    </div>
  );
};

export default SpecialProducts;
