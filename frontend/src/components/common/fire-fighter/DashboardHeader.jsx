import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock"; // ⭐ Import Lock Icon
import WhatshotIcon from "@mui/icons-material/Whatshot";

import logoutUser from "@/components/common/auth/logout"; // Fixed path
import useUserInfo from "@/components/common/auth/useUserInfo";
import { useTheme } from "@/Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import SafeIcon from "@/components/common/SafeIcon"; 
import { toast } from "react-hot-toast"; 

export default function DashboardHeader() { 
  const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_SHIFT === "true";
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [notificationCount] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { isDark, toggleTheme } = useTheme();
  const { name, role, initials } = useUserInfo();

  const navigate = useNavigate();
  const warningShownRef = useRef(false); 

  // --- TIMER LOGIC (Same as before) ---
  useEffect(() => {
    // 1. Get Expiry from Session Storage
    const sessionData = sessionStorage.getItem("fireOpsSession");
    let expiryTime = null;

    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      expiryTime = parsed.sessionExpiry;
    }

    if (!expiryTime) {
        logoutUser(); // Force logout if no timer exists
        return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));

      setTimeRemaining(secondsLeft);

      // Warning Toast (5 mins left)
      if (secondsLeft === 300 && !warningShownRef.current) {
        toast("Session expiring in 5 minutes!", { icon: "⚠️" });
        warningShownRef.current = true;
      }

      // Auto-Logout when time is 0
      if (secondsLeft === 0) {
          logoutUser();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 300) return "error";    
    if (timeRemaining <= 1800) return "warning"; 
    return "success";                           
  };

  // ⭐ NEW FUNCTION: Handle Conditional Logout
  const handleLogoutAttempt = () => {

     // 🔥 DEV BYPASS
  if (DEV_BYPASS) {
    toast.success("DEV MODE: Force logout enabled 🧪");
    logoutUser();
    return;
  }
    if (timeRemaining > 0) {
        // 🔒 BLOCK LOGOUT
        toast.error(`Shift Active! Cannot logout for ${formatTime(timeRemaining)}`, {
            icon: "🔒",
            style: {
                background: "#333",
                color: "#fff",
                border: "1px solid #555"
            }
        });
        setMenuAnchor(null); // Close the menu
    } else {
        // ✅ ALLOW LOGOUT
        logoutUser();
    }
  };

  return (
    <AppBar position="sticky" sx={{ background: "#0d0d0d", borderBottom: "1px solid #1f1f1f", color: "white" }} elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Side (Logo) */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "#b71c1c", border: "2px solid #ff5252" }}><WhatshotIcon /></Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#ff5252" }}>FireOps Command</Typography>
            <Typography fontSize={12} sx={{ color: "#bbbbbb" }}>Emergency Operations Dashboard</Typography>
          </Box>
          {DEV_BYPASS && (
  <Chip
    label="DEVELOPERS MODE"
    color="warning"
    size="small"
    sx={{ fontWeight: "bold" }}
  />
)}
        </Box>
        

        {/* Right Side (Tools) */}
        <Box display="flex" alignItems="center" gap={2}>
          <Chip
            icon={<AccessTimeIcon sx={{ color: "white" }} />}
            label={formatTime(timeRemaining)}
            color={getTimerColor()}
            sx={{ fontWeight: "bold", background: "#1f1f1f", color: "white", border: "1px solid #333" }}
          />

          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={notificationCount} color="error"><NotificationsIcon /></Badge>
          </IconButton>

          <Box onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1 }}>
            <Avatar sx={{ bgcolor: "#333" }}>{initials}</Avatar>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
              <Typography sx={{ fontSize: 12, color: "#bbbbbb" }}>{role}</Typography>
            </Box>
            <ExpandMoreIcon />
          </Box>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            PaperProps={{ sx: { background: "#1a1a1a", color: "white", width: 200 } }}
          >
            <MenuItem><AccountCircleIcon sx={{ mr: 1 }} /> Profile</MenuItem>
            
            <MenuItem onClick={toggleTheme}>
              <SafeIcon name={isDark ? "Sun" : "Moon"} size={16} className="mr-2" />
              {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </MenuItem>

            <MenuItem><SettingsIcon sx={{ mr: 1 }} /> Settings</MenuItem>

            <Divider sx={{ my: 1, borderColor: "#333" }} />

            {/* ⭐ MODIFIED LOGOUT MENU ITEM */}
            <MenuItem 
                onClick={handleLogoutAttempt} 
                sx={{ 
                    // Visual feedback: Gray text if locked, Red if free
                    color: timeRemaining > 0 ? "#777" : "red",
                    cursor: timeRemaining > 0 ? "not-allowed" : "pointer"
                }}
            >
              {/* Change Icon based on status */}
              {timeRemaining > 0 ? <LockIcon sx={{ mr: 1 }} /> : <LogoutIcon sx={{ mr: 1 }} />}
              
              {/* Change Text based on status */}
              {timeRemaining > 0 ? "Shift Locked" : "Logout"}
              
            </MenuItem>

          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}