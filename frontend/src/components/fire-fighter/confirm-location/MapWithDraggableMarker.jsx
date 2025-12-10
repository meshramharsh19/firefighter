import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Leaflet custom marker icon (important fix)
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
  incidentName,
  hasMarkerMoved
}) {
  const [position, setPosition] = useState([initialLat, initialLng]);

  useEffect(() => { setPosition([initialLat, initialLng]); }, [initialLat, initialLng]);

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(true);

    const eventHandlers = {
      dragend(e) {
        const { lat, lng } = e.target.getLatLng();
        setPosition([lat, lng]);
        onMarkerMove(lat, lng);
      }
    };

    return (
      <Marker
        icon={markerIcon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
      >
        <Popup>
          <b>{incidentName}</b> <br />
          {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </Popup>
      </Marker>
    );
  }

  return (
    <Card sx={{ background:"#141414", border:"1px solid #222", borderRadius:3 }}>
      <CardHeader
        title={
          <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
              <LocationOnIcon color="primary"/>
              <Typography variant="h6">Incident Location Map</Typography>
            </Box>
            {hasMarkerMoved && <Chip label="ADJUSTED" color="warning"/>}
          </Box>
        }
      />

      <CardContent>
        {/* MAP */}
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom
          style={{ height:"400px", borderRadius:"10px", width:"100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <DraggableMarker />

        </MapContainer>

        {/* Show current lat-lng */}
        <Box mt={2} p={1} sx={{ bgcolor:"#1e1e1e", borderRadius:1 }}>
          <Typography fontSize={13} color="gray">Coordinates</Typography>
          <Typography fontFamily="monospace">
            {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </Typography>
        </Box>

        {hasMarkerMoved && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt:2 }}
            onClick={()=>{
              setPosition([initialLat, initialLng]);
              onMarkerMove(initialLat, initialLng);
            }}
          >
            Reset to Original Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
