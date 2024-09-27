import ProductCard from "./ProductCard";
import ProductSlider from "./ProductSlider";
import SectionHeading from "./SectionHeading";

const SaleProduct = () => {
  return (
    <div className="py-2">
      <div className="mt-10">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Our"} text2={"Flash Sale"} />
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
    </div>
  );
};

export default SaleProduct;
