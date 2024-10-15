import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14 my-5 sm:my-10  text-sm">
        <div>
          <h1 className="uppercase text-3xl font-semibold mb-6">
            Galaxy Dials
          </h1>
          <p className="w-full md:w-2/3 text-gray-600">
            Welcome to{" "}
            <span className="font-semibold text-black">GALAXY DIALS</span>,
            where time meets elegance. Our passion for watches drives us to
            curate a collection that blends style, craftsmanship, and
            functionality seamlessly. We invite you to explore our carefully
            selected range of watches and find the perfect companion for every
            moment.
          </p>
        </div>

        <div>
          <p className="uppercase text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link to="/">
              <li className="hover:text-black transition-colors duration-300">
                Home
              </li>
            </Link>

            <Link to="about">
              <li className="hover:text-black transition-colors duration-300">
                About Us
              </li>
            </Link>

            <Link to="">
              <li className="hover:text-black transition-colors duration-300">
                Delivery
              </li>
            </Link>

            <Link to="">
              <li className="hover:text-black transition-colors duration-300">
                Privacy Policy
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="uppercase text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition-colors duration-300">
              <a href="tel:+92 3234121361">0323 4121361</a>
            </li>

            <li className="hover:text-black transition-colors duration-300">
              <a href="mailto:galaxydials@gmail.com">galaxydials@gmail.com</a>
            </li>

            <Link to="">
              <li className="hover:text-black transition-colors duration-300">
                INSTAGRAM
              </li>
            </Link>

            <Link to="">
              <li className="hover:text-black transition-colors duration-300">
                FACEBOOK
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-3 sm:py-5 text-[11px] sm:text-sm text-center mb-14 sm:mb-0">
          Copyright {currentYear}@ muhammad.usman.dev - All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
