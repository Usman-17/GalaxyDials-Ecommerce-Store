import Slider from "react-slick";
import { Link } from "react-router-dom";

import banner_1 from "../assets/hero_banner_1.jpg";
import banner_2 from "../assets/hero_banner_2.jpg";
import banner_3 from "../assets/hero_banner_3.jpg";

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 8000,
  };

  return (
    <div className="slider-container mb-7 sm:mb-0">
      <Slider {...settings}>
        <Link to="/collection" aria-label="Go to collection">
          <div>
            <img
              src={banner_1}
              alt="Banner 1"
              className="h-40 sm:h-96 w-full object-contain"
            />
          </div>
        </Link>
        <Link to="/collection" aria-label="Go to collection">
          <div>
            <img
              src={banner_2}
              alt="Banner 2"
              className="h-40 sm:h-96 w-full object-contain"
            />
          </div>
        </Link>
        <Link to="/collection" aria-label="Go to collection">
          <div>
            <img
              src={banner_3}
              alt="Banner 3"
              className="h-40 sm:h-96 w-full object-contain"
            />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Hero;
