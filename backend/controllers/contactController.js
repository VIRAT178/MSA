import { validationResult } from "express-validator";
import { sendAdminNotification } from "../services/emailService.js";
import { createContactRecord, listContactRecords } from "../utils/storage.js";

export const createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, phone, subject, message } = req.body;
    const contact = createContactRecord({ name, email, phone, subject, message });

    await sendAdminNotification({
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}\nSubmitted At: ${new Date().toISOString()}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p><p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>`,
    });

    res.status(201).json({ success: true, message: "Contact message submitted successfully.", data: { contact } });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContactRecords();
    res.json({ success: true, message: "Contact submissions fetched successfully.", data: { contacts } });
  } catch (error) {
    next(error);
  }
};
