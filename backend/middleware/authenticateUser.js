import User from "../models/userModel.js";
import { verifyToken } from "../utils/tokenUtils.js";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access." });
  }

  const decoded = verifyToken(token);
  if (!decoded || typeof decoded === "string" || !decoded.id) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found." });
  }

  req.user = user;
  next();
};

export default authenticateUser;
