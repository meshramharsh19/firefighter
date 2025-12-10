import React from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Divider,
  Button,
  Alert
} from '@mui/material'

// MUI Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FlightIcon from '@mui/icons-material/Flight'
import GroupIcon from '@mui/icons-material/Group'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'


export default function SelectionSummary({
  selectedVehicles,
  selectedDrones,
  canActivate,
  onActivate,
  onBack
}) {
  const totalETA = Math.max(
    ...[
      ...selectedVehicles.map(v => v.etaMinutes),
      ...selectedDrones.map(d => d.etaMinutes)
    ],
    0
  )

  const totalDistance =
    selectedVehicles.reduce((sum, v) => sum + v.distanceKm, 0) +
    selectedDrones.reduce((sum, d) => sum + d.distanceKm, 0)

  const totalCrew = selectedVehicles.reduce((sum, v) => sum + (v.crew?.length || 0), 0)

  return (
    <Box sx={{ position: 'sticky', top: 12, width: '100%' }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>

        {/* Header */}
        <CardHeader
          title={
            <>
              <Typography variant="h6" fontWeight={600}>Selection Summary</Typography>
              <Typography variant="body2" color="text.secondary">
                Review your asset selection
              </Typography>
            </>
          }
        />

        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* --- Counts --- */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <SummaryRow
              icon={<LocalShippingIcon fontSize="small" />}
              label="Vehicles"
              value={selectedVehicles.length}
            />
            <SummaryRow
              icon={<FlightIcon fontSize="small" />}
              label="Drones"
              value={selectedDrones.length}
            />
            <SummaryRow
              icon={<GroupIcon fontSize="small" />}
              label="Crew Members"
              value={totalCrew}
            />
          </Box>

          <Divider />

          {/* --- Metrics --- */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.9rem' }}>
            <MetricRow label="Total Distance" value={`${totalDistance.toFixed(1)} km`} />
            <MetricRow label="Max ETA" value={`${totalETA} minutes`} />
          </Box>

          <Divider />

          {/* --- Selected Vehicles List --- */}
          {selectedVehicles.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                SELECTED VEHICLES
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {selectedVehicles.map(vehicle => (
                  <InfoTag key={vehicle.id} name={vehicle.name} info={`${vehicle.etaMinutes}m`} />
                ))}
              </Box>
            </Box>
          )}

          {/* --- Selected Drones List --- */}
          {selectedDrones.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                SELECTED DRONES
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {selectedDrones.map(drone => (
                  <InfoTag
                    key={drone.id}
                    name={drone.name}
                    info={`${drone.batteryPercent ?? '--'}% • ${drone.etaMinutes}m`}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* --- No Selection --- */}
          {selectedVehicles.length === 0 && selectedDrones.length === 0 && (
            <Box textAlign="center" sx={{ py: 3 }}>
              <ReportProblemIcon sx={{ fontSize: 34, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                No assets selected
              </Typography>
            </Box>
          )}

          <Divider />

          {/* --- Activation Banner --- */}
          {!canActivate && (
            <Alert severity="error" icon={<WarningAmberIcon />}>
              <Typography variant="body2" fontWeight={600}>Drone Required</Typography>
              <Typography variant="caption">Select at least one drone to activate the mission.</Typography>
            </Alert>
          )}

          {canActivate && (
            <Alert severity="success" icon={<CheckCircleIcon />}>
              <Typography variant="body2" fontWeight={600}>Ready to Activate</Typography>
              <Typography variant="caption">All requirements met. Proceed to activate.</Typography>
            </Alert>
          )}

          {/* --- Action Buttons --- */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}>
            <Button
              variant="contained"
              fullWidth
              disabled={!canActivate}
              startIcon={<BoltIcon />}
              onClick={onActivate}
            >
              ACTIVATE DRONE
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
            >
              Back
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}

/* -------------------- Helper UI Components -------------------- */
function SummaryRow({ icon, label, value }) {
  return (
    <Box sx={{
      p: 1,
      borderRadius: 1.5,
      bgcolor: 'action.hover',
      border: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.9rem',
      alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Box>
      <Chip size="small" label={value} variant="outlined" />
    </Box>
  )
}

function MetricRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}</Typography>
    </Box>
  )
}

function InfoTag({ name, info }) {
  return (
    <Box sx={{
      p: 1,
      borderRadius: 1,
      bgcolor: 'action.hover',
      border: '1px solid',
      borderColor: 'divider',
      fontSize: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Typography fontWeight={500} sx={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {name}
      </Typography>
      <Typography color="text.secondary">{info}</Typography>
    </Box>
  )
}
