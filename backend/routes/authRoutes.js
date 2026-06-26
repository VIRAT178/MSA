import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
