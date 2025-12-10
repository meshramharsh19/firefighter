import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Card,
  Chip,
  Button,
} from "@mui/material";
import SafeIcon from "@/components/common/SafeIcon";

export default function IncidentTable({ incidents = [], onViewDetails }) {
  const [sortField, setSortField] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");

  const UI = {
    bg: "#121314",
    card: "#17181A",
    head: "#1C1D20",
    border: "#232426",
    hover: "#1F2124",
    text: "#E5E7EB",
    faded: "#9CA3AF",
  };

  const STATUS = {
    new: { label: "New", color: "rgba(255,60,60,0.25)", text: "#ff6b6b" },
    assigned: { label: "Assigned", color: "rgba(255,180,0,0.25)", text: "#ffb347" },
    "in-progress": { label: "In Progress", color: "rgba(0,160,255,0.25)", text: "#58a6ff" },
    closed: { label: "Closed", color: "rgba(0,255,120,0.22)", text: "#48e0a4" },
  };

  const badge = (st) => (
    <Chip
      label={STATUS[st].label}
      size="small"
      sx={{
        backgroundColor: STATUS[st].color,
        color: STATUS[st].text,
        fontWeight: 600,
      }}
    />
  );

  const handleSort = (f) => {
    setSortDirection(sortField === f && sortDirection === "asc" ? "desc" : "asc");
    setSortField(f);
  };

  const sorted = [...incidents].sort((a, b) =>
    (a[sortField] > b[sortField] ? 1 : -1) * (sortDirection === "asc" ? 1 : -1)
  );

  return (
    <Card
      sx={{
        backgroundColor: UI.card,
        border: `1px solid ${UI.border}`,
        borderRadius: "12px",
        color: UI.text,
        p: 2,
      }}
    >

      <div className="pb-3 mb-3 flex items-center gap-2 border-b" style={{ borderColor: UI.border }}>
        <SafeIcon name="List" className="text-red-500 h-5 w-5" />
        <p className="font-bold text-lg text-white">Incident Stream</p>
      </div>

      <TableContainer
        sx={{
          backgroundColor: UI.card,
        }}
      >
        <Table
          size="small"
          sx={{
            backgroundColor: UI.card,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: UI.head,
                "& th": {
                  color: UI.text,
                  fontWeight: 600,
                  borderBottom: `1px solid ${UI.border}`,
                },
              }}
            >
              {["id","name","location","coordinates","time","status","actions"].map((h) => (
                <TableCell
                  key={h}
                  onClick={() => !["location","coordinates","actions"].includes(h) && handleSort(h)}
                  sx={{ cursor: "pointer" }}
                >
                  <div className="flex items-center gap-1">
                    {h.replace("-"," ").toUpperCase()}
                    {!["location","coordinates","actions"].includes(h) && (
                      <SafeIcon name="ArrowUpDown" className="h-4 w-4 opacity-70" />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: UI.faded, py: 5 }}>
                  No incidents found
                </TableCell>
              </TableRow>
            )}

            {sorted.map((inc) => (
              <TableRow
                key={inc.id}
                sx={{
                  backgroundColor: inc.status === "new" ? "rgba(255,60,60,0.10)" : "transparent",
                  borderBottom: `1px solid ${UI.border}`,
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: UI.hover,
                    boxShadow: "0 0 10px rgba(255,60,60,0.25)",
                    borderColor: "#ff4c4c",
                  },
                }}
              >
                <TableCell sx={{ color: UI.text, fontFamily: "monospace", fontWeight: 600 }}>
                  {inc.id}
                </TableCell>

                <TableCell sx={{ color: UI.text, fontWeight: 500 }}>
                  {inc.name}
                </TableCell>

                <TableCell sx={{ color: UI.faded, maxWidth: 230 }} className="truncate">
                  {inc.location}
                </TableCell>

                <TableCell sx={{ color: UI.faded, fontFamily: "monospace", fontSize: "12px" }}>
                  {inc.latitude.toFixed(4)}, {inc.longitude.toFixed(4)}
                </TableCell>

                <TableCell sx={{ color: UI.faded }}>{inc.time}</TableCell>

                <TableCell>{badge(inc.status)}</TableCell>

                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => onViewDetails(inc.id)}
                    sx={{
                      color: "#FF5757",
                      textTransform: "none",
                      "&:hover": { textShadow: "0 0 8px #ff6b6b" },
                    }}
                  >
                    <SafeIcon name="Eye" className="mr-1 h-4 w-4" /> View
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
