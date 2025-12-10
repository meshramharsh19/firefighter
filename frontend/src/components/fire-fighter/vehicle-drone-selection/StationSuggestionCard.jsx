import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider
} from '@mui/material'

// MUI Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PlaceIcon from '@mui/icons-material/Place'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function StationSuggestionCard({ station, rank }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        transition: '0.25s',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>

          {/* Rank */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,

              // ❗ Same logic as drone icon container (fixed, never change)
              bgcolor: 'rgba(255,0,0,0.12)',
              border: '1px solid rgba(255,0,0,0.35)',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ color: '#ff4d4d' }} // tactical warm red
            >
              #{rank}
            </Typography>
          </Box>


          {/* Details */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>

            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {station.stationName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Fire Station
              </Typography>
            </Box>

            {/* Distance & ETA */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mb: 2
              }}
            >
              <InfoMetric
                icon={<PlaceIcon fontSize="small" />}
                label="Distance"
                value={`${station.distanceKm.toFixed(1)} km`}
              />
              <InfoMetric
                icon={<AccessTimeIcon fontSize="small" />}
                label="ETA"
                value={`${station.etaMinutes} min`}
              />
            </Box>

            {/* Availability */}
            <Divider />
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <AvailabilityRow
                icon={<LocalShippingIcon fontSize="small" sx={{ color: 'success.main' }} />}
                label="Available"
                color="success"
                value={station.availableVehicles}
              />
              <AvailabilityRow
                icon={<WarningAmberIcon fontSize="small" sx={{ color: 'warning.main' }} />}
                label="In Use"
                color="warning"
                value={station.busyVehicles}
              />
            </Box>

            {/* Location */}
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Location
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontFamily: 'monospace', display: 'block' }}
              >
                {station.location.lat.toFixed(4)}, {station.location.lng.toFixed(4)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {station.location.locationName}
              </Typography>
            </Box>

          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

/* -------------------- Helper UI Components -------------------- */

function InfoMetric({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

function AvailabilityRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Chip size="small" label={value} variant="outlined" />
    </Box>
  )
}
