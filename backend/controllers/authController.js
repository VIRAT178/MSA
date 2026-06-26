import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/tokenUtils.js";
import {
  createUserRecord,
  findUserByEmailRecord,
  findUserByIdRecord,
} from "../utils/storage.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, mobile, password, sport } = req.body;
    const existingUser = await findUserByEmailRecord(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = createUserRecord({ name, email, mobile, sport, password: hashedPassword, role: "user" });
    const token = generateToken({ id: user._id });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          sport: user.sport,
          profileImage: user.profileImage || "",
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    const user = await findUserByEmailRecord(email);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken({ id: user._id });
    res.json({
      success: true,
      message: "Login successful.",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          sport: user.sport,
          profileImage: user.profileImage || "",
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logout successful." });
};
