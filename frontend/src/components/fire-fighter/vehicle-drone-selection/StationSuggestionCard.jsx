// StationSuggestionCard.jsx
import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";

export default function StationSuggestionCard({ station, rank = 0, vehicleCount = 0, droneCount = 0 }) {
  // station: { id, name }
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: "action.hover", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid", borderColor: "divider" }}>
          <BusinessIcon sx={{ fontSize: 20 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography fontWeight={700} noWrap>{station?.name ?? "Unknown Station"}</Typography>
          <Typography variant="caption" color="text.secondary">
            Rank #{rank}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Chip icon={<LocalShippingIcon />} label={`${vehicleCount} Vehicles`} size="small" sx={{ fontWeight: 700 }} />
          <Chip icon={<FlightIcon />} label={`${droneCount} Drones`} size="small" sx={{ fontWeight: 700 }} />
        </Box>
      </CardContent>
    </Card>
  );
}
