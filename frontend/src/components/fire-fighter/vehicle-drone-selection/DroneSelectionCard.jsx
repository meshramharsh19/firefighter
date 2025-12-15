// DroneSelectionCard.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Typography
} from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

export default function DroneSelectionCard({ drone, isSelected, onToggle }) {
  const battery = drone?.battery != null ? Number(drone.battery) : null;
  const flightHours = drone?.flight_hours != null ? Number(drone.flight_hours) : null;

  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: "default",
        transition: "background-color 0.25s ease",
        border: "1px solid",
        borderColor: isSelected ? "primary.main" : "rgba(255,255,255,0.08)",
        bgcolor: isSelected ? "rgba(229,57,53,0.15)" : "background.paper",
        boxShadow: isSelected ? "0 0 8px rgba(255,0,0,0.35)" : "none",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ pt: 0.5 }}>
            <Checkbox
              checked={isSelected}
              size="small"
              onChange={onToggle}
              sx={{ cursor: "pointer", color: isSelected ? "primary.main" : "text.secondary", "&.Mui-checked": { color: "primary.main" } }}
            />
          </Box>

          <Box sx={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, bgcolor: "action.hover", border: "1px solid", borderColor: "divider", flexShrink: 0 }}>
            <FlightIcon sx={{ fontSize: 26, color: "text.primary" }} />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Box>
                <Typography fontWeight={600} noWrap>{drone?.name || "Unnamed Drone"}</Typography>
                <Typography variant="caption" color="text.secondary">{drone?.drone_id || "—"}</Typography>
              </Box>

              <Chip label={drone?.status || "unknown"} size="small" sx={{ fontSize: "0.7rem", fontWeight: 600, px: 1.2, color: "#E0E0E0", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "8px", textTransform: "capitalize" }} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Metric icon={<BatteryChargingFullIcon sx={{ fontSize: 14 }} />} label="Battery" value={battery != null ? `${battery}%` : "—"} />
              <Metric icon={<AccessTimeIcon sx={{ fontSize: 14 }} />} label="Flight Hours" value={flightHours != null ? `${flightHours} hr` : "—"} />
            </Box>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1, mb: 1 }}>
              <Typography variant="caption" fontWeight={600} color="text.secondary">Assigned Pilot</Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                <PersonIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                <Typography sx={{ fontSize: "0.75rem" }}>{drone?.pilot_name || "Not Assigned"}</Typography>
                <Chip label={drone?.pilot_number || "—"} size="small" sx={{ ml: "auto", fontSize: "0.65rem", color: "#E0E0E0", px: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "8px" }} />
              </Box>
            </Box>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
              <Typography variant="caption" color="text.secondary">Station</Typography>
              <Typography variant="caption" sx={{ ml: 1 }}>{drone?.station || "—"}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

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
