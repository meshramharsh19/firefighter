import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Converted Components
import VehicleSelectionCard from "./VehicleSelectionCard";
import DroneSelectionCard from "./DroneSelectionCard";
import StationSuggestionCard from "./StationSuggestionCard";
import SelectionSummary from "./SelectionSummary";

// Data
import { NEARBY_ASSETS } from "@/data/fire-fighter/vehicle";

// Tactical Theme (Same System)
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const darkIncidentTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0F0F10",
      paper: "#131314",
    },
    primary: { main: "#E53935" },
    success: { main: "#27C47A" },
    warning: { main: "#F3C241" },
    text: {
      primary: "#EDEDED",
      secondary: "#9A9A9A",
    },
    divider: "#2A2A2A",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#171717",
          borderRadius: 14,
          border: "1px solid #2F2F2F",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.92rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "0.75rem",
        },
      },
    },
  },
});

export default function VehicleDroneSelectionPage() {
  const [selectedAssets, setSelectedAssets] = useState({
    vehicleIds: NEARBY_ASSETS.vehicles.filter((v) => v.isSelected).map((v) => v.id),
    droneIds: NEARBY_ASSETS.drones.filter((d) => d.isSelected).map((d) => d.id),
  });

  const handleVehicleToggle = (vehicleId) => {
    setSelectedAssets((prev) => ({
      ...prev,
      vehicleIds: prev.vehicleIds.includes(vehicleId)
        ? prev.vehicleIds.filter((id) => id !== vehicleId)
        : [...prev.vehicleIds, vehicleId],
    }));
  };

  const handleDroneToggle = (droneId) => {
    setSelectedAssets((prev) => ({
      ...prev,
      droneIds: prev.droneIds.includes(droneId)
        ? prev.droneIds.filter((id) => id !== droneId)
        : [...prev.droneIds, droneId],
    }));
  };

  const selectedVehicles = NEARBY_ASSETS.vehicles.filter((v) =>
    selectedAssets.vehicleIds.includes(v.id)
  );
  const selectedDrones = NEARBY_ASSETS.drones.filter((d) =>
    selectedAssets.droneIds.includes(d.id)
  );

  const canActivate = selectedDrones.length > 0;

  return (
    <ThemeProvider theme={darkIncidentTheme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", p: 4 }}>
        <Box maxWidth="1280px" mx="auto" sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

          {/* Header */}
          <Stack spacing={1}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "#1E1E1F",
                  border: "1px solid #2A2A2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FlightIcon sx={{ color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Vehicle & Drone Selection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select required assets for incident response
                </Typography>
              </Box>
            </Stack>

            {/* Breadcrumb */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="text"
                size="small"
                startIcon={<ArrowBackIcon />}
                sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                onClick={() => window.history.back()}
              >
                Back
              </Button>
              <Typography>/</Typography>
              <Typography fontSize="0.85rem" fontWeight={600}>
                Asset Selection
              </Typography>
            </Stack>
          </Stack>

          {/* Grid Layout */}
          <Box sx={{ display: "grid", gridTemplateColumns: { lg: "2fr 1fr" }, gap: 4 }}>

            {/* LEFT — Vehicles, Drones, Stations */}
            <Stack spacing={4}>
              {/* Vehicles */}
              <AssetSection
                icon={<LocalShippingIcon color="primary" />}
                title="Available Vehicles"
                count={selectedAssets.vehicleIds.length}
                total={NEARBY_ASSETS.vehicles.length}
              >
                {NEARBY_ASSETS.vehicles.length === 0 ? (
                  <NoAssetPlaceholder message="No vehicles available nearby" />
                ) : (
                  NEARBY_ASSETS.vehicles.map((vehicle) => (
                    <VehicleSelectionCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      isSelected={selectedAssets.vehicleIds.includes(vehicle.id)}
                      onToggle={() => handleVehicleToggle(vehicle.id)}
                    />
                  ))
                )}
              </AssetSection>

              {/* Drones */}
              <AssetSection
                icon={<FlightIcon color="primary" />}
                title="Available Drones"
                count={selectedAssets.droneIds.length}
                total={NEARBY_ASSETS.drones.length}
              >
                {NEARBY_ASSETS.drones.length === 0 ? (
                  <NoAssetPlaceholder message="No drones available nearby" />
                ) : (
                  NEARBY_ASSETS.drones.map((drone) => (
                    <DroneSelectionCard
                      key={drone.id}
                      drone={drone}
                      isSelected={selectedAssets.droneIds.includes(drone.id)}
                      onToggle={() => handleDroneToggle(drone.id)}
                    />
                  ))
                )}
              </AssetSection>

              {/* Stations */}
              <AssetSection
                icon={<BusinessIcon color="action" />}
                title="Nearby Fire Stations"
                sub="Top 3 suggested stations if assets unavailable"
              >
                {NEARBY_ASSETS.stations.map((station, index) => (
                  <StationSuggestionCard key={station.stationId} station={station} rank={index + 1} />
                ))}
              </AssetSection>
            </Stack>

            {/* RIGHT — Selection Summary */}
            <SelectionSummary
              selectedVehicles={selectedVehicles}
              selectedDrones={selectedDrones}
              canActivate={canActivate}
              onActivate={() => canActivate && (window.location.href = "./live-incident-command.html")}
              onBack={() => window.history.back()}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// ➤ Small Reusable Components
function AssetSection({ icon, title, count, total, sub, children }) {
  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {icon}
              <Box>
                <Typography fontWeight={600}>{title}</Typography>
                {sub && (
                  <Typography variant="body2" color="text.secondary">
                    {sub}
                  </Typography>
                )}
                {!sub && (
                  <Typography variant="body2" color="text.secondary">
                    {total} nearby
                  </Typography>
                )}
              </Box>
            </Box>
            {typeof count === "number" && (
              <Chip label={`${count} Selected`} variant="outlined" size="small" />
            )}
          </Box>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {children}
      </CardContent>
    </Card>
  );
}

function NoAssetPlaceholder({ message }) {
  return (
    <Box textAlign="center" py={4}>
      <WarningAmberIcon color="warning" fontSize="large" />
      <Typography variant="body2" color="text.secondary" mt={1}>
        {message}
      </Typography>
    </Box>
  );
}
