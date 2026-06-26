import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { contactValidation } from "../validations/contactValidation.js";

const router = express.Router();

router.post("/", contactValidation, createContact);
router.get("/", getContacts);

export default router;
