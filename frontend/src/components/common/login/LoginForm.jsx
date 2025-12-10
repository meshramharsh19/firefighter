import toast from "react-hot-toast";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";

// Icons
import {
  Flame,
  Phone,
  Send,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  RotateCw,
  Clock,
  Lock,
} from "lucide-react";


// ----------------------- OTP INPUT -----------------------
const OTPInput = ({ length = 6, value, onChange, disabled }) => {
  const inputRefs = useRef([]);
  const otpArray = Array(length)
    .fill(0)
    .map((_, i) => value[i] || "");

  const handleChange = (e, index) => {
    const input = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = otpArray.map((digit, i) =>
      i === index ? input : digit
    ).join("");

    if (input && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.length <= length) onChange(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled) {
      const firstEmpty = otpArray.findIndex((d) => !d);
      if (firstEmpty !== -1) inputRefs.current[firstEmpty]?.focus();
    }
  }, [value, disabled]);

  return (
    <Grid container spacing={1} justifyContent="center">
      {otpArray.map((digit, index) => (
        <Grid item key={index}>
          <TextField
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            variant="outlined"
            size="medium"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "1.25rem",
                padding: "12px",
              },
            }}
            style={{ width: "48px" }}
            disabled={disabled}
          />
        </Grid>
      ))}
    </Grid>
  );
};


// ----------------------- MAIN LOGIN FORM -----------------------
export default function LoginForm() {
  const [state, setState] = useState({
    step: "mobile",
    mobileNumber: "",
    otp: "",
    isLoading: false,
    error: null,
    successMessage: null,
  });


  // ---------------- Mobile Submit ----------------
  const handleMobileSubmit = async (e) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const mobile = state.mobileNumber.trim();
    const mobileRegex = /^[+]?[0-9]{10,13}$/;

    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid mobile number");
      setState((p) => ({ ...p, isLoading: false }));
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/check_mobile.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: mobile }),
        }
      );

      const result = await response.json();

      if (!result.exists) {
        toast.error("This mobile number is not registered");
        setState((p) => ({ ...p, isLoading: false }));
        return;
      }

      toast.success("OTP sent! (Use 123456)");

      setState((p) => ({
        ...p,
        step: "otp",
        isLoading: false,
        successMessage: "OTP sent! (Use: 123456)",
      }));
    } catch (error) {
      toast.error("Server error, try again");
      setState((p) => ({ ...p, isLoading: false }));
    }
  };


  // ---------------- OTP Change ----------------
  const handleOtpChange = (newOtp) => {
    setState((prev) => ({ ...prev, otp: newOtp }));
  };


  // ---------------- ROLE-BASED REDIRECT ----------------
  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "Admin":
        return "/AdminDashboard";

      case "Fire Station Command Control":
        return "/fire-fighter-dashboard";

      case "Vehicle Driver":
        return "/vehicle-driver";

      case "Pilot":
        return "/pilot-dashboard";

      default:
        return "/AdminDashboard";
    }
  };


  // ---------------- OTP Submit ----------------
 const handleOTPSubmit = async () => {
  const otp = state.otp;

  if (otp !== "123456") {
    toast.error("Invalid OTP");
    setState((p) => ({ ...p, otp: "" }));
    return;
  }

  setState((p) => ({ ...p, isLoading: true }));

  try {
    const response = await fetch(
      "http://localhost/fire-fighter-new/backend/controllers/get_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: state.mobileNumber }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      toast.error("User not found");
      setState((p) => ({ ...p, isLoading: false }));
      return;
    }

    const user = result.user;

    // 🔥 CHECK USER STATUS
    if (user.status === 0) {
      toast.error(
        `Your account is deactivated.\nReason: ${user.deactivation_reason || "No reason provided"}`
      );

      setState((p) => ({ ...p, isLoading: false }));
      return; // Stop login here
    }

    // 🔥 Save active user session
    sessionStorage.setItem(
      "fireOpsSession",
      JSON.stringify({
        userId: user.id,
        name: user.fullName,
        phone: user.phone,
        role: user.role,
        station: user.station,
        designation: user.designation,
        loginTime: new Date().toISOString(),
        sessionExpiry: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      })
    );

    toast.success("Login Successful!");

    const redirectTo = redirectBasedOnRole(user.role);

    setTimeout(() => {
      window.location.href = redirectTo;
    }, 800);

  } catch (error) {
    toast.error("Server error during login");
    setState((p) => ({ ...p, isLoading: false }));
  }
};



  // ---------------- Other Actions ----------------
  const handleBackToMobile = () => {
    setState((prev) => ({
      ...prev,
      step: "mobile",
      otp: "",
      error: null,
      successMessage: null,
    }));
  };

  const handleResendOTP = () =>
    toast("OTP resent!", { icon: "🔄" });


  const isMobileStep = state.step === "mobile";
  const isOTPStep = state.step === "otp";


  // ---------------- UI ----------------
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Flame size={60} color="#D32F2F" />
        <Typography variant="h4" fontWeight="bold">
          FireOps Command
        </Typography>
      </Box>

      {/* LOGIN CARD */}
      <Card sx={{ width: "100%", boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5">
              {isMobileStep ? "Fire Fighter Login" : "Verify OTP"}
            </Typography>
          }
        />

        <CardContent>
          {/* MOBILE STEP */}
          {isMobileStep && (
            <Box component="form" onSubmit={handleMobileSubmit}>
              <TextField
                fullWidth
                label="Mobile Number"
                value={state.mobileNumber}
                onChange={(e) =>
                  setState((p) => ({ ...p, mobileNumber: e.target.value }))
                }
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <Phone size={18} />
                    </Box>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3 }}
                disabled={state.isLoading}
                startIcon={
                  state.isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Send size={20} />
                  )
                }
              >
                {state.isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </Box>
          )}

          {/* OTP STEP */}
          {isOTPStep && (
            <Box sx={{ mt: 3 }}>
              <OTPInput
                value={state.otp}
                onChange={handleOtpChange}
                length={6}
                disabled={state.isLoading}
              />

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 3, height: 48 }}
                disabled={state.otp.length !== 6 || state.isLoading}
                onClick={handleOTPSubmit}
                startIcon={
                  state.isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CheckCircle size={20} />
                  )
                }
              >
                {state.isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              {/* CONTROLS */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
                  variant="text"
                  onClick={handleBackToMobile}
                  startIcon={<ArrowLeft size={16} />}
                >
                  Change Number
                </Button>
                <Button
                  variant="text"
                  onClick={handleResendOTP}
                  startIcon={<RotateCw size={16} />}
                >
                  Resend OTP
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* FOOTER */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Lock size={14} />
        <Typography variant="caption">Secure Authentication</Typography>
      </Box>
    </Box>
  );
}
