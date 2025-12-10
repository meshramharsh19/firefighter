import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import SafeIcon from "@/components/common/SafeIcon";

export default function DashboardVehiclePanel({ vehicles = [], drones = [] }) {
  
  const THEME = {
    bg: "#121314",
    card: "#17181A",
    border: "#232427",
    hover: "#1f2023",
    text: "#e6e6e6",
    faded: "#9ba1a6",
    red: "#EF4444",
  };

  const StatusChip = ({ status }) => {
    const palette = {
      available: "bg-green-500/20 text-green-400 border-green-400/50",
      "en-route": "bg-blue-500/20 text-blue-400 border-blue-400/50",
      busy: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      maintenance: "bg-red-500/20 text-red-400 border-red-400/50",
    };

    return (
      <Chip
        size="small"
        label={status.replace("-", " ").replace(/\b\w/g, c=>c.toUpperCase())}
        className={`px-1 font-semibold ${palette[status] || ""}`}
        sx={{ borderWidth: 1, borderStyle: "solid" }}
      />
    );
  };

  const VehicleItem = ({ v }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${v.status === "maintenance" ? THEME.red : THEME.border}`,
        background: THEME.card,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        transition: "0.25s ease",
        "&:hover": {
          background: THEME.hover,
          borderColor: v.status === "maintenance" ? THEME.red : "#3b82f6",
          boxShadow: `0 0 14px ${
            v.status === "maintenance" 
              ? "rgba(239,68,68,0.45)" 
              : "rgba(59,130,246,0.35)"
          }`,
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          h: 40,
          w: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          background: THEME.bg,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <SafeIcon
          name={v.type === "drone" ? "Plane" : v.type === "fire-truck" ? "Truck" : v.type === "ambulance" ? "Ambulance" : "Car"}
          className="h-5 w-5"
          style={{ color: THEME.red }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ color: THEME.text, fontWeight: 600 }} noWrap>{v.name}</Typography>
        <Box mt={0.5}><StatusChip status={v.status} /></Box>

        {/* Battery Visualization */}
        {v.type === "drone" && v.battery !== undefined && (
          <Box mt={1}>
            <Typography variant="caption" sx={{ color: THEME.faded }}>
              Battery: {v.battery}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={v.battery}
              color={v.battery < 20 ? "error" : v.battery < 50 ? "warning" : "success"}
              sx={{ height: 5, borderRadius: 1, mt: 0.5 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Vehicles Panel */}
      <Card sx={{ background: THEME.card, border: `1px solid ${THEME.border}` }}>
        <CardHeader
          title={
            <Box className="flex items-center gap-2">
              <SafeIcon name="Truck" className="h-5 w-5" style={{ color: THEME.red }} />
              <Typography sx={{ color: THEME.text, fontWeight: 600 }}>Station Vehicles</Typography>
            </Box>
          }
          sx={{ borderBottom: `1px solid ${THEME.border}` }}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {vehicles.length === 0 ? (
            <Typography align="center" sx={{ color: THEME.faded }}>No Vehicles Available</Typography>
          ) : vehicles.map((v) => <VehicleItem key={v.id} v={v} />)}
        </CardContent>
      </Card>

      {/* Drones Panel */}
      <Card sx={{ background: THEME.card, border: `1px solid ${THEME.border}` }}>
        <CardHeader
          title={
            <Box className="flex items-center gap-2">
              <SafeIcon name="Plane" className="h-5 w-5" style={{ color: THEME.red }} />
              <Typography sx={{ color: THEME.text, fontWeight: 600 }}>Available Drones</Typography>
            </Box>
          }
          sx={{ borderBottom: `1px solid ${THEME.border}` }}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {drones.length === 0 ? (
            <Typography align="center" sx={{ color: THEME.faded }}>No Drones Active</Typography>
          ) : drones.map((d) => <VehicleItem key={d.id} v={d} />)}
        </CardContent>
      </Card>
    </Box>
  );
}
