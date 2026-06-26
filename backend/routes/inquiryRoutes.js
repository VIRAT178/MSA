import express from "express";
import { createInquiry, getInquiries } from "../controllers/inquiryController.js";
import { inquiryValidation } from "../validations/inquiryValidation.js";

const router = express.Router();

router.post("/", inquiryValidation, createInquiry);
router.get("/", getInquiries);

export default router;
