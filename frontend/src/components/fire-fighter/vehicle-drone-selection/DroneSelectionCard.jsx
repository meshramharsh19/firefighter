import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";

// MUI Icons
import FlightIcon from "@mui/icons-material/Flight";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DroneSelectionCard({ drone, isSelected, onToggle }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: "default",
        transition: "background-color 0.2s ease",
        border: "1px solid",
        borderColor: isSelected ? "error.main" : "rgba(255,255,255,0.08)",
        bgcolor: isSelected ? "rgba(140,0,0,0.18)" : "background.paper",
        boxShadow: isSelected ? "0 0 8px rgba(255,0,0,0.35)" : "none",

        // 🎯 EXACT VIDEO-LIKE HOVER — BG ONLY
        "&:hover": {
          bgcolor: isSelected ? "rgba(140,0,0,0.18)" : "#262626",
          borderColor: isSelected ? "error.main" : "rgba(255,255,255,0.08)",
          boxShadow: "none",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>

          {/* 🔘 Checkbox (only selection trigger) */}
          <Box sx={{ pt: 0.5 }}>
            <Checkbox
              checked={isSelected}
              size="small"
              onChange={onToggle}
              sx={{
                cursor: "pointer",
                color: isSelected ? "error.main" : "text.secondary",
                "&.Mui-checked": { color: "error.main" },
              }}
            />
          </Box>

          {/* 🛰 Drone Icon Badge — FIXED (no changes on select/hover) */}
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          >
            <FlightIcon sx={{ fontSize: 26, color: "text.primary" }} />
          </Box>

          {/* 📌 Details */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>

            {/* 🏷️ Title + Tactical Status Chip */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Box>
                <Typography fontWeight={600} noWrap>
                  {drone.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tactical Reconnaissance Drone
                </Typography>
              </Box>

              {/* 🔥 Minimal tactical chip */}
              <Chip
                label={drone.status}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#E0E0E0",
                  px: 1,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              />
            </Box>

            {/* 📍 Distance + ETA */}
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Metric
                icon={<PlaceIcon sx={{ fontSize: 14 }} />}
                label="Distance"
                value={`${drone.distanceKm.toFixed(1)} km`}
              />
              <Metric
                icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                label="ETA"
                value={`${drone.etaMinutes} min`}
              />
            </Box>

            {/* 🔋 Battery Details */}
            {drone.batteryPercent !== undefined && (
              <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1, mb: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="caption" color="text.secondary">Battery Status</Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {drone.batteryPercent}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={drone.batteryPercent}
                  sx={{
                    mt: 0.8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "rgba(255,0,0,0.15)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#ff3b30",
                      borderRadius: 5,
                      boxShadow: "0 0 6px rgba(255,0,0,0.55)",
                    },
                  }}
                />

                {drone.batteryPercent < 30 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "warning.main",
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 600,
                    }}
                  >
                    <WarningAmberIcon sx={{ fontSize: 12, mr: 0.5 }} />
                    Low battery - consider charging
                  </Typography>
                )}
              </Box>
            )}

            {/* 📌 Location */}
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
              <Typography variant="caption" color="text.secondary">Current Location</Typography>
              <Typography variant="caption" sx={{ fontFamily: "monospace", display: "block" }}>
                {drone.currentLocation.lat.toFixed(4)}, {drone.currentLocation.lng.toFixed(4)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {drone.currentLocation.locationName}
              </Typography>
            </Box>

          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

/* 🔁 Shared Small Metric Component */
function Metric({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body2" fontWeight={600}>{value}</Typography>
      </Box>
    </Box>
  );
}
