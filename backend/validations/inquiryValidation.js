import { body } from "express-validator";

export const inquiryValidation = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("phone").notEmpty().withMessage("Phone number is required."),
  body("sport").notEmpty().withMessage("Sport is required."),
  body("message").notEmpty().withMessage("Message is required."),
];
