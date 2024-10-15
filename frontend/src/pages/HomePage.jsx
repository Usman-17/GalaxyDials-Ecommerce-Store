import { Helmet } from "react-helmet";

import Hero from "../components/Hero";
import SaleProduct from "../components/SaleProduct";
import SpecialProduct from "../components/SpecialProduct";
import PopularProduct from "../components/PopularProduct";
import OurPolicy from "../components/OurPolicy";
import AdBanner from "../components/AdBanner";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const HomePage = ({ products, isLoading }) => {
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
      <SaleProduct products={products} isLoading={isLoading} />
      <SpecialProduct products={products} isLoading={isLoading} />
      <PopularProduct products={products} isLoading={isLoading} />
      <AdBanner />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 sm:gap-2 lg:gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products
                ?.slice(0, 5)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    to={`/product/${product._id}`}
                    image={product.productImages[0]?.url}
                    title={product.title}
                    brand={product.brand}
                    price={product.price}
                    salePrice={product.salePrice}
                  />
                ))}
        </div>
      </div>

      <OurPolicy />
    </>
  );
};

export default HomePage;
