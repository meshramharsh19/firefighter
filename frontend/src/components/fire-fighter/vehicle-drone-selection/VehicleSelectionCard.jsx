import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Typography
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

export default function VehicleSelectionCard({ vehicle, isSelected, onToggle }) {
  const distance = vehicle?.distanceKm != null ? Number(vehicle.distanceKm) : null;
  const eta = vehicle?.etaMinutes != null ? Number(vehicle.etaMinutes) : null;
  const crew = Array.isArray(vehicle?.crew) ? vehicle.crew : [];
  const location = vehicle?.currentLocation ?? null;
  const statusLabel = vehicle?.vehicle_status ?? vehicle?.vehicle_availability_status ?? "unknown";

  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: "default",
        transition: "background-color 0.25s ease",
        border: "1px solid",
        borderColor: isSelected ? "error.main" : "rgba(255,255,255,0.08)",
        bgcolor: isSelected ? "rgba(140,0,0,0.18)" : "background.paper",
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
              sx={{
                cursor: "pointer",
                color: isSelected ? "error.main" : "text.secondary",
                "&.Mui-checked": { color: "error.main" }
              }}
            />
          </Box>

          <Box sx={{
            width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 2, bgcolor: "action.hover", border: "1px solid", borderColor: "divider", flexShrink: 0
          }}>
            <LocalShippingIcon sx={{ fontSize: 26, color: "text.primary" }} />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Box>
                <Typography fontWeight={600} noWrap>{vehicle?.name ?? "Unnamed Vehicle"}</Typography>
                <Typography variant="caption" color="text.secondary">{vehicle?.type ?? "—"}</Typography>
              </Box>

              <Chip
                label={statusLabel}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  px: 1.2,
                  textTransform: "capitalize",
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)"
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Metric icon={<PlaceIcon sx={{ fontSize: 14 }} />} label="Distance" value={distance != null ? `${distance.toFixed(1)} km` : "—"} />
              <Metric icon={<AccessTimeIcon sx={{ fontSize: 14 }} />} label="ETA" value={eta != null ? `${eta} min` : "—"} />
            </Box>

            {crew.length > 0 && (
              <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1, mb: 1 }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary">Crew Ready</Typography>
                {crew.map((m) => (
                  <Box key={m.id ?? m.name} sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                    <Typography sx={{ fontSize: "0.7rem" }}>{m.name}</Typography>
                    <Chip label={m.role ?? "Crew"} size="small" sx={{ ml: "auto", fontSize: "0.65rem", color: "#E0E0E0", px: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "8px" }} />
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 1 }}>
              <Typography variant="caption" color="text.secondary">Current Location</Typography>
              {location?.lat != null && location?.lng != null ? (
                <>
                  <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{Number(location.lat).toFixed(4)}, {Number(location.lng).toFixed(4)}</Typography>
                  <Typography variant="caption" color="text.secondary">{location.locationName ?? "—"}</Typography>
                </>
              ) : (
                <Typography variant="caption">No GPS Data</Typography>
              )}
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
