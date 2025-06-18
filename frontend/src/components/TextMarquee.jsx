const StarIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    className="text-[#CC0D39] rotate-star mr-3 shrink-0 mt-1"
  >
    <path
      fill="currentColor"
      d="M0 6c3 0 6-3 6-6 0 3 3 6 6 6-3 0-6 3-6 6 0-3-3-6-6-6Z"
    />
  </svg>
);

const TextMarquee = () => {
  const messages = [
    "We offer the best products & deals!",
    "Fast delivery & free shipping!",
    "Explore our exclusive collections!",
    "Easy returns within 7 days!",
  ];

  const scrollingMessages = [...messages, ...messages];

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#fffaf5] border-y border-[#e4e4e7] py-3 z-50 rotate-marquee -mt-12">
      <div className="overflow-hidden px-4 sm:px-10">
        <div className="marquee-track">
          {scrollingMessages.map((msg, idx) => (
            <div
              key={idx}
              className="marquee-item inline-flex items-center gap-2 mr-32 text-sm sm:text-base font-medium text-[#111111] select-none"
            >
              <StarIcon />
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextMarquee;
