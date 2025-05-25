import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const SaleProduct = () => {
  const { products, productIsLoading } = useGetAllProducts();

  return (
    <div className="py-2 mt-2 sm:mt-8">
      <div className="sm:mt-5">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Our"} text2={"Flash Sale"} />
        </div>
      </div>

      <div>
        <ProductSlider>
          {productIsLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.map((product) => {
                if (product.tags.includes("sale")) {
                  return <ProductCard product={product} key={product._id} />;
                }
              })}
        </ProductSlider>
      </div>
    </div>
  );
};

export default SaleProduct;
