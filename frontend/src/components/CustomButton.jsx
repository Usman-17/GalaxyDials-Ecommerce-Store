const CustomButton = ({ disabled, type = "submit", content, className }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-white bg-gray-950 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition ${className} `}
    >
      {content}
    </button>
  );
};

export default CustomButton;
