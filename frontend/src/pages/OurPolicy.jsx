import exchange from "../assets/exchange.png";
import verified from "../assets/verified.png";
import support from "../assets/support.png";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-5 sm:gap-2 text-center py-20 lg:px-20  text-xs sm:text-sm md:text-bas etext-gray-700">
      <div>
        <img src={exchange} alt="exchange" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      <div>
        <img src={verified} alt="verified" className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <img src={support} alt="support" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
