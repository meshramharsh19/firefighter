import React, { useState, useRef, useEffect } from 'react';
// Material UI Imports (Simulating a standard setup)
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
  Grid
} from '@mui/material';
// Lucide Icon Imports (Used for visual continuity with the original 'SafeIcon')
import { 
  Flame, 
  Phone, 
  Send, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft, 
  RotateCw, 
  Clock, 
  Lock 
} from 'lucide-react';

// --- Mock Data (Replacing '@/data/user') ---
const CURRENT_FIRE_FIGHTER = {
  id: 'FF-421',
  name: 'Captain Rex',
};

// --- Custom OTP Input Component (Implemented using MUI TextField with full UX logic) ---
const OTPInput = ({ length = 6, value, onChange, disabled }) => {
  const inputRefs = useRef([]);
  // Use local state to manage individual digits for complex interactions (paste, backspace, etc.)
  const [otp, setOtp] = useState(Array(length).fill(''));

  // 1. Initialize OTP array from external 'value' prop
  useEffect(() => {
    // Only update if the external value differs significantly from the internal state
    const externalOtpString = value.split('').slice(0, length).join('');
    const internalOtpString = otp.join('');

    if (externalOtpString !== internalOtpString) {
      const otpArray = externalOtpString.split('').slice(0, length);
      setOtp(prev => {
        const newOtp = [...prev];
        otpArray.forEach((digit, index) => {
          newOtp[index] = digit;
        });
        return newOtp;
      });
    }
  }, [value, length]);


  // 2. Logic to auto-focus on the first empty input
  useEffect(() => {
    if (!disabled) {
      const firstEmptyIndex = otp.findIndex(digit => !digit);
      if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
        // Use a slight timeout to ensure the browser finishes rendering before focusing
        const timer = setTimeout(() => {
            inputRefs.current[firstEmptyIndex]?.focus();
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [otp, disabled]);

  const handleChange = (index, digit) => {
    // Only allow digits
    if (!/^\d*$/.test(digit)) return;

    // We only take the last character if a string is entered (e.g., via type)
    const char = digit.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = char;

    setOtp(newOtp);

    // Call onChange with complete OTP string
    const otpString = newOtp.join('');
    onChange(otpString);

    // Auto-focus next input only if a character was actually entered and it's not the last field
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default browser navigation/back
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // Clear current input if not empty
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (digits.length > 0) {
      const newOtp = Array(length).fill(''); // Start with a clean slate
      digits.split('').forEach((d, i) => {
        if (i < length) {
          newOtp[i] = d;
        }
      });
      
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus last input or next input after the pasted block
      const focusIndex = Math.min(digits.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      {Array.from({ length }).map((_, index) => (
        <Grid item key={index}>
          <TextField
            inputRef={el => (inputRefs.current[index] = el)}
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            variant="outlined"
            size="medium"
            type="text"
            inputMode="numeric"
            autoFocus={index === 0}
            // MUI InputProps equivalent to custom styling and attributes
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '1.5rem', padding: '12px' }, // Equivalent to text-2xl font-bold
            }}
            // Custom styling equivalent to the original Tailwind classes
            sx={{
              width: 55, // Equivalent to w-12/h-14 square box
              height: 55, 
              '& input': {
                // Style for the input element itself
                padding: '12px 0', 
                height: '100%',
              },
              // Default state
              '& .MuiOutlinedInput-root': {
                borderRadius: 1, // Rounded corners
                backgroundColor: '#f5f5f5', // bg-input/bg-muted equivalent
                borderColor: '#ccc', // border-border equivalent
                transition: 'all 0.2s',
              },
              // Focus state equivalent to focus:border-primary focus:ring-2
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'error.main', // Using the primary color (Red)
                borderWidth: '2px',
                boxShadow: `0 0 0 2px rgba(211, 47, 47, 0.2)`, // Focus ring equivalent
              },
              // Filled state equivalent to otp[index] && 'border-primary/50 bg-primary/5'
              '& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                borderColor: otp[index] ? 'error.light' : '#ccc',
                backgroundColor: otp[index] ? 'rgba(211, 47, 47, 0.05)' : '#f5f5f5',
              },
              // Disabled state
              '& .Mui-disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};


export default function LoginForm() {
  const [state, setState] = useState({
    step: 'mobile',
    mobileNumber: '',
    otp: '',
    isLoading: false,
    error: null,
    successMessage: null,
  });

  // Since the new OTPInput component now manages its own internal state and triggers
  // onChange with the full string, the logic here is simplified.
  const handleOtpChange = (newOtp) => {
    setState(prev => ({ ...prev, otp: newOtp }));
    if (newOtp.length === 6 && !state.isLoading) {
      handleOTPSubmit(newOtp);
    }
  };


  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, error: null, successMessage: null }));

    const mobileRegex = /^[+]?[0-9]{10,13}$/;
    if (!mobileRegex.test(state.mobileNumber.replace(/\s/g, ''))) {
      setState(prev => ({
        ...prev,
        error: 'Please enter a valid mobile number (10-13 digits)',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call to send OTP
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        step: 'otp',
        isLoading: false,
        successMessage: `OTP sent to ${state.mobileNumber}. Valid for 5 minutes. (Demo: use 123456)`,
        otp: '', // Ensure OTP is clear when moving to OTP step
      }));
    }, 1500);
  };

  const handleOTPSubmit = async (otp) => {
    setState(prev => ({ ...prev, error: null, successMessage: null, otp: otp }));

    if (otp.length !== 6) {
      setState(prev => ({
        ...prev,
        error: 'Please enter a valid 6-digit OTP',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call to verify OTP
    setTimeout(() => {
      if (otp === '123456') {
        setState(prev => ({
          ...prev,
          isLoading: false,
          successMessage: 'Login successful! Redirecting...',
        }));
          
        sessionStorage.setItem('fireOpsSession', JSON.stringify({
          firefighterId: CURRENT_FIRE_FIGHTER.id,
          name: CURRENT_FIRE_FIGHTER.name,
          mobileNumber: state.mobileNumber,
          loginTime: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        }));

        setTimeout(() => {
          // This should navigate to the dashboard page in the external environment
          window.location.href = './fire-fighter-dashboard.html';
        }, 1000);
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid OTP. Please try again. (Demo: use 123456)',
          otp: '', // Clear OTP field
        }));
      }
    }, 1500);
  };

  const handleBackToMobile = () => {
    setState(prev => ({
      ...prev,
      step: 'mobile',
      otp: '',
      error: null,
      successMessage: null,
    }));
  };

  const handleResendOTP = () => {
    // Clear previous OTP state and re-trigger the mobile submit logic
    setState(prev => ({ ...prev, otp: '', error: null, successMessage: null }));
    handleMobileSubmit({ preventDefault: () => {} });
  };

  const isMobileStep = state.step === 'mobile';
  const isOTPStep = state.step === 'otp';

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: 400, 
        margin: '0 auto', 
        padding: 3,
        // Center the whole form vertically/horizontally
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: 2,
          }}
        >
          <Box 
            sx={{
              height: 64, 
              width: 64, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%', 
              bgcolor: 'error.light', 
              border: '2px solid rgba(255, 0, 0, 0.2)',
            }}
          >
            <Flame size={32} color="#D32F2F" />
          </Box>
        </Box>
        <Typography variant="h4" component="h1" fontWeight="bold" color="textPrimary">
          FireOps Command
        </Typography>
        <Typography color="textSecondary">
          Emergency Operations Dashboard
        </Typography>
      </Box>

      {/* Login Card */}
      <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <CardHeader 
          title={
            <Typography variant="h5" component="div" fontWeight="medium">
              {isMobileStep ? 'Fire Fighter Login' : 'Verify OTP'}
            </Typography>
          }
          subheader={
            <Typography color="textSecondary">
              {isMobileStep
                ? 'Enter your registered mobile number to receive an OTP'
                : 'Enter the 6-digit OTP sent to your mobile'}
            </Typography>
          }
          sx={{ paddingBottom: 1 }}
        />

        <CardContent sx={{ paddingTop: 0, paddingBottom: '16px !important' }}>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Error Alert */}
            {state.error && (
              <Alert icon={<AlertCircle size={20} />} severity="error">
                {state.error}
              </Alert>
            )}

            {/* Success Alert */}
            {state.successMessage && (
              <Alert icon={<CheckCircle size={20} />} severity="success">
                {state.successMessage}
              </Alert>
            )}

            {/* Mobile Number Step */}
            {isMobileStep && (
              <Box component="form" onSubmit={handleMobileSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  id="mobile-number"
                  label="Mobile Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  variant="outlined"
                  value={state.mobileNumber}
                  onChange={(e) =>
                    setState(prev => ({
                      ...prev,
                      mobileNumber: e.target.value,
                    }))
                  }
                  disabled={state.isLoading}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <Phone size={20} color="gray" />
                      </Box>
                    ),
                  }}
                  helperText="Enter your 10-13 digit mobile number with country code"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  size="large"
                  fullWidth
                  disabled={state.isLoading || !state.mobileNumber.trim()}
                  startIcon={state.isLoading ? <CircularProgress size={20} color="inherit" /> : <Send size={20} />}
                  sx={{ height: 50, fontWeight: 'bold', textTransform: 'none' }}
                >
                  {state.isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>

                {/* Demo Info */}
                <Box sx={{ 
                  bgcolor: 'grey.50', 
                  border: '1px solid', 
                  borderColor: 'grey.300', 
                  borderRadius: 1, 
                  p: 2 
                }}>
                  <Typography variant="caption" display="block" fontWeight="medium" color="textPrimary">
                    Demo Credentials:
                  </Typography>
                  <Typography variant="caption" display="block" fontFamily="monospace" color="textSecondary" sx={{ mt: 0.5 }}>
                    Mobile: +919876543210
                  </Typography>
                  <Typography variant="caption" display="block" fontFamily="monospace" color="textSecondary">
                    OTP: 123456
                  </Typography>
                </Box>
              </Box>
            )}

            {/* OTP Verification Step */}
            {isOTPStep && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" component="label" sx={{ display: 'block', mb: 1 }}>
                    Enter 6-Digit OTP
                  </Typography>
                  <OTPInput
                    value={state.otp}
                    onChange={handleOtpChange}
                    disabled={state.isLoading}
                    length={6}
                  />
                  <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
                    OTP sent to {state.mobileNumber}
                  </Typography>
                </Box>

                {/* Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleBackToMobile}
                    disabled={state.isLoading}
                    startIcon={<ArrowLeft size={16} />}
                  >
                    Change Number
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleResendOTP}
                    disabled={state.isLoading}
                    startIcon={state.isLoading ? <CircularProgress size={16} color="inherit" /> : <RotateCw size={16} />}
                  >
                    Resend OTP
                  </Button>
                </Box>

                {/* OTP Timer */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: 'text.secondary' }}>
                  <Clock size={16} />
                  <Typography variant="body2">
                    OTP expires in 4:32 (Simulated)
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <Box sx={{ marginTop: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="caption" display="block">
          Session valid for <Typography component="span" fontWeight="bold" color="textPrimary" variant="caption">8 hours</Typography> from login
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
          <Lock size={14} />
          <Typography variant="caption">
            Secure SMS-based authentication
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}