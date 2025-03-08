const twilio = require("twilio");

// Twilio Credentials
const accountSid = "AC0ee2c400e1c8cea3a804d684d2d65b89";
const authToken = "5ac20b40905a499d306a8ff84c536bfd";
const serviceSid = "VA1a8a8c24c4d7ab61575299204266ad2a";

const client = twilio(accountSid, authToken);

// 🟢 Send OTP via Twilio
const sendOtpSMS = async (phone) => {
    try {
        const response = await client.verify.v2.services(serviceSid).verifications.create({
            to: phone,
            channel: "sms",
        });
        return response;
    } catch (error) {
        console.error("Twilio Error (Send OTP):", error);
        throw new Error("Failed to send OTP");
    }
};

// 🟢 Verify OTP via Twilio
const verifyOtpSMS = async (phone, otp) => {
    try {
        const verification_check = await client.verify.v2.services(serviceSid)
            .verificationChecks.create({ to: phone, code: otp });

        return verification_check.status === "approved";
    } catch (error) {
        console.error("Twilio Error (Verify OTP):", error);
        return false;
    }
};

module.exports = { sendOtpSMS, verifyOtpSMS };
