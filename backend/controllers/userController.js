import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, message: "Profile fetched.", data: { user } });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, mobile, profileImage } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use." });
      }
      user.email = email;
    }

    user.name = name || user.name;
    user.mobile = mobile || user.mobile;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ success: true, message: "Profile image uploaded successfully.", data: { profileImage: user.profileImage } });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const dashboard = {
      name: user.name,
      joinedDate: user.createdAt,
      profileCompletion: Math.min(100, Math.round((Number(!!user.profileImage) + Number(!!user.mobile) + Number(!!user.name) + Number(!!user.email)) / 4 * 100)),
      statistics: {
        inquiriesSubmitted: 0,
        savedAthletes: 0,
        performanceSessions: 0,
      },
    };

    res.json({ success: true, message: "Dashboard data fetched.", data: { dashboard } });
  } catch (error) {
    next(error);
  }
};
