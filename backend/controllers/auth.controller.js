import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateUserTokenAndSetCookie,
  generateAdminTokenAndSetCookie,
} from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";

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

// PATH     : /api/auth/login
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Login a User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare provided password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate token and set cookie
    generateUserTokenAndSetCookie(user, res);

    // Send user info in response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/auth/login/admin
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Login a Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Find admin by email
    const admin = await User.findOne({ email });

    // Check if user exists and is an admin
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Not Authorized" });
    }

    // Compare provided password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate token and set cookie for the admin
    generateAdminTokenAndSetCookie(admin, res);

    // Send user info in response
    res.status(200).json({
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      mobile: admin.mobile,
    });
  } catch (error) {
    console.error("Error in Adminlogin controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/auth/logout
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Logout a User
export const userLogout = async (req, res) => {
  try {
    res.cookie("user_jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User Logout successful" });
  } catch (error) {
    console.log("Error in user logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/auth/logout/admin
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Logout a admin
export const adminLogout = async (req, res) => {
  try {
    res.cookie("admin_jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Admin Logout successful" });
  } catch (error) {
    console.log("Error in admin logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/auth/me
// METHOD   : POST
// ACCESS   : PRIVATE
// DESC     : Check User authenticated
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATH     : /api/user/update/profile"
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : update User
export const updateProfile = async (req, res) => {
  try {
    const { fullName, mobile, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("-role -cart");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentPassword && newPassword) {
      if (user.password) {
        const isPasswordMatched = await bcrypt.compare(
          currentPassword,
          user.password
        );

        if (!isPasswordMatched) {
          return res
            .status(400)
            .json({ error: "Current password is incorrect" });
        }
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          error: "New password must be at least 8 characters long",
        });
      }

      // Update password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    } else if (currentPassword || newPassword) {
      return res.status(400).json({
        error:
          "Both current password and new password must be provided to change the password",
      });
    }

    if (fullName) user.fullName = fullName;
    if (mobile) user.mobile = mobile;

    // Handle profile image upload
    if (req.files && req.files.profileImg) {
      if (user.profileImg && user.profileImg.public_id) {
        await cloudinary.uploader.destroy(user.profileImg.public_id);
      }

      // Upload new profile image to Cloudinary
      const profileImgResponse = await cloudinary.uploader.upload(
        req.files.profileImg.tempFilePath,
        { folder: "PROFILE_IMAGES" }
      );

      user.profileImg = {
        public_id: profileImgResponse.public_id,
        url: profileImgResponse.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATH     : /api/auth/forgot-password
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Forgot Password Token
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate and save password reset token
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Hi ${user.fullName},</p>
      <p>Please click the button below to reset your password. This link will expire in 10 minutes:</p>
      <p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${token}" 
           style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 4px;">Reset Password</a>
      </p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br>Your Team</p>
    </div>
  </body>
  </html>
`;

    const emailData = {
      to: email,
      subject: "GalaxyDials Password Reset Request",
      text: `Hi ${user.fullName}, please follow this link to reset your password.`,
      html: resetURL,
    };

    await sendEmail(emailData);

    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${user.email}. Check your inbox.`,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ error: error.message });
  }
};
