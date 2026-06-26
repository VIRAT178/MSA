import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP configuration is incomplete; skipping email send.");
    return null;
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.warn("Email delivery failed; continuing without notification:", error.message);
    return null;
  }
};

export const sendAdminNotification = async ({ subject, text, html }) => {
  if (!process.env.ADMIN_EMAIL) {
    console.warn("ADMIN_EMAIL is not configured; skipping notification.");
    return null;
  }

  try {
    return await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.warn("Notification delivery failed; continuing without notification:", error.message);
    return null;
  }
};

export const sendUserConfirmationEmail = async ({ userEmail, userName, sport, message }) => {
  if (!userEmail) {
    console.warn("User email is missing; skipping confirmation email.");
    return null;
  }

  const subject = "Inquiry Confirmation - Malwa Sports Academy";
  const text = `Hello ${userName},\n\nThank you for your inquiry! We have received your submission for ${sport}.\n\nYour message: "${message}"\n\nWe will review your inquiry and get back to you soon.\n\nBest regards,\nMalwa Sports Academy Team`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #cc0000; margin: 0;">Malwa Sports Academy</h1>
      </div>
      
      <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Inquiry</h2>
      
      <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
        Hello <strong>${userName}</strong>,
      </p>
      
      <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
        We have successfully received your inquiry regarding <strong>${sport}</strong>. Thank you for your interest in joining Malwa Sports Academy!
      </p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #cc0000; margin: 20px 0;">
        <p style="color: #666; margin: 0;"><strong>Your Message:</strong></p>
        <p style="color: #666; margin: 10px 0 0 0; font-style: italic;">"${message}"</p>
      </div>
      
      <p style="color: #666; line-height: 1.6; margin: 20px 0;">
        Our team will review your inquiry and contact you shortly with the next steps. We look forward to working with you!
      </p>
      
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
      
      <p style="color: #999; font-size: 12px; text-align: center;">
        If you have any questions, please reply to this email or contact us directly.
      </p>
      
      <p style="color: #cc0000; font-size: 12px; text-align: center; font-weight: bold;">
        Malwa Sports Academy
      </p>
    </div>
  `;

  try {
    return await sendEmail({
      to: userEmail,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.warn("User confirmation email failed; continuing without notification:", error.message);
    return null;
  }
};
