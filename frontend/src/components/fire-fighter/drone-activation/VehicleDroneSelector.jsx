import React from 'react';

// MUI Components
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Grid,
  Checkbox,
  useTheme,
  alpha
} from '@mui/material';

// Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RadioIcon from '@mui/icons-material/Radio';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

// Icon Map (FIXED ✔ Check icon included)
const IconMap = {
  Truck: LocalShippingIcon,
  Plane: FlightTakeoffIcon,
  Radio: RadioIcon,
  Check: CheckIcon,
};

const SafeIcon = ({ name, sx }) => {
  const IconComp = IconMap[name];
  return IconComp ? <IconComp sx={{ width: 18, height: 18, ...sx }} /> : null;
};

export default function VehicleDroneSelector({
  vehicles = [],
  drones = [],
  selectedVehicles = [],
  selectedDrone = null,
  onVehicleSelect,
  onDroneSelect,
  onBack,
}) {
  const theme = useTheme();

  const getStatusColor = (s) => ({
    Disponible: "#4caf50",
    "En Ruta": "#29b6f6",
    Ocupado: "#ffb300",
    "En Mantenimiento": "#e53935"
  }[s] || "#bbb");

  const cardStyle = {
    bgcolor: "#161616",
    border: "1px solid #222",
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 0 15px rgba(0,0,0,.5)",
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>

      {/* ================= VEHICLE SECTION ================= */}
      <Card sx={cardStyle}>
        <CardHeader
          title={<Typography fontWeight={900} sx={{color:"#ff4444"}}>🚒 Available Vehicles</Typography>}
          sx={{borderBottom:"1px solid #222"}}
        />
        <CardContent>

          {vehicles.length === 0 && (
            <Typography align="center" sx={{color:"#777"}}>No vehicles nearby</Typography>
          )}

          {vehicles.map(v=>{
            const selected = selectedVehicles.includes(v.id);

            return (
              <Box key={v.id} onClick={()=>onVehicleSelect(v.id)}
                sx={{
                  p:2, mb:1.3, borderRadius:"12px",
                  border:selected?"1px solid #ff4444":"1px solid #333",
                  bgcolor:selected?"#1A1A1A":"#111",
                  cursor:"pointer", transition:"0.2s",
                  "&:hover":{borderColor:"#ff4444",bgcolor:"#181818"}
                }}
              >
                <Box sx={{display:"flex",alignItems:"center",gap:1}}>
                  <Checkbox checked={selected} sx={{color:"#ff4444"}}/>
                  <Typography fontWeight={700} sx={{color:"#fff"}}>{v.name}</Typography>
                  <Chip size="small" label={v.vehicleType}
                    sx={{height:20,fontSize:"12px",bgcolor:"#222",color:"#fff",border:"1px solid #444"}}
                  />
                </Box>

                <Grid container spacing={1} mt={1} sx={{color:"#ccc",fontSize:"13px"}}>
                  <Grid item xs={6} sx={{display:"flex",gap:1}}>
                    <RadioIcon sx={{fontSize:14,color:getStatusColor(v.status)}}/>
                    <span style={{color:getStatusColor(v.status)}}>{v.status}</span>
                  </Grid>

                  <Grid item xs={6} sx={{display:"flex",gap:1}}>
                    <LocationOnIcon sx={{fontSize:14}}/> {v.distanceKm.toFixed(1)} km
                  </Grid>

                  <Grid item xs={6} sx={{display:"flex",gap:1}}>
                    <AccessTimeIcon sx={{fontSize:14}}/> ETA: {v.etaMinutes}m
                  </Grid>

                  <Grid item xs={6} sx={{display:"flex",gap:1}}>
                    <GroupIcon sx={{fontSize:14}}/> {v.crew.length} Crew
                  </Grid>
                </Grid>
              </Box>
            );
          })}

        </CardContent>
      </Card>


      {/* ================= DRONE SECTION ================= */}
      <Card sx={cardStyle}>
        <CardHeader
          title={<Typography fontWeight={900} sx={{color:"#ff4444"}}>🛩 Available Drones</Typography>}
          sx={{borderBottom:"1px solid #222"}}
        />
        <CardContent>

          {drones.length === 0 && (
            <Typography align="center" sx={{color:"#777"}}>No drones available</Typography>
          )}

          {drones.map(d=>{
            const selected = selectedDrone === d.id;
            const battery = d.batteryPercent;
            const level = battery>50?"#4caf50":battery>20?"#ff9800":"#e53935";

            return (
              <Box key={d.id} onClick={()=>onDroneSelect(d.id)}
                sx={{
                  p:2, mb:1.3, borderRadius:"12px",
                  border:selected?"1px solid #ff4444":"1px solid #333",
                  bgcolor:selected?"#181818":"#111",
                  cursor:"pointer",
                  "&:hover":{borderColor:"#ff4444"}
                }}
              >
                <Typography fontWeight={700} sx={{color:"#fff"}}>{d.name}</Typography>
                <Chip label={d.status} size="small"
                  sx={{mt:.5,bgcolor:"#222",border:"1px solid #444",color:"#fff"}}
                />

                <Grid container spacing={1} mt={1} sx={{color:"#ccc",fontSize:"13px"}}>
                  <Grid item xs={6}><LocationOnIcon sx={{fontSize:14}}/> {d.distanceKm.toFixed(1)} km</Grid>
                  <Grid item xs={6}><AccessTimeIcon sx={{fontSize:14}}/> ETA: {d.etaMinutes}m</Grid>
                </Grid>

                {/* Battery Indicator */}
                {battery!==undefined && (
                  <Box mt={1.2}>
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                      <Typography variant="caption" sx={{color:"#aaa"}}>Battery</Typography>
                      <Typography variant="caption" sx={{color:level,fontWeight:700}}>{battery}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={battery}
                      sx={{
                        mt:.6,height:6,borderRadius:3,background:"#222",
                        "& .MuiLinearProgress-bar":{background:level}
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}

        </CardContent>
      </Card>


      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="outlined"
        sx={{
          borderRadius:"10px",
          color:"#fff",
          borderColor:"#444",
          "&:hover":{borderColor:"#ff4444",color:"#ff4444"}
        }}
      >
        <ArrowBackIcon sx={{mr:1}}/> Back
      </Button>

    </Box>
  );
}
