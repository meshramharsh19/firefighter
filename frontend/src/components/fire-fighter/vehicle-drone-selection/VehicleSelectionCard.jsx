import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Typography
} from "@mui/material";

// Icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

export default function VehicleSelectionCard({ vehicle, isSelected, onToggle }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: "default", // ❌ No click selection
        transition: "background-color 0.25s ease",
        border: "1px solid",
        borderColor: isSelected ? "error.main" : "rgba(255,255,255,0.08)",
        bgcolor: isSelected ? "rgba(140,0,0,0.18)" : "background.paper",
        boxShadow: isSelected ? "0 0 8px rgba(255,0,0,0.35)" : "none",
        "&:hover": {
          bgcolor: isSelected ? "rgba(140,0,0,0.18)" : "#262626",
          borderColor: isSelected ? "error.main" : "rgba(255,255,255,0.08)",
          boxShadow: "none"
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>

          {/* 🔘 Checkbox = ONLY way to toggle */}
          <Box sx={{ pt: 0.5 }}>
            <Checkbox
              checked={isSelected}
              size="small"
              onChange={onToggle}
              sx={{
                cursor: "pointer",
                color: isSelected ? "error.main" : "text.secondary",
                "&.Mui-checked": {
                  color: "error.main"
                }
              }}
            />
          </Box>

          {/* 🚒 Icon Container (fixed styling ALWAYS) */}
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
              flexShrink: 0
            }}
          >
            <LocalShippingIcon
              sx={{
                fontSize: 26,
                color: "text.primary"
              }}
            />
          </Box>

          {/* 📌 Vehicle Details */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>

            {/* 🚚 Title + Tactical Status Chip */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Box>
                <Typography fontWeight={600} noWrap>
                  {vehicle.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {vehicle.vehicleType}
                </Typography>
              </Box>

              {/* 🛡️ Tactical Style Status Chip */}
              <Chip
                label={vehicle.status}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  px: 1.2,
                  color: "#E0E0E0",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  letterSpacing: 0.3,
                  textTransform: "capitalize"
                }}
              />
            </Box>

            {/* 📍 Distance & ETA */}
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Metric
                icon={<PlaceIcon sx={{ fontSize: 14 }} />}
                label="Distance"
                value={`${vehicle.distanceKm.toFixed(1)} km`}
              />
              <Metric
                icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                label="ETA"
                value={`${vehicle.etaMinutes} min`}
              />
            </Box>

            {/* 👨‍🚒 Crew Details */}
            {vehicle.crew.length > 0 && (
              <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1, mb: 1 }}>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                >
                  Crew Ready
                </Typography>

                {vehicle.crew.map((member) => (
                  <Box
                    key={member.id}
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      fontSize: "0.7rem",
                      mt: 0.5
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                    <Typography sx={{ fontSize: "0.7rem" }}>
                      {member.name}
                    </Typography>

                    {/* 🎖️ Crew Role Badge (Same style) */}
                    <Chip
                      label={member.role}
                      size="small"
                      sx={{
                        ml: "auto",
                        fontSize: "0.65rem",
                        color: "#E0E0E0",
                        px: 1,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        letterSpacing: 0.3,
                        textTransform: "capitalize"
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* 🌍 Location */}
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Current Location
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontFamily: "monospace", display: "block" }}
              >
                {vehicle.currentLocation.lat.toFixed(4)}, {vehicle.currentLocation.lng.toFixed(4)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {vehicle.currentLocation.locationName}
              </Typography>
            </Box>

          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

/* 🔁 Small Shared Metric Component */
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
