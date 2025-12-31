import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Grid,
} from "@mui/material";

// Icons
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";

/* ================================
   Distance Calculator (Haversine)
================================ */
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

export default function SuggestedStationsPanelMui() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      console.log("🚀 loadData started");

      try {
        /* ===============================
           1️⃣ FETCH INCIDENT VIA PHP
        =============================== */
        const incidentRes = await fetch(
          "http://localhost/fire-fighter-new/backend/controllers/incidents/get_incidents.php"
        );

        console.log("📥 Incident response:", incidentRes);

        const incidents = await incidentRes.json();
        console.log("📄 Incident JSON:", incidents);

        if (!Array.isArray(incidents) || incidents.length === 0) {
          console.error("❌ No incident data");
          setLoading(false);
          return;
        }

        const incidentId = incidents[0].id;
        const incidentLat = incidents[0].coordinates.lat;
        const incidentLng = incidents[0].coordinates.lng;

        console.log("✅ INCIDENT ID:", incidentId);
        console.log("✅ INCIDENT LAT:", incidentLat);
        console.log("✅ INCIDENT LNG:", incidentLng);

        /* ===============================
           2️⃣ FETCH FIRE STATIONS
        =============================== */
        const stationRes = await fetch(
          "http://localhost/fire-fighter-new/backend/controllers/admin/station/get_stations.php"
        );

        console.log("📥 Station response:", stationRes);

        const stationData = await stationRes.json();
        console.log("📄 Station JSON:", stationData);

        if (!stationData.success || !Array.isArray(stationData.data)) {
          console.error("❌ Invalid station data");
          setLoading(false);
          return;
        }

        /* ===============================
           3️⃣ CALCULATE DISTANCE
        =============================== */
        const stationsWithDistance = stationData.data.map((s) => {
          const distance = calculateDistanceKm(
            incidentLat,
            incidentLng,
            s.lat,
            s.lng
          );

          console.log(
            `➡️ ${s.station_name} | distance = ${distance.toFixed(2)} km`
          );

          return {
            id: s.id,
            name: s.station_name,
            distance,
            vehicles: Math.floor(Math.random() * 20) + 1,
            drones: Math.floor(Math.random() * 10) + 1,
          };
        });

        stationsWithDistance.sort((a, b) => a.distance - b.distance);

        console.log(
          "🏁 Final nearest stations:",
          stationsWithDistance.slice(0, 3)
        );

        setStations(stationsWithDistance.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("🔥 Unexpected error:", err);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, width: "100%" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BusinessIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Nearby Fire Stations
            </Typography>
          </Box>
        }
      />

      <CardContent>
        {loading ? (
          <Typography align="center">Loading stations...</Typography>
        ) : stations.length === 0 ? (
          <Typography align="center">No stations found</Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {stations.map((station, index) => (
              <Box
                key={station.id}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                {/* Name + Rank + Distance */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label={`#${index + 1}`} size="small" color="primary" />
                    <Typography
                      fontSize="0.9rem"
                      fontWeight={500}
                      component="div"
                    >
                      {station.name}
                    </Typography>
                  </Box>

                  <Chip
                    label={`${station.distance.toFixed(2)} km`}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {/* Vehicles & Drones */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalShippingIcon fontSize="small" />
                      <Typography variant="caption" component="div">
                        {station.vehicles} vehicles
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FlightIcon fontSize="small" />
                      <Typography variant="caption" component="div">
                        {station.drones} drones
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
