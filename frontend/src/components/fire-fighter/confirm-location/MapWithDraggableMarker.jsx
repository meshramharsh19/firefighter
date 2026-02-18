import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const { BaseLayer } = LayersControl;

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapWithDraggableMarkerMui({
  initialLat,
  initialLng,
  onMarkerMove,
  incidentName = "Incident",
  hasMarkerMoved,
}) {
  const [position, setPosition] = useState(null);
  const [originalPosition, setOriginalPosition] = useState(null);

  useEffect(() => {
    if (
      Number.isFinite(initialLat) &&
      Number.isFinite(initialLng) &&
      !originalPosition
    ) {
      const startPos = [initialLat, initialLng];
      setPosition(startPos);
      setOriginalPosition(startPos);
    }
  }, [initialLat, initialLng, originalPosition]);

  if (!position) {
    return (
      <Card sx={{ background: "#141414", border: "1px solid #222", borderRadius: 3 }}>
        <CardHeader title="Incident Location Map" />
        <CardContent>
          <Box
            sx={{
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "gray",
              bgcolor: "#111",
              borderRadius: 2,
            }}
          >
            Invalid or missing coordinates
          </Box>
        </CardContent>
      </Card>
    );
  }

  function DraggableMarker() {
    const eventHandlers = {
      dragend(e) {
        const { lat, lng } = e.target.getLatLng();
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          const newPos = [lat, lng];
          setPosition(newPos);
          onMarkerMove(lat, lng, false); 
        }
      },
    };

    return (
      <Marker icon={markerIcon} draggable eventHandlers={eventHandlers} position={position}>
        <Popup>
          <b>{incidentName}</b> <br />
          {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </Popup>
      </Marker>
    );
  }

  return (
    <Card sx={{ background: "#141414", border: "1px solid #222", borderRadius: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="h6">Incident Location Map</Typography>
            </Box>
            {hasMarkerMoved && <Chip label="ADJUSTED" color="warning" />}
          </Box>
        }
      />

      <CardContent>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom
          style={{ height: "400px", borderRadius: "10px", width: "100%" }}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Normal Map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="Satellite View">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
              />
            </BaseLayer>
          </LayersControl>

          <DraggableMarker />
        </MapContainer>

        <Box mt={2} p={1} sx={{ bgcolor: "#1e1e1e", borderRadius: 1 }}>
          <Typography fontSize={13} color="gray">
            Coordinates
          </Typography>
          <Typography fontFamily="monospace">
            {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </Typography>
        </Box>

        {hasMarkerMoved && originalPosition && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              const [resetLat, resetLng] = originalPosition;
              setPosition(originalPosition);          
              onMarkerMove(resetLat, resetLng, true); 
            }}
          >
            Reset to Original Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
