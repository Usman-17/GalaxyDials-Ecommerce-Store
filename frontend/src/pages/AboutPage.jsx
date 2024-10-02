import SectionHeading from "../components/SectionHeading";
import img from "../assets/add.jpg";

const AboutPage = () => {
  return (
    <>
      <div className="text-xl text-center pt-6 sm:pt-8 border-t">
        <SectionHeading text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-2 flex flex-col md:flex-row sm:gap-16">
        <img
          src={img}
          alt=""
          className="w-full md:max-w-[450px]"
          loading="lazy"
          decoding="async"
        />

        {/* About Content */}
        <div className="flex flex-col justify-center gap-4 sm:gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-900">GALAXY DIALS</span>,
            where passion meets quality. We are more than just an online
            retailer; we are a hub of curated products designed to enhance your
            lifestyle. Here&apos;s a glimpse into who we are and what sets us
            apart.
          </p>

          <p>
            Since our inception, we&apos;ve worked tirelessly to curate a
            diverse selection of high-quality products that cater to every taste
            and preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <b className="text-gray-800 mt-2 text-lg">Our Mission</b>
          <p style={{ marginTop: "-14px" }}>
            Our mission is to curate an exquisite collection of wristwatches
            that transcend mere timekeeping, transforming each moment into an
            elegant expression of individuality. We aspire to redefine the way
            our customers perceive and interact with time by offering a
            carefully selected range of watches that combine timeless design,
            innovative technology, and unparalleled craftsmanship.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
