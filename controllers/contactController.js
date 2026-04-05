import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendContactMessage = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return next(new ErrorHandler("Please fill all the fields.", 400));
  }

  const contactMessage = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Message: ${message}
  `;

  try {
    await sendEmail({
      email: process.env.SMTP_MAIL, // Send to admin email
      subject: `Contact Form: ${subject}`,
      message: contactMessage,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to send message.", 500));
  }
});