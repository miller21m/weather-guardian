// services/email.js
const nodemailer = require('nodemailer');

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // Sender email (from env)
    pass: process.env.EMAIL_PASS     // App password or OAuth (not regular login password)       
  }
});

// Send an email with the provided parameters
exports.sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Weather Alerts" <${process.env.EMAIL_USER}>`,// Display name and sender address
    to,
    subject,
    html
  });
};
