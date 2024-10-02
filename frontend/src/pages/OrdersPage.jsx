import SectionHeading from "../components/SectionHeading";
import img from "../assets/watch.webp";

const OrdersPage = () => {
  return (
    <div className="border-t pt-4 sm:pt-14">
      <div className="text-2xl">
        <SectionHeading text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2 sm:gap-6 text-sm">
          <img
            src={img}
            alt="Product image"
            className="w-20 sm:w-24 rounded-b-md object-cover"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p
              className="text-xs sm:text-lg font-medium"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: "1.3",
              }}
            >
              POEDAGAR Luxury Men ograph P996 POEDAGAR Luxury
            </p>

            <div className="flex items-center gap-5 mt-1 sm:mt-2">
              {/* Price */}
              <p className="text-sm sm:text-lg">Rs. 4000</p>

              {/* Color */}
              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm rounded">
                Gold
              </p>
            </div>

            <div className="flex justify-between items-center mt-1">
              <p className="">
                Date:{" "}
                <span className="text-gray-400 text-xs sm:text-base">
                  25,July 2024
                </span>
              </p>

              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to Ship</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
