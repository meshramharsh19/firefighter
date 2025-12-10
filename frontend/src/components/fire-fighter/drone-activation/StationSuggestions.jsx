import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  List,
  Stack,
  Avatar,
} from '@mui/material';

import {
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  LocalFireDepartment as StationIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

export default function StationSuggestions({ stations }) {

  const topStations = stations.slice(0,3);

  return (
    <Card sx={{
      bgcolor:"#161616",
      border:"1px solid #222",
      borderRadius:"18px",
      boxShadow:"0 0 15px rgba(0,0,0,.4)",
      color:"#fff"
    }}>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:"#ff4444", width:36, height:36 }}>
            <StationIcon sx={{ fontSize:20, color:"#fff" }}/>
          </Avatar>
        }
        title={
          <Typography fontWeight="800" sx={{ color:"#ff4444", fontSize:"16px" }}>
            Nearby Fire Stations
          </Typography>
        }
        sx={{ borderBottom:"1px solid #222" }}
      />

      <CardContent sx={{ pt:2 }}>

        <Typography sx={{ color:"#bbb", fontSize:"12px", mb:2 }}>
          Top 3 closest resources available for response
        </Typography>

        <List disablePadding sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>

          {topStations.map((station,i)=>(
            <Box key={station.stationId}
              sx={{
                p:2,
                borderRadius:"12px",
                bgcolor:"#111",
                border:"1px solid #333",
                transition:".2s",
                "&:hover":{ borderColor:"#ff4444", background:"#181818" }
              }}
            >

              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography sx={{ fontSize:"14px", fontWeight:"600", color:"#fff" }}>
                    {station.stationName}
                  </Typography>

                  {/* Distance & ETA */}
                  <Stack direction="row" spacing={1} mt={.5}>
                    <Stack direction="row" spacing={.5} alignItems="center">
                      <LocationIcon sx={{ fontSize:14, color:"#999" }}/>
                      <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
                        {station.distanceKm.toFixed(1)} km
                      </Typography>
                    </Stack>

                    <Typography sx={{ color:"#666" }}>•</Typography>

                    <Stack direction="row" spacing={.5} alignItems="center">
                      <ScheduleIcon sx={{ fontSize:14, color:"#999" }}/>
                      <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
                        {station.etaMinutes} min ETA
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Chip
                  label={`#${i+1}`}
                  size="small"
                  sx={{
                    fontSize:"10px",
                    height:"20px",
                    bgcolor:"#222",
                    color:"#fff",
                    border:"1px solid #444"
                  }}
                />
              </Stack>

              {/* Availability */}
              <Stack direction="row" spacing={3} mt={1}>

                <Stack direction="row" spacing={.5} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize:16, color:"#4caf50" }}/>
                  <Typography sx={{ fontSize:"12px", color:"#fff" }}>
                    {station.availableVehicles} available
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={.5} alignItems="center">
                  <WarningIcon sx={{ fontSize:16, color:"#ff9800" }}/>
                  <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
                    {station.busyVehicles} busy
                  </Typography>
                </Stack>

              </Stack>

            </Box>
          ))}

        </List>
      </CardContent>
    </Card>
  );
}
