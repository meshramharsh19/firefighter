import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Stack,
} from "@mui/material";

import PlaceIcon from "@mui/icons-material/Place";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import MapWithDraggableMarker from "./MapWithDraggableMarker";
import NearbyAssetsPanel from "./NearbyAssetsPanel";
import SuggestedStationsPanel from "./SuggestedStationsPanel";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const darkIncidentTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0F0F10", paper: "#131314" },
    primary: { main: "#E53935" },
    text: { primary: "#EDEDED", secondary: "#999" },
    divider: "#2A2A2A",
  },
});

const API =
  "http://localhost/fire-fighter-new/backend/controllers";

export default function ConfirmLocationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);
  const [hasMarkerMoved, setHasMarkerMoved] = useState(false);

  // 🔥 IMPORTANT: station NAME (not ID)
  const [selectedStationName, setSelectedStationName] = useState(null);

  useEffect(() => {
    fetch(`${API}/incidents/get_incidents.php`)
      .then((res) => res.json())
      .then((data) => {
        const inc = data.find((i) => i.id === id);
        if (!inc) {
          alert("Incident not found");
          return;
        }
        setIncident(inc);
        setCurrentLat(inc.coordinates.lat);
        setCurrentLng(inc.coordinates.lng);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ color: "white", padding: 40 }}>Loading...</p>;
  }

  const assets = [
    { id: "T-1", name: "Fire Truck A", type: "fire", distance: 1.2 },
    { id: "D-1", name: "Drone Recon", type: "drone", distance: 0.8 },
  ];

  const confirmAndProceed = () => {
    if (selectedStationName) {
      // 🔁 FORWARD FLOW (station NAME)
      navigate(
        `/confirm-forward-incidence/${id}/${encodeURIComponent(
          selectedStationName
        )}`
      );
    } else {
      // ✅ OWN STATION FLOW
      navigate(`/vehicle-drone-selection/${id}`);
    }
  };

  return (
    <ThemeProvider theme={darkIncidentTheme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", p: 3 }}>
        <Stack spacing={4} maxWidth="1200px" mx="auto">

          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "#1E1E1F",
                border: "1px solid #2A2A2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlaceIcon sx={{ color: "primary.main" }} />
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800}>
                Confirm Incident Location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adjust marker precisely before dispatch
              </Typography>
            </Box>
          </Stack>

          {/* Incident Card */}
          <Card>
            <CardHeader
              title={<Typography variant="h6">{incident.name}</Typography>}
            />
            <CardContent>
              <Stack direction="row" spacing={4} flexWrap="wrap">
                <InfoField label="Incident ID" value={incident.id} mono />
                <InfoField label="Type" value={incident.type} mono />
                <InfoField
                  label="Status"
                  value={
                    <Chip size="small" label={incident.status} color="error" />
                  }
                />
                <InfoField label="Location" value={incident.location} />
              </Stack>
            </CardContent>
          </Card>

          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            {/* Map */}
            <Box flex={2}>
              <MapWithDraggableMarker
                initialLat={currentLat}
                initialLng={currentLng}
                onMarkerMove={(lat, lng) => {
                  setCurrentLat(lat);
                  setCurrentLng(lng);
                  setHasMarkerMoved(true);
                }}
              />
            </Box>

            {/* Right */}
            <Stack flex={1} spacing={3}>
              <NearbyAssetsPanel assets={assets} />

              <SuggestedStationsPanel
                selectedStationName={selectedStationName}
                onSelectStation={setSelectedStationName}
              />

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CheckIcon />}
                  onClick={confirmAndProceed}
                >
                  {selectedStationName
                    ? "Confirm & Share Incident"
                    : "Confirm Location & Continue"}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<ChevronLeftIcon />}
                  onClick={() => navigate(-1)}
                >
                  Back to Dashboard
                </Button>
              </Stack>

              {hasMarkerMoved && (
                <Card sx={{ borderColor: "primary.main", bgcolor: "#211112" }}>
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <InfoIcon color="primary" />
                      <Box>
                        <Typography fontWeight="bold">
                          Location Adjusted
                        </Typography>
                        <Typography variant="caption">
                          Routing & response units recalculated
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

function InfoField({ label, value, mono }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontFamily: mono ? "monospace" : "inherit", fontWeight: 500 }}
      >
        {value}
      </Typography>
    </Box>
  );
}
