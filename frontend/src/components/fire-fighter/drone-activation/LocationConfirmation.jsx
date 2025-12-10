import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';

import {
  LocationOnRounded,
  CenterFocusStrongRounded,
  MapOutlined,
  ViewInArOutlined,
  ErrorOutlineRounded,
  InfoRounded,
  ArrowBackRounded,
  RotateLeftRounded,
  CheckRounded,
} from '@mui/icons-material';

export default function LocationConfirmation({
  latitude,
  longitude,
  mapView,
  incidentName,
  onConfirm,
  onBack,
}) {

  const [adjustedLat, setAdjustedLat] = useState(latitude);
  const [adjustedLng, setAdjustedLng] = useState(longitude);
  const [isDragging, setIsDragging] = useState(false);

  const isAdjusted = adjustedLat !== latitude || adjustedLng !== longitude;

  return (
    <Card sx={{
      bgcolor: "#161616",
      color: "#fff",
      border: "1px solid #222",
      borderRadius: "18px",
      boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      p: 2,
      mt: 1
    }}>

      {/* HEADER */}
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <CenterFocusStrongRounded sx={{ color:"#ff4444", fontSize:22 }}/>
            <Typography variant="h6" fontWeight="bold" color="#fff">
              Confirm Incident Location
            </Typography>
          </Box>
        }
        sx={{ pb:1 }}
      />

      <CardContent sx={{ display:"flex", flexDirection:"column", gap:3 }}>

        {/* MAP PREVIEW */}
        <Box
          sx={{
            position:"relative",
            aspectRatio:"16/9",
            borderRadius:"14px",
            bgcolor:"#111",
            border:"1px solid #333",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            textAlign:"center",
            overflow:"hidden",
            cursor:isDragging?"grabbing":"grab",
            "&:hover":{ borderColor:"#ff4444" }
          }}
          onMouseDown={()=>setIsDragging(true)}
          onMouseUp={()=>setIsDragging(false)}
          onMouseLeave={()=>setIsDragging(false)}
        >
          {mapView === '3d' ?
            <ViewInArOutlined sx={{ fontSize:60, color:"#666" }}/> :
            <MapOutlined sx={{ fontSize:60, color:"#666" }}/>
          }

          <Typography mt={1} fontSize="13px" color="#bbb">
            {isDragging ? "Adjusting..." : "Drag marker to reposition"}
          </Typography>

          {/* MARKER */}
          <Box sx={{
            position:"absolute",
            top:"50%", left:"50%",
            transform:"translate(-50%,-100%)",
            animation:"bounce 1.5s infinite",
            "@keyframes bounce":{
              "0%,100%":{ transform:"translate(-50%,-100%) translateY(0)" },
              "50%":{ transform:"translate(-50%,-100%) translateY(-10px)" }
            }
          }}>
            <LocationOnRounded
              sx={{
                fontSize:45,
                color:"#ff4444",
                filter:"drop-shadow(0 2px 5px rgba(255,0,0,0.4))"
              }}
            />
          </Box>
        </Box>

        {/* COORDINATES INPUT */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField
            label="Latitude"
            type="number"
            value={adjustedLat}
            onChange={(e)=>setAdjustedLat(parseFloat(e.target.value) || 0)}
            size="small"
            InputLabelProps={{ style:{ color:"#ccc" }}}
            sx={{
              bgcolor:"#111", borderRadius:"8px",
              "& input":{ color:"#fff", fontFamily:"monospace" },
              "& fieldset":{ borderColor:"#333" },
              "&:hover fieldset":{ borderColor:"#ff4444" }
            }}
          />

          <TextField
            label="Longitude"
            type="number"
            value={adjustedLng}
            onChange={(e)=>setAdjustedLng(parseFloat(e.target.value) || 0)}
            size="small"
            InputLabelProps={{ style:{ color:"#ccc" }}}
            sx={{
              bgcolor:"#111", borderRadius:"8px",
              "& input":{ color:"#fff", fontFamily:"monospace" },
              "& fieldset":{ borderColor:"#333" },
              "&:hover fieldset":{ borderColor:"#ff4444" }
            }}
          />
        </Box>

        {/* STATUS IF CHANGED */}
        {isAdjusted && (
          <Box sx={{
            p:2,
            border:"1px solid #ff9a1d",
            bgcolor:"rgba(255,166,0,0.18)",
            borderRadius:"10px",
            display:"flex", gap:1.5, alignItems:"center"
          }}>
            <ErrorOutlineRounded sx={{ color:"#ff9a1d" }}/>
            <Typography color="#fff" fontSize="14px">
              Location changed — assets will recalculate.
            </Typography>
          </Box>
        )}

        {/* INFO BOX */}
        <Box sx={{
          p:2,
          border:"1px solid #1976d2",
          bgcolor:"rgba(25,118,210,0.18)",
          borderRadius:"10px",
          display:"flex", gap:1.5
        }}>
          <InfoRounded sx={{ color:"#64b5f6" }}/>
          <Typography color="#eee" fontSize="14px">
            <b>Tip:</b> Adjust the marker if caller location is inaccurate.
          </Typography>
        </Box>

        {/* ACTION BUTTONS */}
        <Box display="flex" gap={2} mt={1}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ArrowBackRounded/>}
            sx={{ flex:1, borderColor:"#555", color:"#ddd",
              "&:hover":{ borderColor:"#ff4444",color:"#fff" }}}
            onClick={onBack}
          >
            Back
          </Button>

          {isAdjusted && (
            <Button
              variant="outlined"
              startIcon={<RotateLeftRounded/>}
              sx={{ flex:1, borderColor:"#777",color:"#eee",
                "&:hover":{ borderColor:"#ff9800", color:"#fff" }}}
              onClick={()=>{
                setAdjustedLat(latitude)
                setAdjustedLng(longitude)
              }}
            >
              Reset
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<CheckRounded/>}
            sx={{ flex:1, bgcolor:"#ff4444",
              "&:hover":{ bgcolor:"#cc0000" }}}
            onClick={()=>onConfirm(adjustedLat,adjustedLng)}
          >
            Confirm
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
