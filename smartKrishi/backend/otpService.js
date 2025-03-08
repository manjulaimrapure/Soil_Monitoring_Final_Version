const nodemailer = require("nodemailer");
const twilio = require("twilio");
require("dotenv").config();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
});

// Twilio configuration - ensuring ACCOUNT_SID starts with "AC"
const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID, // Make sure this environment variable name is correct
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP via email
const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

// Send OTP via SMS
const sendOtpSMS = async (phone, otp) => {
  try {
    await twilioClient.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Make sure this environment variable name is correct
      to: phone,
    });
    console.log(`OTP SMS sent to ${phone}`);
  } catch (error) {
    console.error("Error sending OTP SMS:", error);
    throw error;
  }
};

module.exports = { sendOtpEmail, sendOtpSMS };