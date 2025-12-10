import React, { useState, useEffect } from "react";
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
import WhatshotIcon from "@mui/icons-material/Whatshot";

import logoutUser from "../auth/logout";
import useUserInfo from "@/components/common/auth/useUserInfo";
import { useTheme } from "@/Context/ThemeContext";
import SafeIcon from "@/components/common/SafeIcon";   // ✅ IMPORTANT FIX

export default function DashboardHeader({ sessionStartTime }) {
  const [timeRemaining, setTimeRemaining] = useState(8 * 60 * 60);
  const [notificationCount] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { isDark, toggleTheme } = useTheme();
  const { name, role, initials } = useUserInfo();

  // Timer logic
  useEffect(() => {
    if (!sessionStartTime) return;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      const remaining = Math.max(0, 8 * 60 * 60 - elapsed);

      setTimeRemaining(remaining);

      if (remaining === 0) logoutUser();
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

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
          
          {/* Session Timer */}
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

          {/* Notifications */}
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1 }}
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

          {/* MENU */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            PaperProps={{
              sx: { background: "#1a1a1a", color: "white", width: 200 },
            }}
          >
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>

            {/* Theme Toggle */}
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

            <MenuItem sx={{ color: "red" }} onClick={logoutUser}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
