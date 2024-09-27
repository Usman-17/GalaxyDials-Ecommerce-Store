import add from "../assets/add.jpg";

const AdBanner = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-12  md:px-0 lg:px-28">
      <div className="lg:w-1/2 md:w-96 max-w-lg text-center sm:text-left">
        <h2 className="text-2xl md:text-[30px] lg:text-[38px] font-medium text-gray-900 leading-tight mb-1 sm:mb-3">
          &ldquo;Don&rsquo;t Miss Out...
          <br />
          on Our{" "}
          <span className="font-semibold uppercase">Special Offer&rdquo;</span>
        </h2>

        <p className="text-gray-600 text-xs sm:text-base sm:w-5/6">
          The gift that keeps giving! Your Watch Gang membership comes with a
          new watch always worth more than your membership price + entry into
          our 3x weekly giveaways.
        </p>
      </div>

      <div className="flex justify-center mt-6 sm:mt-0">
        <img
          src={add}
          alt="banner"
          className="w-full max-w-lg md:max-w-xs lg:max-w-lg"
        />
      </div>
    </div>
  );
};

export default AdBanner;
