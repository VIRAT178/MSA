import { validationResult } from "express-validator";
import { sendAdminNotification, sendUserConfirmationEmail } from "../services/emailService.js";
import { createInquiryRecord, listInquiryRecords } from "../utils/storage.js";

export const createInquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, phone, sport, message } = req.body;
    const inquiry = createInquiryRecord({ name, email, phone, sport, message, status: "pending" });

    // Send admin notification email
    await sendAdminNotification({
      subject: "New Inquiry Received - Malwa Sports Academy",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSport: ${sport}\nMessage: ${message}\nSubmitted At: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #cc0000;">New Lead Received</h2>
          <p style="color: #666; line-height: 1.6;">
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Sport:</strong> ${sport}<br>
            <strong>Message:</strong> ${message}<br>
            <strong>Submitted At:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    await sendUserConfirmationEmail({
      userEmail: email,
      userName: name,
      sport,
      message,
    });

    res.status(201).json({ success: true, message: "Inquiry submitted successfully. Confirmation email sent.", data: { inquiry } });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await listInquiryRecords();
    res.json({ success: true, message: "Inquiries fetched successfully.", data: { inquiries } });
  } catch (error) {
    next(error);
  }
};
