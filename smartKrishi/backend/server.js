const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models"); // Sequelize Model
const { sendOtpSMS, verifyOtpSMS } = require("./smsService"); // Import SMS API

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Send OTP (via Twilio SMS)
app.post("/send-otp", async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ message: "Phone number is required" });

        const response = await sendOtpSMS(phone);
        res.json({ message: "OTP sent successfully", response });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
});

// 🟢 Verify OTP
app.post("/verify-otp", async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

        const isVerified = await verifyOtpSMS(phone, otp);
        if (!isVerified) return res.status(400).json({ message: "Invalid OTP or expired" });

        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Failed to verify OTP" });
    }
});

// 🟢 User Registration
app.post("/register", async (req, res) => {
    try {
        const { fullName, phone, password, confirmPassword } = req.body;

        if (!fullName || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await User.findOne({ where: { phone } });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullName, phone, password: hashedPassword });

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user" });
    }
});

// 🟢 Test API
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected successfully!" });
});

// 🟢 Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
