const StarIcon = () => (
  <svg width="12" height="12" fill="none" style={{ marginRight: 40 }}>
    <path
      fill="currentColor"
      d="M0 6c3 0 6-3 6-6 0 3 3 6 6 6-3 0-6 3-6 6 0-3-3-6-6-6Z"
    />
  </svg>
);

const TextMarquee = () => {
  const messages = [
    "We offer the best products & deals!",
    "Fast delivery & secure checkout!",
    "Explore our collections now!",
    "Great-free returns product within 10 days!",
  ];

  // Duplicate messages to ensure seamless scrolling
  const scrollingMessages = [...messages, ...messages];

  return (
    <div className="w-[100%] overflow-hidden px-1.5">
      <div className="relative overflow-hidden w-[100%]">
        <div className="marquee-track">
          {scrollingMessages.map((msg, idx) => (
            <div
              key={idx}
              className="marquee-item inline-flex items-center mr-[120px] text-[15px] font-medium text-[#111111]"
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
