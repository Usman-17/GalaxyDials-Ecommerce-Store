import { Helmet } from "react-helmet-async";

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
        <title>Jemzy.pk | Elegant Jewelry for Every Occasion</title>
        <meta
          name="description"
          content="Shop Jemzy.pk for premium jewelry including rings, necklaces, bracelets, and more. Discover timeless elegance with fast delivery across Pakistan."
        />
        <meta
          name="keywords"
          content="jewelry Pakistan, Jemzy.pk, rings, necklaces, earrings, bracelets, bridal jewelry, fashion accessories, online jewelry store"
        />
        <meta name="author" content="Jemzy.pk" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.jemzy.pk/" />
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
