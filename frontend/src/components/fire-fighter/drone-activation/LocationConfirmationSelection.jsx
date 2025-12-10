import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  Grid,
  styled,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import ViewInArIcon from '@mui/icons-material/ViewInAr'; // For 3D digital twin

// Styled component for the Map Pin animation
// Changed custom prop name from 'isdragging' to 'draggingState'
const AnimatedMapPin = styled(LocationOnIcon)(({ theme, draggingState }) => ({
  color: theme.palette.primary.main,
  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
  transition: 'transform 0.2s',
  // Use the new prop name
  transform: draggingState === 'true' ? 'scale(1.25)' : 'scale(1)',
  width: 40,
  height: 40,
}));

// Styled component for the Map Container to handle the background pattern
const MapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '16/9',
  borderRadius: theme.shape.borderRadius * 2,
  border: `2px dashed ${theme.palette.divider}`,
  background: `linear-gradient(to bottom right, ${theme.palette.background.default}30, ${theme.palette.background.paper}10)`,
  cursor: 'crosshair',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover .MuiSvgIcon-root': {
    opacity: 0.8,
  },
}));

/**
 * Component for confirming and adjusting the incident location on a map simulation.
 * Uses Material UI components and styling.
 */
export default function LocationConfirmationSection({
  latitude = 0, // Added default value
  longitude = 0, // Added default value
  onLocationChange,
  onConfirm,
  mapViewMode
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Note: Dragging logic is simplified/simulated, the original component only used click.
  // The state for markerOffset is removed as it was not used for positioning in the original logic.

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simulate coordinate change (in real app, would calculate actual lat/lng)
    // This logic mimics the original component's approach to slightly adjust coordinates based on click position
    const latChange = (y - rect.height / 2) / 1000;
    const lngChange = (x - rect.width / 2) / 1000;

    // Use current latitude/longitude (which are now guaranteed numbers)
    onLocationChange(latitude + latChange, longitude + lngChange);
  };

  return (
    <Card sx={{ border: 1, borderColor: 'divider', boxShadow: 3 }}>
      <CardHeader
        title={
          <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MyLocationIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
              Confirm Incident Location
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0, '&:last-child': { pb: 2 } }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Review the incident location on the {mapViewMode === '3d' ? '3D digital twin' : '2D map'}.
          Click on the map to adjust the marker if needed. The system will recalculate nearest assets.
        </Typography>

        {/* Map Display */}
        <MapContainer onClick={handleMapClick}>
          {/* Map Background Icon (Simulated) */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mapViewMode === '3d' ? (
              <ViewInArIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.1 }} />
            ) : (
              <MapIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.1 }} />
            )}
          </Box>

          {/* Marker */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <Box sx={{ position: 'relative' }}>
              {/* Pass the new prop name 'draggingState' */}
              <AnimatedMapPin draggingState={isDragging ? 'true' : 'false'} />
              {/* Pulse effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 0.5 },
                    '50%': { transform: 'scale(1.3)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 0.5 },
                  },
                }}
              >
                <LocationOnIcon sx={{ color: 'primary.main', opacity: 0.3, width: 40, height: 40 }} />
              </Box>
            </Box>
          </Box>

          {/* Grid Overlay (Simulated) - Adjusted to use CSS properties in sx */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              pointerEvents: 'none',
              backgroundImage: (theme) => `
                linear-gradient(0deg, transparent 24%, ${theme.palette.error.main}08 25%, ${theme.palette.error.main}08 26%, transparent 27%, transparent 74%, ${theme.palette.error.main}08 75%, ${theme.palette.error.main}08 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, ${theme.palette.error.main}08 25%, ${theme.palette.error.main}08 26%, transparent 27%, transparent 74%, ${theme.palette.error.main}08 75%, ${theme.palette.error.main}08 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Crosshair (Simulated) */}
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: 1,
                  bgcolor: 'primary.main',
                  opacity: 0.1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: 1,
                  bgcolor: 'primary.main',
                  opacity: 0.1,
                }}
              />
            </Box>
          </Box>

          {/* Hint Text */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              fontSize: '0.75rem',
              color: 'text.secondary',
              bgcolor: 'background.paper',
              opacity: 0.8,
              backdropFilter: 'blur(4px)',
              px: 1.5,
              py: 1,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            Click to adjust marker position • Current: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </Box>
        </MapContainer>

        {/* Coordinates Display */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: 'action.hover',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Latitude
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}
              >
                {latitude.toFixed(6)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: 'action.hover',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Longitude
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}
              >
                {longitude.toFixed(6)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Info Box */}
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: 'primary.light', // Using light primary color for subtle background
            border: 1,
            borderColor: 'primary.main',
            mt: 3,
            display: 'flex',
            gap: 1.5,
          }}
        >
          <InfoIcon sx={{ color: 'primary.dark', flexShrink: 0, mt: 0.5 }} />
          <Box sx={{ fontSize: '0.875rem' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
              Location Adjustment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If the incident marker is not at the exact location, click on the map to reposition it.
              The system will automatically recalculate the nearest available vehicles and drones.
            </Typography>
          </Box>
        </Box>

        {/* Confirmation Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={onConfirm}
          sx={{ mt: 3, py: 1.5, borderRadius: 1 }}
        >
          Confirm Location and Proceed
        </Button>
      </CardContent>
    </Card>
  );
}