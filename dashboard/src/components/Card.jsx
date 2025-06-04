const Card = ({ title, value, icon: Icon, badgeIcon: BadgeIcon }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
        {Icon && <Icon className="size-6 text-gray-800" />}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 text-4xl font-bold text-gray-800">{value}</h4>
        </div>

        <div className="flex items-center gap-1 px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
          {BadgeIcon && <BadgeIcon size={16} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
