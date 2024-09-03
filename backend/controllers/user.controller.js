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
