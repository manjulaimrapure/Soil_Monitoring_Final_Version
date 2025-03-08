import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../firebaseConfig"; // Import Firebase configuration


import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    identifier: "", // Email or Phone
    otp: ["", "", "", "", "", ""], // OTP Array
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...userData.otp];
      newOtp[index] = value;
      setUserData({ ...userData, otp: newOtp });
    }
  };

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: userData.identifier }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent successfully!");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setMessage("Error sending OTP. Try again.");
    }
    setLoading(false);
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const otpString = userData.otp.join(""); // Convert array to string
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: userData.identifier, otp: otpString }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setMessage("OTP verified successfully!");
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Error verifying OTP. Try again.");
    }
    setLoading(false);
  };

  // 🔹 Register User
  const handleGoogleLogin = async () => {
    // Initialize Firebase
    const auth = getAuth(app); // Use the imported app instance

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log("Google login successful:", { user });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!otpVerified) {
      setMessage("Please verify your OTP before registering.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
      } else {
        setMessage(data.message || "Failed to register");
      }
    } catch (error) {
      setMessage("Error registering. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
      <Card className="w-full max-w-md border-soil-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Sprout className="h-12 w-12 text-soil-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-soil-800">
            {t("auth.createAccount")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-soil-700">
                {t("auth.fullName")}
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder={t("auth.fullName")}
                value={userData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email / Phone Field with OTP */}
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-soil-700">
                {t("Email or Phone No")}
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="identifier"
                  type="text"
                  placeholder={t("Email or Phone No Placeholder")}
                  value={userData.identifier}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
                <Button type="button" onClick={handleSendOtp} disabled={otpSent || loading}>
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Button>
              </div>
            </div>

            {/* OTP Input Fields */}
            {otpSent && (
              <div className="space-y-2">
                <Label className="text-soil-700">Enter OTP</Label>
                <div className="flex justify-center space-x-2">
                  {userData.otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-10 text-center text-lg border border-soil-400"
                    />
                  ))}
                </div>
                <Button type="button" onClick={handleVerifyOtp} disabled={otpVerified || loading}>
                  {otpVerified ? "OTP Verified" : "Verify OTP"}
                </Button>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-soil-700">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-soil-700">{t("Confirm Password")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="button" onClick={handleGoogleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Sign up with Google
            </Button>
            <Button type="submit" disabled={loading || !otpVerified} className="w-full bg-soil-600 hover:bg-soil-700">

              {t("auth.createAccount")}
            </Button>
          </form>
          {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
