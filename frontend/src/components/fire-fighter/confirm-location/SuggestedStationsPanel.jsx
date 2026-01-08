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

function calculateDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function SuggestedStationsPanel({
  selectedStationName,
  onSelectStation,
}) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const incidentRes = await fetch(
        `${API_BASE}/fire-fighter/fire-fighter-dashboard/get_incidents.php`
      );
      const incidents = await incidentRes.json();

      const stationRes = await fetch(
        `${API_BASE}/admin/station/get_stations.php`
      );
      const stationData = await stationRes.json();

      const lat = incidents[0].coordinates.lat;
      const lng = incidents[0].coordinates.lng;

      const result = stationData.data
        .map((s) => ({
          name: s.station_name,
          distance: calculateDistanceKm(lat, lng, s.lat, s.lng),
          vehicles: Math.floor(Math.random() * 20) + 1,
          drones: Math.floor(Math.random() * 10) + 1,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setStations(result);
      setLoading(false);
    }

    loadData();
  }, []);

  const handleSelect = (name) => {
    onSelectStation(selectedStationName === name ? null : name);
  };

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
          <Typography align="center">Loading stations...</Typography>
        ) : (
          stations.map((station, index) => (
            <Box
              key={station.name}
              onClick={() => handleSelect(station.name)}
              sx={{
                p: 1.5,
                mb: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                border: "1px solid",
                borderColor:
                  selectedStationName === station.name
                    ? "primary.main"
                    : "divider",
                bgcolor:
                  selectedStationName === station.name
                    ? "primary.light"
                    : "action.hover",
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Box display="flex" gap={1} alignItems="center">
                  <Radio
                    checked={selectedStationName === station.name}
                    onChange={() => handleSelect(station.name)}
                  />
                  <Chip label={`#${index + 1}`} size="small" color="primary" />
                  <Typography>{station.name}</Typography>
                </Box>
                <Chip
                  label={`${station.distance.toFixed(2)} km`}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalShippingIcon fontSize="small" />{" "}
                  {station.vehicles} vehicles
                </Grid>
                <Grid item xs={6}>
                  <FlightIcon fontSize="small" /> {station.drones} drones
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
