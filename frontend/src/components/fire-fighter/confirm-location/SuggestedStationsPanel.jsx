import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Grid,
} from '@mui/material';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightIcon from '@mui/icons-material/Flight';

// Mock Stations
const mockStations = [
  { id: 's1', name: 'Central Hub Delta', lat: 34.05, lng: -118.25, distance: 1.25, vehicles: 14, drones: 5 },
  { id: 's2', name: 'Industrial Zone 7', lat: 34.03, lng: -118.28, distance: 3.40, vehicles: 6, drones: 18 },
  { id: 's3', name: 'Riverside Depot', lat: 34.10, lng: -118.30, distance: 5.01, vehicles: 22, drones: 2 },
];

function SuggestedStationsPanelMui({ stations }) {
  return (
    <Card sx={{
      borderRadius: 2,
      boxShadow: 3,
      width: '100%',      // 🔥 full width
      bgcolor: 'background.paper'
    }}>

      <CardHeader
        sx={{ pb: 1, pt: 2 }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Top 3 Stations
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ pt: 1, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {stations.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              No stations found
            </Typography>
          ) : (
            stations.map((station, index) => (
              <Box
                key={station.id}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              >

                {/* Name + Rank + Distance */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      color="primary"
                      sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                      {station.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${station.distance.toFixed(1)} km`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>

                {/* Vehicles & Drones */}
                <Grid container spacing={2} sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShippingIcon sx={{ fontSize: '1rem' }} />
                      <Typography variant="caption">{station.vehicles} vehicles</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlightIcon sx={{ fontSize: '1rem' }} />
                      <Typography variant="caption">{station.drones} drones</Typography>
                    </Box>
                  </Grid>
                </Grid>

              </Box>
            ))
          )}

        </Box>
      </CardContent>
    </Card>
  );
}

// ⚡ App Wrapper Without White Space
export default function App() {
  return (
    <>
      <SuggestedStationsPanelMui stations={mockStations} />
    </>
  );
}
