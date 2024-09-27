import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import SpecialProductCard from "./SpecialProductCard";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// imports End

const SpecialProduct = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    rows: 1,
    slidesPerRow: 2,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 5000,

    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button className="slick-prev custom-arrow" onClick={onClick}>
        <ChevronLeft />
      </button>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="slick-next custom-arrow" onClick={onClick}>
        <ChevronRight />
      </button>
    );
  }

  return (
    <div className="slider-container mt-10">
      <div className="py-1 text-3xl">
        <SectionHeading text1={"Our"} text2={"Special Products"} />
      </div>
      <Slider {...settings}>
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
        <SpecialProductCard />
      </Slider>
    </div>
  );
};

export default SpecialProduct;
