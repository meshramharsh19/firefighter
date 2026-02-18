import React, { useState, useMemo } from "react";
import { Eye, List, ArrowUpDown } from "lucide-react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Chip,
  Button,
  Alert,
  Stack,
} from "@mui/material";


const StatusChip = ({ status }) => {
  const variants = {
    new: { bg: "rgba(255,50,50,0.25)", color: "#ff5252", label: "New" },
    "in-progress": {
      bg: "rgba(255,153,0,0.25)",
      color: "#ffa726",
      label: "In Progress",
    },
    assigned: {
      bg: "rgba(0,123,255,0.25)",
      color: "#42a5f5",
      label: "Assigned",
    },
    closed: { bg: "rgba(128,0,255,0.25)", color: "#b388ff", label: "Closed" },
    active: { bg: "rgba(255,0,0,0.25)", color: "#ff5252", label: "Active" },
  };
  const s = variants[status] || { bg: "#333", color: "#eee", label: status };
  return (
    <Chip
      size="small"
      label={s.label}
      sx={{ background: s.bg, color: s.color, fontWeight: "bold" }}
    />
  );
};


function IncidentTableComponent({ incidents, onViewDetails, filter, onFilterChange }) {
  const [sortField, setSortField] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredIncidents = useMemo(() => {
    const now = new Date();
    const todayStr =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");

    const monthStr = todayStr.slice(0, 7);

    return incidents.filter((i) => {
      if (!i.timeReported) return false;

      const incidentDate = i.timeReported.split(" ")[0];
      const status = i.status;

      if (filter === "today") return incidentDate === todayStr;
      if (filter === "month") return incidentDate.startsWith(monthStr);
      if (filter === "active") return status === "active";
      if (filter === "critical") return status === "new";

      return true;
    });
  }, [filter, incidents]);

  const sorted = [...filteredIncidents].sort((a, b) => {
    const mod = sortDirection === "asc" ? 1 : -1;
    return typeof a[sortField] === "string"
      ? a[sortField].localeCompare(b[sortField]) * mod
      : a[sortField] > b[sortField]
      ? mod
      : -mod;
  });

  const columns = [
    { id: "id", label: "Incident ID" },
    { id: "name", label: "Name" },
    { id: "location", label: "Location" },
    { id: "coordinates", label: "Coordinates", sortable: false },
    { id: "time", label: "Time" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", sortable: false },
  ];

  return (
    <Card
      sx={{
        background: "#121314",
        border: "1px solid #1e1f22",
        color: "#eaeaea",
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <List size={18} /> Incident Stream
          </Typography>
        }
        subheader={
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {[
              { id: "all", label: "All" },
              { id: "today", label: "Today" },
              { id: "month", label: "This Month" },
              { id: "active", label: "Active" },
              { id: "critical", label: "Critical Alerts" },
            ].map((b) => (
              <Button
                key={b.id}
                size="small"
                variant={filter === b.id ? "contained" : "outlined"}
                onClick={() => onFilterChange(b.id)}
                sx={{
                  textTransform: "none",
                  borderColor: "#2E2E2E",
                  color: filter === b.id ? "#fff" : "#e5e7eb",
                  backgroundColor: filter === b.id ? "#dc2626" : "transparent",

                  "&:hover": {
                    borderColor: "#dc2626",
                    backgroundColor:
                      filter === b.id
                        ? "#b91c1c" 
                        : "rgba(220,38,38,0.15)", 
                    color: "#fff",
                  },
                }}
              >
                {b.label}
              </Button>
            ))}
          </Stack>
        }
      />

      <CardContent sx={{ p: 0 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    onClick={() => col.sortable !== false && handleSort(col.id)}
                    sx={{ fontWeight: 600 }}
                  >
                    {col.label}
                    {col.sortable !== false && (
                      <TableSortLabel
                        active={sortField === col.id}
                        direction={sortDirection}
                        IconComponent={() => <ArrowUpDown size={12} />}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ p: 4 }}>
                    <Alert severity="info">No incidents found</Alert>
                  </TableCell>
                </TableRow>
              )}

              {sorted.map((i) => (
                <TableRow key={i.id} hover>
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.location}</TableCell>

                  <TableCell sx={{ fontSize: 12 }}>
                    {Number(i.latitude) ? Number(i.latitude).toFixed(4) : "-"},
                    {Number(i.longitude) ? Number(i.longitude).toFixed(4) : "-"}
                  </TableCell>

                  <TableCell>{i.timeReported}</TableCell>
                  <TableCell>
                    <StatusChip status={i.status} />
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<Eye size={14} />}
                      onClick={() => onViewDetails(i.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}


export default function IncidentStreamTable({ incidents,filter, onFilterChange, }) {
  return (
   <IncidentTableComponent
      incidents={incidents}
      filter={filter}
      onFilterChange={onFilterChange}
      onViewDetails={(id) =>
        (window.location.href = `/incident-details?id=${id}`)
      }
    />
  );
}
