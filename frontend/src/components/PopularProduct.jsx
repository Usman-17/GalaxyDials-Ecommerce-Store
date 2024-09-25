import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";

const PopularProduct = () => {
  return (
    <>
      <div className="mt-10">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Our"} text2={"Popular Products"} />
        </div>
      </div>

      <div>
        <ProductSlider>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductSlider>
      </div>
    </>
  );
};

export default PopularProduct;
