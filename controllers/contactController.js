// controllers/contactController.js
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Configure the transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
      replyTo: html.includes("replyTo") ? html.replyTo : process.env.GMAIL_USER,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Submit contact form handler with integrated validation
exports.submitContactForm = async (req, res) => {
  try {
    // Run validation first
    await Promise.all([
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Vui lòng nhập họ và tên")
        .run(req),
      body("email")
        .isEmail()
        .withMessage("Vui lòng nhập email hợp lệ")
        .run(req),
      body("phone")
        .trim()
        .notEmpty()
        .withMessage("Vui lòng nhập số điện thoại")
        .run(req),
      body("message")
        .trim()
        .notEmpty()
        .withMessage("Vui lòng nhập nội dung tin nhắn")
        .run(req),
    ]);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { name, email, phone, message } = req.body;

    // Optional: Log contact submission (could be saved to database in real application)
    console.log(`New contact form submission from ${name} (${email})`);

    // Format the email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Thông tin liên hệ mới</h2>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #555;">Họ và tên:</strong>
          <p style="margin: 5px 0;">${name}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #555;">Email:</strong>
          <p style="margin: 5px 0;">${email}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #555;">Số điện thoại:</strong>
          <p style="margin: 5px 0;">${phone}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #555;">Nội dung tin nhắn:</strong>
          <p style="margin: 5px 0; white-space: pre-line;">${message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
          Tin nhắn này được gửi từ form liên hệ trên website Kỳ Long.
        </div>
      </div>
    `;

    // Define email metadata
    const recipientEmail = process.env.CONTACT_EMAIL || "info@kylong.com.vn";
    const subject = `Liên hệ mới từ website - ${name}`;

    // Send the email using our sendEmail function
    emailContent.replyTo = email; // Add reply-to field
    await sendEmail(recipientEmail, subject, emailContent);

    // Return success response
    res.status(200).json({
      success: true,
      message:
        "Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất có thể.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.",
    });
  }
};
