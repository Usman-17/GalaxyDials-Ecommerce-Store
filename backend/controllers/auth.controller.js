import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// PATH     : /api/auth/signup
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Create User
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email is already taken"
            : "Phone Number is already taken",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      mobile: newUser.mobile,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
