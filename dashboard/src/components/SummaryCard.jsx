const SummaryCard = ({ icon: Icon, title, count, color }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 border-l-4"
      style={{ borderColor: color }}
    >
      <div
        className={`p-3 rounded-full`}
        style={{ backgroundColor: `${color}1A`, color }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-gray-600 text-sm">{title}</h4>
        <p className="text-2xl font-bold" style={{ color }}>
          {count}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
