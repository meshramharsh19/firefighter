// SelectionSummary.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function SelectionSummary({
  selectedVehicles = [],
  selectedDrones = [],
  canActivate = false,
  onActivate = () => {},
  onBack = () => {},
}) {
  const totalDistance = selectedVehicles.reduce(
    (acc, v) => acc + (v.distanceKm || 0),
    0
  );

  const maxEta = Math.max(
    ...[
      ...selectedVehicles.map((v) => v.etaMinutes || 0),
      ...selectedDrones.map((d) => d.etaMinutes || 0),
    ]
  );

  return (
    <Card
      sx={{
        borderRadius: "18px",
        background: "#141414",
        border: "1px solid #222",
        p: 1,
      }}
    >
      <CardContent sx={{ px: 3, py: 2 }}>
        {/* TITLE */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 0.5, fontSize: "1.3rem" }}
        >
          Selection Summary
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Review your asset selection
        </Typography>

        {/* Counters */}
        <SummaryBox
          icon={<LocalShippingIcon />}
          label="Vehicle(s)"
          count={selectedVehicles.length}
        />
        <SummaryBox
          icon={<FlightIcon />}
          label="Drone(s)"
          count={selectedDrones.length}
        />
        <SummaryBox
          icon={<GroupIcon />}
          label="Crew Member(s)"
          count={selectedVehicles.reduce(
            (acc, v) => acc + (v.crew?.length || 0),
            0
          )}
          last
        />

        <Divider sx={{ my: 2.5, borderColor: "#2c2c2c" }} />

        {/* Distance */}
        <FlexRow label="Total Distance" value={`${totalDistance.toFixed(1)} km`} />
        <FlexRow label="Max ETA" value={`${maxEta} minutes`} />

        <Divider sx={{ my: 2.5, borderColor: "#2c2c2c" }} />

        {/* Selected Vehicles */}
        <SectionHeader text="SELECTED VEHICLES" />
        {selectedVehicles.map((v) => (
          <SelectedItem
            key={v.id}
            name={v.name}
            rightLabel={`${v.etaMinutes || 0}m`}
          />
        ))}

        {/* Selected Drones */}
        <SectionHeader text="SELECTED DRONE(S)" />
        {selectedDrones.map((d) => (
          <SelectedItem
            key={d.id}
            name={d.name}
            rightLabel={`${d.battery || 0}%  ${d.etaMinutes || "—"}m`}
          />
        ))}

        {/* READY / WARNING BOX */}
        <StatusBox canActivate={canActivate} />

        {/* Buttons */}
        <Button
          variant="contained"
          color="error"
          disabled={!canActivate}
          onClick={onActivate}
          fullWidth
          sx={{
            py: 1.5,
            mt: 3,
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: 0.5,
          }}
        >
          ⚡ ACTIVATE DRONE
        </Button>

        <Button
          variant="outlined"
          onClick={onBack}
          fullWidth
          sx={{
            py: 1.2,
            mt: 1.5,
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#ddd",
            borderColor: "#444",
          }}
        >
          ← Back
        </Button>
      </CardContent>
    </Card>
  );
}

/* ---------------------- Components ---------------------- */

function SummaryBox({ icon, label, count, last }) {
  return (
    <Box
      sx={{
        border: "1px solid #2b2b2b",
        borderRadius: "10px",
        px: 2,
        py: 1.5,
        mb: last ? 2 : 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1a1a1a",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
        {icon}
        <Typography fontWeight={600}>{label}</Typography>
      </Box>

      <Chip
        label={count}
        sx={{
          background: "rgba(255,255,255,0.07)",
          color: "#ddd",
          fontWeight: 700,
          borderRadius: "8px",
        }}
        size="small"
      />
    </Box>
  );
}

function FlexRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={700}>{value}</Typography>
    </Box>
  );
}

function SectionHeader({ text }) {
  return (
    <Typography
      variant="overline"
      sx={{ color: "#aaa", mb: 1, display: "block", fontSize: "0.75rem" }}
    >
      {text}
    </Typography>
  );
}

function SelectedItem({ name, rightLabel }) {
  return (
    <Box
      sx={{
        border: "1px solid #2d2d2d",
        borderRadius: "8px",
        px: 2,
        py: 1,
        mb: 1,
        background: "#1b1b1b",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography fontWeight={600}>{name}</Typography>
      <Typography color="text.secondary">{rightLabel}</Typography>
    </Box>
  );
}

function StatusBox({ canActivate }) {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "10px",
        border: `1px solid ${
          canActivate ? "rgba(0,255,0,0.35)" : "rgba(255,180,0,0.35)"
        }`,
        background: canActivate
          ? "rgba(0,180,0,0.15)"
          : "rgba(255,180,0,0.1)",
        display: "flex",
        gap: 2,
      }}
    >
      {canActivate ? (
        <CheckCircleIcon sx={{ color: "#27C47A" }} />
      ) : (
        <WarningAmberIcon sx={{ color: "#F3C241" }} />
      )}

      <Box>
        <Typography
          fontWeight={700}
          sx={{ color: canActivate ? "#27C47A" : "#F3C241" }}
        >
          {canActivate ? "Ready to Activate" : "Cannot Activate"}
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {canActivate
            ? "All requirements met. Click activate to proceed."
            : "Select required assets before activation."}
        </Typography>
      </Box>
    </Box>
  );
}
