import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import CheckIcon from "@mui/icons-material/Check";

export default function MapViewSelector({ currentMode, onModeChange, isLoading }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid #2A2A2A",
        background: "linear-gradient(90deg, rgb(26,26,26), transparent)",
        p: 0
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#EDEDED" }}>
            Select Map View Mode
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#A1A1A1", mt: 0.5 }}>
            Choose your preferred visualization for incident analysis
          </Typography>
        </Box>

        {/* Selection Buttons */}
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          
          {/* 2D BUTTON */}
          <ModeButton
            title="2D Map View"
            description="Aerial view with navigation & coordinates"
            active={currentMode === "2d"}
            icon={<MapIcon />}
            disabled={isLoading}
            onClick={() => onModeChange("2d")}
          />

          {/* 3D BUTTON */}
          <ModeButton
            title="3D Digital Twin"
            description="Immersive structural visualization"
            active={currentMode === "3d"}
            icon={<ViewInArIcon />}
            disabled={isLoading}
            onClick={() => onModeChange("3d")}
          />
        </Box>

        {/* Loading Indicator */}
        {isLoading && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid #2A2A2A"
            }}
          >
            <CircularProgress size={16} sx={{ color: "#EF5350" }} />
            <Typography sx={{ fontSize: "0.75rem", color: "#A1A1A1" }}>
              Loading {currentMode === "3d" ? "3D Digital Twin..." : "2D Map..."}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function ModeButton({ title, description, active, icon, onClick, disabled }) {
  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        position: "relative",
        p: 2,
        display: "flex",
        gap: 2,
        borderRadius: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        border: `2px solid ${active ? "#EF5350" : "#2A2A2A"}`,
        backgroundColor: active ? "rgba(179,38,30,0.15)" : "#1A1A1A",
        transition: "0.25s",
        opacity: disabled ? 0.5 : 1,
        "&:hover": {
          borderColor: disabled ? undefined : active ? "#EF5350" : "#E57373"
        }
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          backgroundColor: active ? "rgba(179,38,30,0.30)" : "#212121"
        }}
      >
        {React.cloneElement(icon, {
          sx: { color: active ? "#EF5350" : "#9E9E9E", fontSize: 26 }
        })}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#EDEDED" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#9E9E9E", mt: 0.3 }}>
          {description}
        </Typography>
      </Box>

      {active && (
        <CheckIcon sx={{ color: "#EF5350", position: "absolute", top: 8, right: 8, fontSize: 18 }} />
      )}
    </Box>
  );
}
