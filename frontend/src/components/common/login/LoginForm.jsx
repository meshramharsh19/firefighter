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
  CircularProgress,
  Grid,
} from "@mui/material";

import {
  Flame,
  Phone,
  Send,
  CheckCircle,
  ArrowLeft,
  RotateCw,
  Lock,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/common/login`;

const OTPInput = ({ length = 6, value, onChange, disabled }) => {
  const inputRefs = useRef([]);

  const otpArray = Array(length)
    .fill("")
    .map((_, i) => value[i] || "");

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = otpArray.map((d, i) => (i === index ? digit : d)).join("");

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onChange(newOtp);
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
            disabled={disabled}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "20px",
                padding: "10px",
              },
            }}
            sx={{ width: 48 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default function LoginForm() {
  const [state, setState] = useState({
    step: "mobile",
    mobileNumber: "",
    otp: "",
    isLoading: false,
  });

  const isMobileStep = state.step === "mobile";
  const isOTPStep = state.step === "otp";

  const handleMobileSubmit = async (e) => {
    e.preventDefault();

    const mobile = state.mobileNumber.trim();
    const regex = /^[0-9]{10}$/;

    if (!regex.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    setState((p) => ({ ...p, isLoading: true }));

    try {
      const res = await fetch(`${API}/check_mobile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });

      const result = await res.json();

      if (!result.exists) {
        toast.error("Mobile number not registered");
        setState((p) => ({ ...p, isLoading: false }));
        return;
      }

      toast.success("OTP Sent! (Use 123456)");

      setState((p) => ({
        ...p,
        step: "otp",
        isLoading: false,
      }));
    } catch {
      toast.error("Server error");
      setState((p) => ({ ...p, isLoading: false }));
    }
  };

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

  const handleOTPSubmit = async () => {
    if (state.otp !== "123456") {
      toast.error("Invalid OTP");
      setState((p) => ({ ...p, otp: "" }));
      return;
    }

    setState((p) => ({ ...p, isLoading: true }));

    try {
      const res = await fetch(`${API}/get_user.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: state.mobileNumber }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("User not found");
        setState((p) => ({ ...p, isLoading: false }));
        return;
      }

      const user = result.user;

      if (user.status === 0) {
        toast.error("Account Deactivated");
        setState((p) => ({ ...p, isLoading: false }));
        return;
      }

      const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours
      const sessionExpiry = Date.now() + SESSION_DURATION;

      sessionStorage.setItem(
        "fireOpsSession",
        JSON.stringify({
          userId: user.id,
          name: user.fullName,
          phone: user.phone,
          role: user.role,
          station: user.station,
          designation: user.designation,
          sessionExpiry,
        })
      );

      toast.success("Login successful!");

      setTimeout(() => {
        window.location.href = redirectBasedOnRole(user.role);
      }, 600);
    } catch {
      toast.error("Server error");
      setState((p) => ({ ...p, isLoading: false }));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 450,
        mx: "auto",
        mt: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Flame size={60} color="#D32F2F" />
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: 1 }}
        >
          FireOps Command
        </Typography>
      </Box>


      <Card sx={{ width: "100%", p: 1, boxShadow: 4 }}>
        <CardHeader
          title={
            <Typography variant="h5">
              {isMobileStep ? "Fire Fighter Login" : "Verify OTP"}
            </Typography>
          }
        />

        <CardContent>
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
                fullWidth
                type="submit"
                sx={{ mt: 3, height: 48 }}
                variant="contained"
                color="error"
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

          {isOTPStep && (
            <>
              <OTPInput
                value={state.otp}
                onChange={(otp) => setState((p) => ({ ...p, otp }))}
                disabled={state.isLoading}
              />

              <Button
                fullWidth
                variant="contained"
                color="error"
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

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button
                  startIcon={<ArrowLeft size={16} />}
                  onClick={() => setState((p) => ({ ...p, step: "mobile" }))}
                >
                  Change Number
                </Button>

                <Button
                  startIcon={<RotateCw size={16} />}
                  onClick={() => toast.success("OTP Resent!")}
                >
                  Resend OTP
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Lock size={14} />
        <Typography variant="caption">
          Secure Authentication
        </Typography>
      </Box>

    </Box>
  );
}
