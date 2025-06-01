import User from "../models/user.model.js";

// PATH     : /api/user/id"
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Get a User
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/user/
// METHOD   : GET
// ACCESS   : PRIVATE
// DESC     : Get All the Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers Controller:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// PATH     : /api/user/role/:id
// METHOD   : PUT
// ACCESS   : PRIVATE
// DESC     : Update user Role
export const updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!role || !["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error while updating role" });
  }
};
