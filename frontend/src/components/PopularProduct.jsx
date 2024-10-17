import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./Skeleton/ProductCardSkeleton";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";

const PopularProduct = ({ products, isLoading }) => {
  return (
    <>
      {products && (
        <div className="mt-4 sm:mt-5">
          <div className="py-1 text-3xl">
            <SectionHeading text1={"Our"} text2={"Popular Products"} />
          </div>

          <div>
            <ProductSlider>
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : products?.map((product) => {
                    if (product.tags.includes("popular")) {
                      return (
                        <ProductCard
                          key={product._id}
                          to={`/product/${product._id}`}
                          image={product.productImages[0]?.url}
                          title={product.title}
                          brand={product.brand}
                          price={product.price}
                          salePrice={product.salePrice}
                        />
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
