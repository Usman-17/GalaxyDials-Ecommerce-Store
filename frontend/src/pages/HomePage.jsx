import { Helmet } from "react-helmet";

import Hero from "../components/Hero";
import SpecialProduct from "../components/SpecialProduct";
import PopularProduct from "../components/PopularProduct";
import OurPolicy from "../components/OurPolicy";

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
      <PopularProduct />
      <SpecialProduct />
      <OurPolicy />
    </>
  );
};

export default HomePage;
