import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';

import MapIcon from '@mui/icons-material/Map';
import BoxIcon from '@mui/icons-material/AllOut';
import CrosshairIcon from '@mui/icons-material/MyLocation';
import InfoIcon from '@mui/icons-material/InfoOutlined';

export default function MapToggleSection({ latitude, longitude, incidentName, onToggle }) {

  const lat = Number(latitude) || 0;
  const lng = Number(longitude) || 0;

  const buttonStyle = {
    minHeight: 165,
    flexDirection: "column",
    alignItems: "flex-start",
    textTransform: "none",
    p: 2,
    border: "1px solid #333",
    borderRadius: "14px",
    color: "#fff",
    "&:hover": {
      borderColor: "#ff4444",
      backgroundColor: "rgba(255,0,0,0.15)",
    }
  };

  const iconBox = {
    display: "flex", justifyContent: "center", alignItems: "center",
    width: "100%", height: 70,
    borderRadius: "10px",
    mb: 1,
    backgroundColor: "#111",
    border: "1px solid #333"
  };

  return (
    <Card sx={{ bgcolor:"#161616", color:"#fff", border:"1px solid #222", borderRadius:"18px", mt:-1 }}>
      
      {/* TITLE */}
      <CardHeader
        sx={{ pb:0 }}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <MapIcon sx={{ color:"#ff4444", fontSize:22 }}/>
            <Typography variant="h6" fontWeight="bold" color="#fff">
              Select Map View
            </Typography>
          </Box>
        }
      />

      <Divider sx={{ borderColor:"#333", mt:1, mb:2 }}/>

      <CardContent sx={{ pt:1 }}>

        <Typography sx={{ mb:2, fontSize:"14px", color:"#eaeaea" }}>
          Choose between <b>2D View</b> or <b>3D Digital Twin</b> for hazard analysis & building layout awareness.
        </Typography>

        {/* Option Buttons */}
        <Box sx={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
          
          {/* 2D VIEW */}
          <Button variant="outlined" sx={buttonStyle} onClick={()=>onToggle("2d")}>
            <Box sx={iconBox}><MapIcon sx={{ fontSize:40, color:"#aaa" }}/></Box>
            <Typography fontWeight="bold" color="#fff">2D Map View</Typography>
            <Typography variant="caption" color="#ccc">Standard map with markers</Typography>
          </Button>

          {/* 3D VIEW */}
          <Button variant="outlined" sx={buttonStyle} onClick={()=>onToggle("3d")}>
            <Box sx={iconBox}><BoxIcon sx={{ fontSize:40, color:"#aaa" }}/></Box>
            <Typography fontWeight="bold" color="#fff">3D Digital Twin</Typography>
            <Typography variant="caption" color="#ccc">Hazards & building structure view</Typography>
          </Button>

        </Box>

        {/* Incident Info */}
        <Box sx={{
          p:2, mt:3,
          bgcolor:"#111",
          border:"1px solid #333",
          borderRadius:"12px",
          color:"#fff"
        }}>
          <Typography fontWeight="bold" sx={{mb:0.5}}>{incidentName}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <CrosshairIcon sx={{ fontSize:16, color:"#bbb" }}/>
            <Typography sx={{ fontFamily:"monospace", color:"#fff" }}>
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </Typography>
          </Box>
        </Box>

        {/* TIP BOX */}
        <Box sx={{
          p:2, mt:2,
          bgcolor:"rgba(255,0,0,0.12)",
          border:"1px solid #ff4444",
          borderRadius:"10px"
        }}>
          <Box display="flex" gap={1}>
            <InfoIcon sx={{ fontSize:18, color:"#ff4444" }}/>
            <Typography variant="caption" color="#fff">
              <b>Tip:</b> Use 3D for structure scanning & hazard evaluation before drone launch.
            </Typography>
          </Box>
        </Box>

      </CardContent>

    </Card>
  );
}
