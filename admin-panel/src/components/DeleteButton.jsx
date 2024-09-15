import { Trash } from "lucide-react";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ms-3 border border-danger rounded-2 bg-transparent"
      style={{ color: "#CC0000", padding: "4px 6px" }}
    >
      <Trash size={18} />
    </button>
  );
};

export default DeleteButton;
