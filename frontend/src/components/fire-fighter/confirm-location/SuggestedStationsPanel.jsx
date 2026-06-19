import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Grid,
  Radio,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ===============================
// MAIN COMPONENT
// ===============================
export default function SuggestedStationsPanel({
  selectedStationName,
  onSelectStation,
  onStationsLoad,
  incidentLat,
  incidentLng,
}) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // ===============================
        // VALIDATE INCIDENT COORDINATES
        // ===============================
        if (!incidentLat || !incidentLng) {
          setStations([]);
          return;
        }

        console.log("🔥 INCIDENT COORDINATES:", incidentLat, incidentLng);

        // ===============================
        // GET LOGGED-IN USER STATION
        // ===============================
        const sessionData = localStorage.getItem("fireOpsSession");

        let currentUserStation = "";

        if (sessionData) {
          try {
            const parsedUser = JSON.parse(sessionData);

            currentUserStation = parsedUser?.station || "";

            console.log("🔥 CURRENT USER STATION:", currentUserStation);
          } catch (err) {
            console.error("Failed to parse session", err);
          }
        }

        // ===============================
        // FETCH NEAREST STATIONS API
        // ===============================
        const res = await fetch(
          `${API_BASE}/fire-fighter/confirm-location/getNearestStations.php?lat=${incidentLat}&lng=${incidentLng}&currentStation=${encodeURIComponent(
            currentUserStation,
          )}`,
        );

        const data = await res.json();

        console.log("🔥 NEAREST STATIONS API RESPONSE:", data);

        // ===============================
        // HANDLE EMPTY RESPONSE
        // ===============================
        if (!data?.stations) {
          setStations([]);
          return;
        }

        // ===============================
        // UPDATE STATE
        // ===============================
        setStations(data.stations);

        // SEND TO MAP
        onStationsLoad?.(data.stations);
      } catch (err) {
        console.error("Failed to load stations", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [incidentLat, incidentLng]);

  // ===============================
  // HANDLE STATION SELECTION
  // ===============================
  const handleSelect = (station) => {
    const nextSelection =
      selectedStationName === station.name
        ? null
        : {
            name: station.name,
            lat: parseFloat(station.lat),
            lng: parseFloat(station.lng),
          };

    onSelectStation(nextSelection);
  };

  // ===============================
  // UI
  // ===============================
  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessIcon color="primary" />

            <Typography variant="h6">Nearby Fire Stations</Typography>
          </Box>
        }
      />

      <CardContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={5}
          >
            <div className="loader"></div>
          </Box>
        ) : stations.length === 0 ? (
          <Typography align="center">No nearby stations found</Typography>
        ) : (
          stations.map((station, index) => (
            <Box
              key={station.name}
              onClick={() => handleSelect(station)}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                cursor: "pointer",
                border: "1px solid",
                borderColor:
                  selectedStationName === station.name
                    ? "primary.main"
                    : "divider",
                bgcolor: "background.paper",
              }}
            >
              {/* HEADER */}
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <Radio
                    checked={selectedStationName === station.name}
                    onChange={() => handleSelect(station)}
                  />

                  <Typography fontWeight="bold">
                    Fire Station : {station.name}
                  </Typography>
                </Box>

                <Chip label={`#${index + 1}`} size="small" color="error" />
              </Box>

              {/* DISTANCE + ETA */}
              <Box mt={1} mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Distance:{" "}
                  {station.distance
                    ? `${parseFloat(station.distance).toFixed(2)} km`
                    : "N/A"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ETA:{" "}
                  {station.eta
                    ? `${parseFloat(station.eta).toFixed(1)} min`
                    : "N/A"}
                </Typography>
              </Box>

              {/* ASSETS */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocalShippingIcon fontSize="small" />

                    <Typography variant="body2">
                      {station.vehicles || 0} vehicles
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FlightIcon fontSize="small" />

                    <Typography variant="body2">
                      {station.drones || 0} drones
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
