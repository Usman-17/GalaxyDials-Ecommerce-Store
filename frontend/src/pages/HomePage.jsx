import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider";
import SectionHeading from "../components/SectionHeading";

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="mt-10">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Our"} text2={"Popular Products"} />
        </div>
      </div>
      <div className="mb-10">
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

export default HomePage;
