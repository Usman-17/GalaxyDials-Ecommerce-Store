import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const EditButton = ({ to }) => {
  return (
    <Link
      to={to}
      className="text-primary border border-2 rounded-2"
      style={{ padding: "4px 6px" }}
    >
      <Pencil  size={18} />
    </Link>
  );
};

export default EditButton;
