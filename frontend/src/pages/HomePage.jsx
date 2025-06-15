import { Helmet } from "react-helmet";

import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";
import OurPolicy from "../components/OurPolicy";
import ProductCard from "../components/ProductCard";
import TextMarquee from "../components/TextMarquee";
import SpecialProducts from "../components/SpecialProducts";
import PopularProduct from "../components/PopularProduct";
import SaleProducts from "../components/SaleProducts";
import InViewAnimation from "../components/InViewAnimation";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

const HomePage = () => {
  const { products = [], productIsLoading } = useGetAllProducts();

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
          content="luxury watches, Galaxy Dials, designer watches, automatic watches, watch trends, premium timepieces, free shipping, buy watches online"
        />
        <link rel="canonical" href="" />
      </Helmet>

      <Hero />
      <TextMarquee />
      <PopularProduct />
      <SaleProducts />
      <SpecialProducts />
      <AdBanner />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 sm:gap-2 lg:gap-4">
          {productIsLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.slice(0, 5).map((product, index) => (
                <InViewAnimation key={product._id} delay={index * 0.1}>
                  <ProductCard product={product} key={product?._id} />
                </InViewAnimation>
              ))}
        </div>
      </div>

      <OurPolicy />
    </>
  );
};

export default HomePage;
