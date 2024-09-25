import { ChevronLeft, ChevronRight } from "lucide-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialProductCard from "./SpecialProductCard";
import SectionHeading from "./SectionHeading";

const SpecialProduct = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    initialSlide: 0,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 8000,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      </Slider>
    </div>
  );
};

export default SpecialProduct;
