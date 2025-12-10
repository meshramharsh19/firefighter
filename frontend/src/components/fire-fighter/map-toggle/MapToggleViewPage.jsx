import React, { useState } from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MapViewSelector from "./MapViewSelector";
import MapDisplay from "./MapDisplay";

const mockIncident = {
  id: "INC-2024-001234",
  name: "Commercial Building Fire",
  location: "Downtown Business District, Ward 5",
  latitude: 28.6139,
  longitude: 77.209,
  severity: "critical",
  description: "Fire reported on 3rd floor of commercial complex",
  callerName: "John Smith",
  callerPhone: "+91-9876543210",
};

const severityColors = {
  low: "#27AE60",
  medium: "#F2C12E",
  high: "#F47A0D",
  critical: "#D62828",
};

export default function MapToggleView({ incident, onConfirm, onBack }) {
  const data = incident || mockIncident;
  const [viewMode, setViewMode] = useState("2d");
  const [isLoading, setIsLoading] = useState(false);

  const handleViewChange = (mode) => {
    setIsLoading(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: 3,
        py: 3,
        bgcolor: "rgb(13,15,18)",
      }}
    >
      {/* Header */}
      <Box sx={{ width: "100%", mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 🔥 Icon + Heading group */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* 🔥 ICON CONTAINER */}
            <Box
              sx={{
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#1A1A1A", // Dark base
                borderRadius: "10px",
              }}
            >
              <MapOutlinedIcon sx={{ fontSize: 34, color: "#EF5350" }} />
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#FFF" }}>
                Map View Selection
              </Typography>
              <Typography
                sx={{ fontSize: "0.85rem", color: "#A8A8A8", mt: "2px" }}
              >
                Choose between 2D map or 3D digital twin for incident location
              </Typography>
            </Box>
          </Box>

          {/* Right side SEVERITY chip */}
          <Chip
            label={data.severity.toUpperCase()}
            sx={{
              px: 2,
              py: 1,
              fontWeight: 700,
              bgcolor: severityColors[data.severity],
              color: "#fff",
              fontSize: "0.85rem",
              borderRadius: "6px",
            }}
          />
        </Box>
      </Box>

      {/* Incident Summary */}
      <Card
        sx={{
          bgcolor: "#1A1A1A",
          borderRadius: 2,
          border: "1px solid #2A2A2A",
        }}
      >
        <CardHeader
          title={
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 700, color: "#EDEDED" }}
            >
              {data.name}
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: "0.85rem", color: "#9E9E9E" }}>
              {data.location}
            </Typography>
          }
        />
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            flexWrap="wrap"
          >
            <Info label="Incident ID" value={data.id} code />
            <Info
              label="Coordinates"
              value={`${data.latitude.toFixed(4)}, ${data.longitude.toFixed(
                4
              )}`}
              code
            />
            <Info label="Caller" value={data.callerName} />
            <Info label="Contact" value={data.callerPhone} code />
          </Stack>

          <Divider sx={{ my: 2, borderColor: "#2A2A2A" }} />

          <Typography sx={{ fontSize: "0.7rem", color: "#9E9E9E" }}>
            Description
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", mt: 0.5, color: "#EDEDED" }}>
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Selector */}
      <MapViewSelector
        currentMode={viewMode}
        onModeChange={handleViewChange}
        isLoading={isLoading}
      />

      {/* Map */}
      <MapDisplay
        latitude={data.latitude}
        longitude={data.longitude}
        viewMode={viewMode}
        isLoading={isLoading}
        incidentName={data.name}
      />

      {/* Info Cards */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "100%" }}
      >
        <ModeInfo
          active={viewMode === "2d"}
          title="2D Map View"
          icon="map"
          points={[
            "Real-time tracking",
            "Distance measurements",
            "Route planning",
          ]}
          desc="Standard 2D aerial view with precise coordinates and location markers."
        />

        <ModeInfo
          active={viewMode === "3d"}
          title="3D Digital Twin"
          icon="3d"
          points={[
            "Building structure visualization",
            "Fire position mapping",
            "Wind direction & hazards",
          ]}
          desc="Immersive 3D model with building structure and environmental context."
        />
      </Stack>

      {/* Actions */}
      <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{ color: "#EDEDED", borderColor: "#EF5350" }}
          onClick={onBack}
        >
          Back to Incident Details
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ bgcolor: "#EF5350" }}
          disabled={isLoading}
          onClick={onConfirm}
        >
          Confirm & Continue
        </Button>
      </Stack>

      {/* Help */}
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "#121212",
          border: "1px solid #2A2A2A",
        }}
      >
        <Typography sx={{ fontWeight: 700, color: "#EDEDED" }}>
          Map Selection Guide
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "#A1A1A1", mt: 0.5 }}>
          Use 2D view for navigation and distance calculations. Switch to 3D to
          analyze structure and hazard severity.
        </Typography>
      </Card>
    </Box>
  );
}

// Small Reusable
function Info({ label, value, code }) {
  return (
    <Box>
      <Typography sx={{ fontSize: "0.7rem", color: "#9E9E9E" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 700,
          fontFamily: code ? "monospace" : "inherit",
          color: "#EDEDED",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function ModeInfo({ title, desc, points, active, icon }) {
  return (
    <Card
      sx={{
        flex: 1,
        borderRadius: 2,
        bgcolor: "#1A1A1A",
        border: `2px solid ${active ? "#EF5350" : "#393939"}`,
        transition: "0.25s ease",
        "&:hover": { borderColor: active ? "#EF5350" : "#505050" },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title & Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1 }}>
          {icon === "map" && (
            <MapIcon sx={{ color: "#EF5350", fontSize: 26 }} />
          )}
          {icon === "3d" && (
            <ViewInArIcon sx={{ color: "#EF5350", fontSize: 26 }} />
          )}
          <Typography
            sx={{ fontWeight: 700, fontSize: "1rem", color: "#EDEDED" }}
          >
            {title}
          </Typography>
        </Box>

        {/* Description */}
        <Typography sx={{ fontSize: "0.85rem", color: "#B1B1B1", mb: 1.5 }}>
          {desc}
        </Typography>

        {/* Benefit List */}
        <Stack spacing={0.6}>
          {points.map((p, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                color: "#D9D9D9",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 15, color: "#EF5350" }} /> {p}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function Benefit({ text }) {
  return (
    <Typography
      sx={{
        fontSize: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "#E57373",
      }}
    >
      ✔ {text}
    </Typography>
  );
}
