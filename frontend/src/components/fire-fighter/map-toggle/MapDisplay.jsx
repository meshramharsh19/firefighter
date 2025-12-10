import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CircularProgress
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExploreIcon from "@mui/icons-material/Explore";

export default function MapDisplay({
  latitude,
  longitude,
  viewMode,
  isLoading = false,
  incidentName = "Incident Location"
}) {
  const is3D = viewMode === "3d";

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #2A2A2A",
        background: "#1A1A1A"
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {is3D ? (
                <ViewInArIcon sx={{ color: "#EF5350" }} />
              ) : (
                <MapIcon sx={{ color: "#EF5350" }} />
              )}
              <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#EDEDED" }}>
                {is3D ? "3D Digital Twin View" : "2D Map View"}
              </Typography>
            </Box>

            <Chip
              label={viewMode.toUpperCase()}
              size="small"
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#EF5350",
                borderColor: "#EF5350"
              }}
              variant="outlined"
            />
          </Box>
        }
        sx={{ pb: 1.5, color: "#EDEDED" }}
      />

      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            background: "linear-gradient(135deg, #2A2A2A 20%, #1A1A1A 100%)",
            borderTop: "1px solid #2A2A2A"
          }}
        >
          {isLoading && (
            <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <CircularProgress size={42} sx={{ color: "#B3261E" }} />
              <Typography sx={{ color: "#9E9E9E", fontSize: "0.85rem" }}>
                Loading {is3D ? "3D model..." : "map..."}
              </Typography>
            </Box>
          )}

          {!isLoading && (
            <Box sx={{ position: "absolute", inset: 0, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", gap: 1 }}>
              {is3D ? (
                <ViewInArIcon sx={{ fontSize: 70, opacity: 0.4, color: "#EF5350" }} />
              ) : (
                <MapIcon sx={{ fontSize: 70, opacity: 0.4, color: "#EF5350" }} />
              )}
              <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#EDEDED" }}>
                {is3D ? "3D Digital Twin" : "2D Map"}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#9E9E9E" }}>
                {incidentName}
              </Typography>
            </Box>
          )}

          {!isLoading && (
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <PlaceIcon sx={{ fontSize: 40, color: "#EF5350", animation: "bounce 1s infinite" }} />
            </Box>
          )}

          {is3D && !isLoading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0.1,
                backgroundSize: "50px 50px",
                backgroundImage:
                  "linear-gradient(0deg, transparent 24%, rgba(239,83,80,0.25) 25%, rgba(239,83,80,0.25) 26%, transparent 27%, transparent 74%, rgba(239,83,80,0.25) 75%, rgba(239,83,80,0.25) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(239,83,80,0.25) 25%, rgba(239,83,80,0.25) 26%, transparent 27%, transparent 74%, rgba(239,83,80,0.25) 75%, rgba(239,83,80,0.25) 76%, transparent 77%, transparent)"
              }}
            />
          )}

          {!is3D && !isLoading && (
            <Box sx={{ position: "absolute", top: 12, right: 12, bgcolor: "#121212", borderRadius: 2, p: 1, border: "1px solid #2A2A2A" }}>
              <ExploreIcon sx={{ color: "#EF5350" }} />
            </Box>
          )}

          {!isLoading && (
            <Box sx={{ position: "absolute", bottom: 12, right: 12, display: "flex", flexDirection: "column", gap: 1 }}>
              <IconButton size="small" sx={{ bgcolor: "#121212", border: "1px solid #2A2A2A", borderRadius: 2 }}>
                <AddIcon sx={{ color: "#EDEDED" }} />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: "#121212", border: "1px solid #2A2A2A", borderRadius: 2 }}>
                <RemoveIcon sx={{ color: "#EDEDED" }} />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box sx={{ bgcolor: "#121212", borderTop: "1px solid #2A2A2A", p: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center", gap: 1 }}>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#9E9E9E" }}>Latitude</Typography>
              <Typography sx={{ fontFamily: "monospace", color: "#EDEDED", fontSize: "0.85rem" }}>
                {latitude.toFixed(6)}°
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#9E9E9E" }}>Longitude</Typography>
              <Typography sx={{ fontFamily: "monospace", color: "#EDEDED", fontSize: "0.85rem" }}>
                {longitude.toFixed(6)}°
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#9E9E9E" }}>View Mode</Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#EDEDED", fontWeight: 600 }}>
                {viewMode.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
