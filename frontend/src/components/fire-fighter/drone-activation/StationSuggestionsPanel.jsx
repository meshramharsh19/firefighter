import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  Stack,
} from '@mui/material';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function StationSuggestionsPanel({ stations }) {

  return (
    <Card sx={{
      bgcolor:"#161616",
      border:"1px solid #222",
      borderRadius:"18px",
      color:"#fff",
      boxShadow:"0 0 15px rgba(0,0,0,.5)",
      p:1
    }}>

      <CardHeader
        title={
          <Typography fontWeight="800" sx={{ display:"flex", alignItems:"center", gap:.8, color:"#ff4444" }}>
            <BusinessOutlinedIcon sx={{ fontSize:22 }}/>
            Nearby Stations
          </Typography>
        }
        sx={{ borderBottom:"1px solid #222", pb:1 }}
      />

      <CardContent sx={{ pt:2 }}>

        <Typography sx={{ fontSize:"12px", color:"#bbb", mb:2 }}>
          Nearest available support stations
        </Typography>

        <Stack spacing={1.5}>
          {stations.length === 0 ? (
            <Typography align="center" sx={{ py:2, color:"#777" }}>
              No stations found nearby
            </Typography>
          ) : (
            stations.map((station,index)=>(
              <Box key={station.stationId}
                sx={{
                  p:2,
                  borderRadius:"12px",
                  bgcolor:"#0d0d0d",
                  border:"1px solid #333",
                  transition:".2s",
                  "&:hover":{ borderColor:"#ff4444", background:"#181818", cursor:"pointer" }
                }}
              >

                <Stack direction="row" spacing={1.5} alignItems="flex-start">

                  {/* Rank Circle */}
                  <Box sx={{
                    minWidth:32,
                    height:32,
                    bgcolor:"#222",
                    borderRadius:"50%",
                    border:"1px solid #444",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    fontSize:"12px",
                    color:"#ff4444",
                    fontWeight:"bold"
                  }}>
                    #{index+1}
                  </Box>

                  {/* Station content */}
                  <Box flex={1}>

                    <Typography fontWeight="600" sx={{ color:"#fff", fontSize:"14px" }}>
                      {station.stationName}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={.5}>
                      <LocationOnOutlinedIcon sx={{ fontSize:14, color:"#999" }}/>
                      <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
                        {station.distanceKm.toFixed(1)} km
                      </Typography>

                      <Typography sx={{ color:"#666" }}>•</Typography>

                      <AccessTimeOutlinedIcon sx={{ fontSize:14, color:"#999" }}/>
                      <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
                        {station.etaMinutes} min
                      </Typography>
                    </Stack>

                    {/* Vehicle chips */}
                    <Stack direction="row" spacing={1} mt={1}>

                      <Chip
                        size="small"
                        label={`${station.availableVehicles} Available`}
                        icon={<CheckCircleOutlineIcon style={{ color:"#4caf50" }}/>}
                        sx={{
                          height:22,
                          fontSize:"11px",
                          color:"#fff",
                          bgcolor:"#1e1e1e",
                          border:"1px solid #333"
                        }}
                      />

                      <Chip
                        size="small"
                        label={`${station.busyVehicles} Busy`}
                        icon={<ErrorOutlineIcon style={{ color:"#ff9800" }}/>}
                        sx={{
                          height:22,
                          fontSize:"11px",
                          color:"#ddd",
                          bgcolor:"#1e1e1e",
                          border:"1px solid #333"
                        }}
                      />

                    </Stack>

                  </Box>

                </Stack>

              </Box>
            ))
          )}
        </Stack>

        {/* Info note */}
        <Box sx={{
          mt:2,
          p:1.5,
          borderRadius:"10px",
          bgcolor:"#111",
          border:"1px solid #333"
        }}>
          <Stack direction="row" spacing={1}>
            <InfoOutlinedIcon sx={{ fontSize:16, color:"#ff4444", mt:.2 }}/>
            <Typography sx={{ fontSize:"12px", color:"#bbb" }}>
              Used when required support from backup stations.
            </Typography>
          </Stack>
        </Box>

      </CardContent>
    </Card>
  );
}
