import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import multer from "multer";
import { getProfile, updateProfile, changePassword, uploadProfileImage, getDashboard } from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();
const upload = multer({ dest: "./uploads/" });

const profileValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty."),
  body("email").optional().isEmail().withMessage("Valid email is required."),
  body("mobile").optional().isMobilePhone("any").withMessage("Valid mobile number is required."),
];

const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required."),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one digit.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("New password must contain at least one special character."),
];

router.use(authenticateUser);

router.get("/profile", getProfile);
router.put("/profile", profileValidation, updateProfile);
router.put("/change-password", changePasswordValidation, changePassword);
router.post("/profile-image", upload.single("profileImage"), uploadProfileImage);
router.get("/dashboard", getDashboard);

export default router;
