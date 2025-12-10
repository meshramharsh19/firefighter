"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import SafeIcon from "@/components/common/SafeIcon";

import MapToggleSection from "./MapToggleSection";
import LocationConfirmation from "./LocationConfirmation";
import VehicleDroneSelector from "./VehicleDroneSelector";
import StationSuggestions from "./StationSuggestions";

import { INCIDENT_LIST_FEED } from "@/data/fire-fighter/incident";
import { NEARBY_ASSETS } from "@/data/fire-fighter/vehicle";

export default function DroneActivationPage() {
  const theme = useTheme();

  const [state, setState] = useState({
    step: "map-toggle",
    mapView: "2d",
    incidentId: INCIDENT_LIST_FEED[0]?.id,
    latitude: INCIDENT_LIST_FEED[0]?.coordinates.lat,
    longitude: INCIDENT_LIST_FEED[0]?.coordinates.lng,
    selectedVehicles: [],
    selectedDrone: null,
    isLocationAdjusted: false,
  });

  const [activationInProgress, setActivationInProgress] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  const currentIncident = INCIDENT_LIST_FEED.find(
    (i) => i.id === state.incidentId
  );

  const stepOrder = [
    "map-toggle",
    "location-confirm",
    "vehicle-selection",
    "ready-to-activate",
  ];

  const activate = async () => {
    setActivationInProgress(true);
    await new Promise((r) => setTimeout(r, 2000));
    setActivationSuccess(true);
  };

  // ===== PAGE + CARD STYLES =====
  const pageSx = {
    bgcolor: "#0b0b0b",
    minHeight: "100vh",
    color: "#fff",
    p: "10px 30px",
    fontFamily: "Inter",
  };

  const cardSx = {
    bgcolor: "#161616",
    border: "1px solid #222",
    borderRadius: "18px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    color: "#fff",
  };

  // ---------- STEP LABEL + CHIP ----------

  const formatStepLabel = (step) => {
    switch (step) {
      case "map-toggle":
        return "Map Toggle";
      case "location-confirm":
        return "Confirm Location";
      case "vehicle-selection":
        return "Select Assets";
      case "ready-to-activate":
        return "Activate";
      default:
        return step;
    }
  };

  const stepChip = (stepName, active) => (
    <Chip
      label={formatStepLabel(stepName)}
      icon={
        <SafeIcon
          name={
            stepName === "ready-to-activate"
              ? "Zap"
              : stepName === "vehicle-selection"
              ? "Truck"
              : stepName === "location-confirm"
              ? "Crosshair"
              : "Map"
          }
        />
      }
      variant={active ? "filled" : "outlined"}
      color={active ? "error" : "default"}
      sx={{
        borderRadius: "30px",
        py: 1,
        px: 0.5,
        fontWeight: "bold",
        color: active ? "#ffffff" : "#e5e5e5", // inactive text visible
        borderColor: active ? "error.main" : "#444",
        "& .MuiChip-icon": { color: active ? "#fff" : "#bbbbbb" },
        backgroundColor: active ? undefined : "#111",
      }}
    />
  );

  // ================= SUCCESS SCREEN ==================
  if (activationSuccess)
    return (
      <Box
        sx={{
          ...pageSx,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ ...cardSx, p: 5, textAlign: "center" }}>
          <SafeIcon
            name="CheckCircle"
            style={{ fontSize: 60, color: "#4caf50" }}
          />
          <Typography variant="h4" fontWeight="bold" mt={2}>
            Drone Activated
          </Typography>
          <Typography color="gray">Redirecting to mission panel...</Typography>
        </Card>
      </Box>
    );

  // ================= MAIN PAGE ==================
  return (
    <Box sx={pageSx}>
      {/* HEADER SECTION */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={1}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight={900}
            color="#ff4444"
            display="flex"
            gap={1}
          >
            <SafeIcon name="Plane" style={{ fontSize: 38 }} /> Drone Activation
            Workflow
          </Typography>
          <Typography mt={0.3} color="gray">
            Incident: {currentIncident?.name} ({state.incidentId})
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: "8px", px: 3 }}
          onClick={() => history.back()}
        >
          <SafeIcon name="ArrowLeft" style={{ marginRight: 6 }} /> Back
        </Button>
      </Box>

      {/* PROGRESS STEPS */}
      <Card sx={{ ...cardSx, mb: 3, p: 2 }}>
        <Box display="flex" justifyContent="space-between">
          {stepOrder.map((step) => (
            <Box key={step}>{stepChip(step, state.step === step)}</Box>
          ))}
        </Box>
      </Card>

      {/* TWO COLUMN LAYOUT */}
      <Box display="grid" gridTemplateColumns={{ md: "2fr 1fr" }} gap={3}>
        {/* LEFT FLOW */}
        <Box>
          {state.step === "map-toggle" && (
            <MapToggleSection
              latitude={state.latitude}
              longitude={state.longitude}
              incidentName={currentIncident?.name}
              onToggle={() => setState({ ...state, step: "location-confirm" })}
            />
          )}

          {state.step === "location-confirm" && (
            <LocationConfirmation
              latitude={state.latitude}
              longitude={state.longitude}
              onConfirm={() =>
                setState({
                  ...state,
                  step: "vehicle-selection",
                  isLocationAdjusted: true,
                })
              }
              onBack={() => setState({ ...state, step: "map-toggle" })}
            />
          )}

          {["vehicle-selection", "ready-to-activate"].includes(state.step) && (
            <VehicleDroneSelector
              vehicles={NEARBY_ASSETS.vehicles}
              drones={NEARBY_ASSETS.drones}
              selectedVehicles={state.selectedVehicles}
              selectedDrone={state.selectedDrone}
              onVehicleSelect={(id) =>
                setState({
                  ...state,
                  selectedVehicles: state.selectedVehicles.includes(id)
                    ? state.selectedVehicles.filter((x) => x !== id)
                    : [...state.selectedVehicles, id],
                })
              }
              onDroneSelect={(id) =>
                setState({
                  ...state,
                  selectedDrone: id,
                  step: "ready-to-activate",
                })
              }
              onBack={() => setState({ ...state, step: "location-confirm" })}
            />
          )}
        </Box>

        {/* RIGHT PANEL */}
        <Box display="flex" flexDirection="column" gap={3}>
          {/* INCIDENT SUMMARY */}
          <Card sx={cardSx}>
            <CardHeader>
              <Typography fontWeight={800} sx={{ color: "#ff4444" }}>
                ⚠ Incident Summary
              </Typography>
            </CardHeader>
            <CardContent sx={{ color: "#ddd" }}>
              <Typography variant="caption" sx={{ color: "#888" }}>
                Incident ID
              </Typography>
              <Typography sx={{ color: "#fff" }}>{state.incidentId}</Typography>

              <Typography mt={1} variant="caption" sx={{ color: "#888" }}>
                Location
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                {currentIncident?.location}
              </Typography>

              <Typography mt={1} variant="caption" sx={{ color: "#888" }}>
                Coordinates
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                {state.latitude.toFixed(6)}, {state.longitude.toFixed(6)}
              </Typography>

              {state.isLocationAdjusted && (
                <Chip
                  label="Location Confirmed"
                  color="success"
                  sx={{ mt: 1, fontSize: "12px" }}
                />
              )}
            </CardContent>
          </Card>

          {/* STATUS */}
          <Card sx={cardSx}>
            <CardHeader>
              <Typography fontWeight={800} sx={{ color: "#ff4444" }}>
                ✓ Selection Status
              </Typography>
            </CardHeader>

            <CardContent sx={{ color: "#ddd" }}>
              <Typography variant="caption" sx={{ color: "#aaa" }}>
                Vehicles
              </Typography>
              <br />

              {state.selectedVehicles.length ? (
                state.selectedVehicles.map((id) => (
                  <Chip
                    key={id}
                    label={id}
                    sx={{
                      m: 0.4,
                      bgcolor: "#222",
                      color: "#fff",
                      border: "1px solid #444",
                    }}
                  />
                ))
              ) : (
                <Typography component="i" sx={{ color: "#666" }}>
                  None selected
                </Typography>
              )}

              <Typography
                variant="caption"
                mt={2}
                display="block"
                sx={{ color: "#aaa" }}
              >
                Drone
              </Typography>

              {state.selectedDrone ? (
                <Chip
                  label={state.selectedDrone}
                  color="info"
                  sx={{
                    bgcolor: "#0277bd",
                    color: "#fff",
                    mt: 1,
                  }}
                />
              ) : (
                <Typography component="i" sx={{ color: "#666" }}>
                  None selected
                </Typography>
              )}
            </CardContent>
          </Card>

          {state.step !== "map-toggle" && (
            <StationSuggestions stations={NEARBY_ASSETS.stations} />
          )}

          {state.step === "ready-to-activate" && (
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{ borderRadius: "10px" }}
              onClick={activate}
            >
              {activationInProgress ? "Activating..." : "🚀 Activate Drone"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
