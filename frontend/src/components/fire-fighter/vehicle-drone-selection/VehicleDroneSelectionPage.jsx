// VehicleDroneSelectionPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Components
import VehicleSelectionCard from "./VehicleSelectionCard";
import DroneSelectionCard from "./DroneSelectionCard";
import StationSuggestionCard from "./StationSuggestionCard";
import SelectionSummary from "./SelectionSummary";

// Theme
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const darkIncidentTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0F0F10", paper: "#131314" },
    primary: { main: "#E53935" },
    text: { primary: "#EDEDED", secondary: "#9A9A9A" },
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
  },
});

// helpers
const safeNumber = (v) =>
  v === null || v === undefined || v === "" ? null : Number(v);

// ✅ Vehicle normalizer (unchanged)
const normalizeVehicleRow = (v = {}) => ({
  ...v,
  id: v.id,
  name: v.name ?? "Unnamed Vehicle",
  type: v.type ?? "—",
  station: v.station,
  vehicle_status:
    v.vehicle_status ??
    v.vehicle_availability_status ??
    v.status ??
    "unknown",
  distanceKm: safeNumber(v.distanceKm),
  etaMinutes: safeNumber(v.etaMinutes),
});

// ✅ FIXED Drone normalizer
const normalizeDroneRow = (row = {}) => ({
  id: row.id,

  // 🔥 CORRECT FIELD FROM API
  drone_id: row.drone_code,   // <-- THIS IS THE FIX
  name: row.name,

  status: row.status,
  battery: row.battery,
  flight_hours: row.flight_hours,
  station: row.station,

  pilot_name: row.pilot_name,
  pilot_number: row.pilot_number,
  is_ready: Boolean(row.is_ready),

  _raw: row,
});


export default function VehicleDroneSelectionPage() {
  const navigate = useNavigate();

  // 🔐 USER STATION (LOCKED)
  const session = JSON.parse(
    sessionStorage.getItem("fireOpsSession") || "{}"
  );
  const userStation = session.station;
  const incidentId = session.incidentId || "INC-20251120-003";

  const [vehicles, setVehicles] = useState([]);
  const [drones, setDrones] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedAssets, setSelectedAssets] = useState({
    vehicleIds: [],
    droneIds: [],
  });

  const [snack, setSnack] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  // ---------------- FETCH ----------------
  useEffect(() => {
    if (!userStation) return;

    let mounted = true;

    async function fetchAll() {
      setLoading(true);
      try {
        // Vehicles
        const vehRes = await fetch(
          "http://localhost/fire-fighter-new/backend/controllers/get_vehicles.php"
        );
        const vehJson = await vehRes.json();

        // Drones (station-filtered from backend)
        const droneRes = await fetch(
          "http://localhost/fire-fighter-new/backend/controllers/get_drones.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ station: userStation }),
          }
        );
        const droneJson = await droneRes.json();

        // Stations (only for suggestion card)
        const stationRes = await fetch(
          "http://localhost/fire-fighter-new/backend/controllers/get_firestations.php"
        );
        const stationJson = await stationRes.json();

        if (!mounted) return;

        const normalizedVehicles = (vehJson || [])
          .map(normalizeVehicleRow)
          .filter((v) => v.station === userStation);

        const normalizedDrones = (droneJson?.drones || [])
          .map(normalizeDroneRow)
          .filter((d) => d.station === userStation);

        setVehicles(normalizedVehicles);
        setDrones(normalizedDrones);
        setStations(stationJson?.stations || []);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setSnack({
          open: true,
          severity: "error",
          message: "Failed to load station assets",
        });
        setLoading(false);
      }
    }

    fetchAll();
    return () => (mounted = false);
  }, [userStation]);

  // ---------------- SELECTION ----------------
  const selectedVehicleObjects = useMemo(
    () => vehicles.filter((v) => selectedAssets.vehicleIds.includes(v.id)),
    [vehicles, selectedAssets]
  );

  const selectedDroneObjects = useMemo(
    () => drones.filter((d) => selectedAssets.droneIds.includes(d.id)),
    [drones, selectedAssets]
  );

  const canActivate = selectedDroneObjects.length > 0;

  // ---------------- UI ----------------
  return (
    <ThemeProvider theme={darkIncidentTheme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", p: 4 }}>
        <Box maxWidth="1280px" mx="auto">

          {/* HEADER */}
          <Stack spacing={1} mb={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <FlightIcon color="primary" />
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Vehicle & Drone Selection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Station: {userStation}
                </Typography>
              </Box>
            </Stack>

            <Button
              size="small"
              startIcon={<ArrowBackIcon />}
              sx={{ color: "text.secondary", width: "fit-content" }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Stack>

          {/* GRID */}
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 4 }}>
            <Stack spacing={4}>
              <AssetSection
                icon={<LocalShippingIcon color="primary" />}
                title="Available Vehicles"
                count={selectedAssets.vehicleIds.length}
                total={vehicles.length}
              >
                {loading ? (
                  <CircularProgress />
                ) : vehicles.length === 0 ? (
                  <NoAssetPlaceholder message="No vehicles for this station" />
                ) : (
                  vehicles.map((v) => (
                    <VehicleSelectionCard
                      key={v.id}
                      vehicle={v}
                      isSelected={selectedAssets.vehicleIds.includes(v.id)}
                      onToggle={() =>
                        setSelectedAssets((p) => ({
                          ...p,
                          vehicleIds: p.vehicleIds.includes(v.id)
                            ? p.vehicleIds.filter((id) => id !== v.id)
                            : [...p.vehicleIds, v.id],
                        }))
                      }
                    />
                  ))
                )}
              </AssetSection>

              <AssetSection
                icon={<FlightIcon color="primary" />}
                title="Available Drones"
                count={selectedAssets.droneIds.length}
                total={drones.length}
              >
                {loading ? (
                  <CircularProgress />
                ) : drones.length === 0 ? (
                  <NoAssetPlaceholder message="No drones for this station" />
                ) : (
                  drones.map((d) => (
                    <DroneSelectionCard
                      key={d.id}
                      drone={d}
                      isSelected={selectedAssets.droneIds.includes(d.id)}
                      onToggle={() =>
                        setSelectedAssets((p) => ({
                          ...p,
                          droneIds: p.droneIds.includes(d.id)
                            ? p.droneIds.filter((id) => id !== d.id)
                            : [...p.droneIds, d.id],
                        }))
                      }
                    />
                  ))
                )}
              </AssetSection>
            </Stack>

            {/* STICKY SUMMARY */}
            <SelectionSummary
              selectedVehicles={selectedVehicleObjects}
              selectedDrones={selectedDroneObjects}
              canActivate={canActivate}
              onActivate={() =>
                navigate(
                  `/live-incident-command/${incidentId}/${selectedDroneObjects[0].drone_id}`
                )
              }
              onBack={() => navigate(-1)}
            />
          </Box>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

// ---------------- HELPERS ----------------
function AssetSection({ icon, title, count, total, children }) {
  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {icon}
              <Typography fontWeight={600}>{title}</Typography>
            </Box>
            <Chip label={`${count} Selected`} size="small" />
          </Box>
        }
        subheader={`${total} assets`}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function NoAssetPlaceholder({ message }) {
  return (
    <Box textAlign="center" py={4}>
      <WarningAmberIcon />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}
