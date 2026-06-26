import { body } from "express-validator";

export const contactValidation = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("phone").notEmpty().withMessage("Phone number is required."),
  body("subject").notEmpty().withMessage("Subject is required."),
  body("message").notEmpty().withMessage("Message is required."),
];
