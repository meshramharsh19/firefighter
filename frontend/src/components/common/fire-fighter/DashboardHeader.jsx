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
import LockIcon from "@mui/icons-material/Lock";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import logoutUser from "@/components/common/auth/logout";
import useUserInfo from "@/components/common/auth/useUserInfo";
import { useTheme } from "@/Context/ThemeContext";
import SafeIcon from "@/components/common/SafeIcon";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/fire-fighter/vehicle-drone-selection`;

export default function DashboardHeader() {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  const { name, role, initials } = useUserInfo();

  const warningShownRef = useRef(false);


  // 🔥 DEV FLAG (ENV BASED)
  const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_SHIFT === "true";

  // ⏱️ SESSION TIMER LOGIC
  useEffect(() => {
    const sessionData = sessionStorage.getItem("fireOpsSession");
    let expiryTime = null;

    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      expiryTime = parsed.sessionExpiry;
    }

    if (!expiryTime) {
      logoutUser();
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const secondsLeft = Math.max(
        0,
        Math.floor((expiryTime - now) / 1000)
      );

      setTimeRemaining(secondsLeft);

      if (secondsLeft === 300 && !warningShownRef.current) {
        toast("Session expiring in 5 minutes!", { icon: "⚠️" });
        warningShownRef.current = true;
      }

      if (secondsLeft === 0) {
        logoutUser();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // ⚡ DEV CONSOLE COMMAND
  useEffect(() => {
    if (DEV_BYPASS) {
      window.forceShiftComplete = () => {
        setTimeRemaining(0);
        toast.success("DEV MODE: Shift force-completed ⚡");
      };
    }
  }, [DEV_BYPASS]);

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

  // 🔐 CONDITIONAL LOGOUT
  const handleLogoutAttempt = () => {
    // 🧪 DEV MODE → FORCE LOGOUT
    if (DEV_BYPASS) {
      toast.success("DEV MODE: Logout allowed 🧪");
      logoutUser();
      return;
    }

    // 🔒 PROD MODE
    if (timeRemaining > 0) {
      toast.error(
        `Shift Active! Cannot logout for ${formatTime(timeRemaining)}`,
        {
          icon: "🔒",
          style: {
            background: "#333",
            color: "#fff",
            border: "1px solid #555",
          },
        }
      );
      setMenuAnchor(null);
    } else {
      logoutUser();
    }
  };


  // ✅ UPDATED LONG POLLING LOGIC
  useEffect(() => {
    let isActive = true;   // 🔵 NEW

    const poll = async (lastCount = 0) => {   // 🔵 NEW (recursive function with parameter)
      try {
        const res = await fetch(
          `${API}/get_incident_alert_count.php?lastCount=${lastCount}`,  // 🔵 CHANGED (added lastCount)
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!isActive) return;  // 🔵 NEW safety check

        setNotificationCount(data.count);

        // 🔵 IMPORTANT: Immediately start next poll with updated count
        poll(data.count);

      } catch (err) {
        console.error("Polling error:", err);

        // 🔵 Retry after delay if error
        setTimeout(() => poll(lastCount), 2000);
      }
    };

    poll(0);  // 🔵 START with 0

    return () => {
      isActive = false;  // 🔵 CLEAN STOP
    };
  }, []);





  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#0d0d0d",
        borderBottom: "1px solid #1f1f1f",
        color: "white",
      }}
      elevation={3}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "#b71c1c", border: "2px solid #ff5252" }}>
            <WhatshotIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#ff5252" }}>
              FireOps Command
            </Typography>
            <Typography fontSize={12} sx={{ color: "#bbbbbb" }}>
              Emergency Operations Dashboard
            </Typography>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={2}>
          {DEV_BYPASS && (
            <Chip
              label="DEV MODE"
              color="warning"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          )}

          <Chip
            icon={<AccessTimeIcon sx={{ color: "white" }} />}
            label={formatTime(timeRemaining)}
            color={getTimerColor()}
            sx={{
              fontWeight: "bold",
              background: "#1f1f1f",
              color: "white",
              border: "1px solid #333",
            }}
          />

          <IconButton sx={{ color: "white" }}>
            <Badge
              badgeContent={notificationCount}
              color="error"
              invisible={notificationCount === 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "#333" }}>{initials}</Avatar>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
              <Typography sx={{ fontSize: 12, color: "#bbbbbb" }}>
                {role}
              </Typography>
            </Box>
            <ExpandMoreIcon />
          </Box>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            PaperProps={{
              sx: {
                background: "#1a1a1a",
                color: "white",
                width: 220,
              },
            }}
          >
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>

            <MenuItem onClick={toggleTheme}>
              <SafeIcon
                name={isDark ? "Sun" : "Moon"}
                size={16}
                className="mr-2"
              />
              {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </MenuItem>

            <MenuItem>
              <SettingsIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>

            <Divider sx={{ my: 1, borderColor: "#333" }} />

            <MenuItem
              onClick={handleLogoutAttempt}
              sx={{
                color: timeRemaining > 0 && !DEV_BYPASS ? "#777" : "red",
                cursor:
                  timeRemaining > 0 && !DEV_BYPASS
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {timeRemaining > 0 && !DEV_BYPASS ? (
                <LockIcon sx={{ mr: 1 }} />
              ) : (
                <LogoutIcon sx={{ mr: 1 }} />
              )}
              {timeRemaining > 0 && !DEV_BYPASS ? "Shift Locked" : "Logout"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
