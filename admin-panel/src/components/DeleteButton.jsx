import { Trash } from "lucide-react";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ms-3 border border-danger rounded-2 delete-btn"
    >
      <Trash size={18} />
    </button>
  );
};

export default DeleteButton;
