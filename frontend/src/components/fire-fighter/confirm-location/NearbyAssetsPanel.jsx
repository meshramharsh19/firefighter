import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';

// --- MUI Icons ---
import RadioIcon from '@mui/icons-material/Radio';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BuildIcon from '@mui/icons-material/Build';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NearMeIcon from '@mui/icons-material/NearMe';

// Mock Data
const mockAssets = [
  { id: 'a1', name: 'Engine 42', type: 'fire-truck', status: 'available', distance: 0.8, eta: 3 },
  { id: 'a2', name: 'Ambulance 19', type: 'ambulance', status: 'en-route', distance: 2.1, eta: 5 },
  { id: 'a3', name: 'Drone X-55', type: 'drone', status: 'available', distance: 0.3, eta: 1, battery: 85 },
  { id: 'a4', name: 'Drone Recon 1', type: 'drone', status: 'maintenance', distance: 5.5, eta: 12, battery: 15 },
  { id: 'a5', name: 'Engine 01', type: 'fire-truck', status: 'busy', distance: 1.5, eta: 4 },
];

// Icon Mapper
const getAssetIcon = (type) => {
  switch (type) {
    case 'fire-truck': return LocalShippingIcon;
    case 'ambulance': return LocalHospitalIcon;
    case 'drone': return FlightIcon;
    default: return DirectionsCarIcon;
  }
};

// Status Chip Config
const getStatusConfig = (status) => {
  switch (status) {
    case 'available': return { label: 'Available', color: 'success', icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> };
    case 'en-route': return { label: 'En-route', color: 'info', icon: <DirectionsRunIcon sx={{ fontSize: 16 }} /> };
    case 'busy': return { label: 'Busy', color: 'warning', icon: <WarningAmberIcon sx={{ fontSize: 16 }} /> };
    case 'maintenance': return { label: 'Maintenance', color: 'error', icon: <BuildIcon sx={{ fontSize: 16 }} /> };
    default: return { label: 'Unknown', color: 'default', icon: null };
  }
};

// Component Panel
function NearbyAssetsPanelMui({ assets }) {
  const availableAssets = assets.filter(a => a.status === 'available').slice(0, 4);

  const assetItemStyle = {
    p: 1.5,
    borderRadius: 2,
    bgcolor: 'action.hover',
    border: '1px solid',
    borderColor: 'divider',
    '&:hover': { borderColor: 'primary.main' }
  };

  const iconCircleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 2,
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    flexShrink: 0
  };

  return (
    <Card sx={{
      borderRadius: 2,
      boxShadow: 3,
      width: '100%',       // 🔥 Full Width
      bgcolor: 'background.paper'
    }}>
      <CardHeader
        sx={{ pb: 1, pt: 2 }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RadioIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Nearby Assets</Typography>
          </Box>
        }
      />

      <CardContent sx={{ pt: 1, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {availableAssets.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
              No available assets nearby
            </Typography>
          ) : (
            availableAssets.map((asset) => {
              const statusConfig = getStatusConfig(asset.status);
              const IconComponent = getAssetIcon(asset.type);

              return (
                <Box key={asset.id} sx={assetItemStyle}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>

                    <Box sx={iconCircleStyle}><IconComponent sx={{ fontSize: 20 }} /></Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: .5 }}>
                        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 500 }}>
                          {asset.name}
                        </Typography>
                        <Chip size="small" {...statusConfig} sx={{ fontSize: '0.7rem', height: 20 }} />
                      </Box>

                      <Box sx={{ typography: 'caption', mt: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, color: 'text.secondary' }}>
                            <NearMeIcon sx={{ fontSize: 14 }} />Distance:
                          </Box>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>{asset.distance} km</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: .5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, color: 'text.secondary' }}>
                            <AccessTimeIcon sx={{ fontSize: 14 }} />ETA:
                          </Box>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {asset.eta} min
                          </Typography>
                        </Box>

                        {asset.type === 'drone' && asset.battery !== undefined && (
                          <Box sx={{ mt: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="caption" color="text.secondary">Battery:</Typography>
                              <Typography variant="caption">{asset.battery}%</Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={asset.battery}
                              sx={{ height: 4, borderRadius: 2 }}
                              color={asset.battery > 20 ? 'primary' : 'error'}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>

                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// App Wrapper (NO WHITE SPACE)
export default function App() {
  return (
    <>
      <NearbyAssetsPanelMui assets={mockAssets} />
    </>
  );
}
