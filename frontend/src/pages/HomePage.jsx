import { Helmet } from "react-helmet";

import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductSlider from "../components/ProductSlider";
import SectionHeading from "../components/SectionHeading";
import OurPolicy from "../components/OurPolicy";
import SpecialProduct from "../components/SpecialProduct";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Galaxy Dials | Luxury Watches for Every Occasion</title>
        <meta
          name="description"
          content="Explore Galaxy Dials for a curated collection of luxury watches. Enjoy free shipping on orders over Rs.5,000, exclusive deals, and the latest trends in timepieces. Shop premium brands and find the perfect watch for every occasion."
        />
        <meta
          name="keywords"
          content="luxury watches, Galaxy Dials, designer watches, automatic watches, watch trends, premium timepieces, free shipping , buy watches online"
        />
        <link rel="canonical" href="" />
      </Helmet>

      <Hero />

      <div className="mt-10">
        <div className="py-1 text-3xl">
          <SectionHeading text1={"Our"} text2={"Popular Products"} />
        </div>
      </div>
      <div className="">
        <ProductSlider slidesToShow={6}>
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

      <SpecialProduct />
      <OurPolicy />
    </>
  );
};

export default HomePage;
