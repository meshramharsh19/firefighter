import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Checkbox,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


export default function AssetSelectionPanel({
  vehicles = [],
  drones = [],
  selectedVehicleIds = [],
  selectedDroneId,
  onSelectionChange,
}) {
  const [localVehicleIds, setLocalVehicleIds] = useState(selectedVehicleIds);
  const [localDroneId, setLocalDroneId] = useState(selectedDroneId);

  useEffect(() => setLocalVehicleIds(selectedVehicleIds), [selectedVehicleIds]);
  useEffect(() => setLocalDroneId(selectedDroneId), [selectedDroneId]);


  /** status styling mapper **/
  const getStatusProps = (status) => {
    const map = {
      Disponible:       { color:"success", variant:"outlined" },
      "En Ruta":        { color:"info",    variant:"outlined" },
      Ocupado:          { color:"warning", variant:"outlined" },
      "En Mantenimiento":{ color:"error",  variant:"outlined" },
    };
    return map[status] || { color:"default", variant:"outlined" };
  };


  const handleVehicleToggle = (vehicleId) => {
    const updated = localVehicleIds.includes(vehicleId)
      ? localVehicleIds.filter(id => id !== vehicleId)
      : [...localVehicleIds, vehicleId];

    setLocalVehicleIds(updated);
    onSelectionChange(updated, localDroneId);
  };

  const handleDroneSelect = (droneId) => {
    const updated = localDroneId === droneId ? null : droneId;
    setLocalDroneId(updated);
    onSelectionChange(localVehicleIds, updated);
  };

  const isReady = localVehicleIds.length > 0 && localDroneId;


  return (
    <Box sx={{ p: 2, display:"flex", flexDirection:"column", gap:3 }}>

      {/* Vehicles Section */}
      <Card sx={{ borderRadius: 2, bgcolor:"#111", color:"#fff" }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <LocalShippingIcon color="primary" />
              <Typography variant="h6">Select Vehicles</Typography>
              <Chip
                label={`${localVehicleIds.length} selected`}
                size="small"
                sx={{ ml:"auto", bgcolor:"#1976d240", color:"#fff" }}
              />
            </Box>
          }
          sx={{ borderBottom:"1px solid #333"}}
        />
        <CardContent sx={{ p:0 }}>

          {vehicles.length === 0 && (
            <Typography align="center" sx={{ py:3, opacity:0.7 }}>No vehicles available</Typography>
          )}

          <List disablePadding>
            {vehicles.map(vehicle => {
              const isSelected = localVehicleIds.includes(vehicle.id);
              const statusProps = getStatusProps(vehicle.status);

              return (
                <ListItem key={vehicle.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleVehicleToggle(vehicle.id)}
                    sx={{
                      m:1, p:2, borderRadius:2,
                      border:`2px solid ${isSelected? "#1976d2" : "#333"}`,
                      bgcolor: isSelected? "#1976d230" : "#1c1c1c",
                      transition:".2s",
                      '&:hover':{ borderColor:"#1976d2", bgcolor:"#1f1f1f" }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth:35 }}>
                      <Checkbox
                        checked={isSelected}
                        onClick={(e)=>{ e.stopPropagation(); handleVehicleToggle(vehicle.id); }}
                        sx={{ color:"#fff" }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                          <Typography fontWeight="bold">{vehicle.name}</Typography>
                          <Chip label={vehicle.vehicleType} size="small" />
                          <Chip size="small" {...statusProps} />
                        </Box>
                      }
                      secondary={
                        <Box mt={1} sx={{ color:"#aaa" }}>
                          <Grid container spacing={1}>
                            <Grid item xs={6} display="flex" alignItems="center" gap={.5}>
                              <LocationOnIcon sx={{ fontSize:16 }}/> {vehicle.distanceKm.toFixed(1)} km away
                            </Grid>
                            <Grid item xs={6} display="flex" alignItems="center" gap={.5}>
                              <AccessTimeIcon sx={{ fontSize:16 }}/> ETA {vehicle.etaMinutes} min
                            </Grid>
                          </Grid>
                        </Box>
                      }
                    />

                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

        </CardContent>
      </Card>



      {/* Drones Section */}
      <Card sx={{ borderRadius:2, bgcolor:"#111", color:"#fff" }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <AirplanemodeActiveIcon color="primary" />
              <Typography variant="h6">Select Drone</Typography>
              <Chip
                label={localDroneId?"1 selected":"None"}
                size="small"
                sx={{ ml:"auto", bgcolor:"#1976d240", color:"#fff" }}
              />
            </Box>
          }
          sx={{ borderBottom:"1px solid #333" }}
        />
        <CardContent sx={{ p:0 }}>

          {drones.length === 0 && (
            <Typography align="center" sx={{ py:3, opacity:0.7 }}>No drones available</Typography>
          )}

          <List disablePadding>
            {drones.map(drone => {
              const isSelected = localDroneId === drone.id;
              return (
                <ListItem key={drone.id} disablePadding>
                  <ListItemButton
                    onClick={()=>handleDroneSelect(drone.id)}
                    sx={{
                      m:1, p:2, borderRadius:2,
                      border:`2px solid ${isSelected? "#1976d2" : "#333"}`,
                      bgcolor:isSelected? "#1976d230" : "#1c1c1c",
                      '&:hover':{ borderColor:"#1976d2", bgcolor:"#1f1f1f" }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth:35 }}>
                      <Checkbox
                        checked={isSelected}
                        onClick={(e)=>{ e.stopPropagation(); handleDroneSelect(drone.id); }}
                        sx={{ color:"#fff" }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography fontWeight="bold">{drone.name}</Typography>
                          <Chip
                            label={drone.status}
                            size="small"
                            variant={drone.status==="Disponible"?"outlined":"filled"}
                            color={drone.status==="Disponible"?"success":"default"}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ color:"#ccc" }}>
                          <Grid container spacing={1} mt={1}>
                            <Grid item xs={6} display="flex" alignItems="center" gap={.5}>
                              <LocationOnIcon sx={{ fontSize:16 }}/> {drone.distanceKm.toFixed(1)} km
                            </Grid>
                            <Grid item xs={6} display="flex" alignItems="center" gap={.5}>
                              <AccessTimeIcon sx={{ fontSize:16 }}/> ETA {drone.etaMinutes} min
                            </Grid>
                          </Grid>

                          {/* Battery */}
                          <Box mt={2}>
                            <Typography variant="caption" fontWeight="bold" color="inherit">
                              Battery: {drone.batteryPercent}%
                            </Typography>
                            <LinearProgress
                              value={drone.batteryPercent}
                              variant="determinate"
                              sx={{
                                height:6, borderRadius:5, mt:1,
                                '& .MuiLinearProgress-bar':{
                                  bgcolor: drone.batteryPercent>50?'#4caf50':drone.batteryPercent>20?'#ffb300':'#f44336'
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      }
                    />

                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

        </CardContent>
      </Card>



      {/* Summary */}
      <Card sx={{ p:2, bgcolor:"#1c1c1c", color:"#fff", borderRadius:2 }}>
        <Typography>Vehicles Selected: <b>{localVehicleIds.length}</b></Typography>
        <Typography>Drone Selected: <b>{localDroneId?"Yes":"No"}</b></Typography>

        <Box mt={1} display="flex" alignItems="center" gap={1}>
          {isReady? <CheckCircleOutlineIcon color="success"/>:<CancelOutlinedIcon color="warning"/>}
          <Typography fontWeight="bold" color={isReady?'success.main':'warning.main'}>
            {isReady?"Ready to Activate":"Select required assets"}
          </Typography>
        </Box>
      </Card>

    </Box>
  );
}
