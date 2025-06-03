import { Link } from "react-router-dom";

const Button = ({ to, title, Icon }) => {
  return (
    <div>
      <Link to={to}>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 rounded bg-black hover:bg-neutral-900 text-sm transition cursor-pointer text-white"
        >
          {Icon && <Icon size={18} />}
          {title}
        </button>
      </Link>
    </div>
  );
};

export default Button;
