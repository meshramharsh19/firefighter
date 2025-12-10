import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableSortLabel,
} from "@mui/material";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SafeIcon from "@/components/common/SafeIcon";

export default function DashboardIncidentTable({ incidents = [] }) {
  const [sortField, setSortField] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");

  const COLORS = {
    card: "#17181A",
    head: "#1C1D20",
    border: "#232427",
    rowHover: "#1f2023",
    text: "#e6e6e6",
    faded: "#9aa2a7",
    red: "#EF4444",
  };

  // Status Pill Style (match global theme)
  const statusStyle = {
    new: { bg: "rgba(255,65,65,0.28)", color:"#ff6b6b" },
    assigned:{ bg:"rgba(255,165,0,0.24)", color:"#ffb347" },
    "in-progress":{ bg:"rgba(0,145,255,0.28)", color:"#5cabff" },
    closed:{ bg:"rgba(0,255,145,0.22)", color:"#48e0a4" },
  };

  const getStatusBadge = (status) => {
    const s = statusStyle[status];
    return (
      <Chip
        label={status.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}
        size="small"
        sx={{
          backgroundColor:s.bg,
          color:s.color,
          fontWeight:600,
          px:1,
          backdropFilter:"blur(4px)"
        }}
      />
    );
  };

  const handleSort = (field) =>{
    setSortDirection(sortField===field && sortDirection==="asc"?"desc":"asc");
    setSortField(field);
  };

  const sorted=[...incidents].sort((a,b)=>{
    const mod=sortDirection==="asc"?1:-1;
    return a[sortField] > b[sortField] ? mod : -mod;
  });

  const headers=[
    {id:"id",label:"Incident ID"},
    {id:"name",label:"Name"},
    {id:"location",label:"Location"},
    {id:"coordinates",label:"Coordinates"},
    {id:"time",label:"Time"},
    {id:"status",label:"Status"},
  ];

  return (
    <div className="rounded-xl p-5"
      style={{
        background:COLORS.card,
        border:`1px solid ${COLORS.border}`,
        boxShadow:"0 0 14px rgba(0,0,0,0.45)"
      }}
    >

      {/* Header */}
      <div className="pb-3 mb-4 flex items-center gap-2 border-b"
        style={{borderColor:COLORS.border}}
      >
        <SafeIcon name="List" className="h-5 w-5 text-red-500" />
        <Typography fontWeight={600} style={{color:COLORS.text}}>
          Incident Stream
        </Typography>
      </div>

      {/* Table */}
      <TableContainer>
        <Table size="small">

          <TableHead>
            <TableRow style={{background:COLORS.head}}>
              {headers.map(h=>(
                <TableCell
                  key={h.id}
                  onClick={()=>!["coordinates","location"].includes(h.id)&&handleSort(h.id)}
                  style={{
                    color:COLORS.text,
                    fontWeight:600,
                    cursor:!["coordinates","location"].includes(h.id)?"pointer":"default",
                    borderBottom:`1px solid ${COLORS.border}`,
                    userSelect:"none"
                  }}
                >
                  <Box className="flex items-center gap-1">
                    {h.label}
                    {!["coordinates","location"].includes(h.id) && (
                      <TableSortLabel
                        active={sortField===h.id}
                        direction={sortDirection}
                        sx={{"& svg":{color:sortField===h.id?COLORS.red:"#777"} }}
                      />
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>

            {sorted.length===0 &&(
              <TableRow>
                <TableCell colSpan={6} align="center" style={{padding:"25px",color:COLORS.faded}}>
                  No Incidents Found
                </TableCell>
              </TableRow>
            )}

            {sorted.map(inc=>(
              <TableRow
                key={inc.id}
                sx={{
                  borderBottom:`1px solid ${COLORS.border}`,
                  background:inc.status==="new"?"rgba(255,65,65,0.12)":"transparent",
                  transition:"0.25s",
                  "&:hover":{
                    background:COLORS.rowHover,
                    borderColor:COLORS.red,
                    boxShadow:"0 0 14px rgba(239,68,68,0.35)"
                  }
                }}
              >
                <TableCell style={{color:COLORS.text,fontFamily:"monospace",fontWeight:600}}>
                  {inc.id}
                </TableCell>

                <TableCell style={{color:COLORS.text,maxWidth:160,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>
                  {inc.name}
                </TableCell>

                <TableCell style={{color:COLORS.faded,maxWidth:200,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>
                  {inc.location}
                </TableCell>

                <TableCell style={{color:"#8f9aa3",fontFamily:"monospace",fontSize:"11px"}}>
                  {inc.latitude.toFixed(4)}, {inc.longitude.toFixed(4)}
                </TableCell>

                <TableCell style={{color:COLORS.faded,fontSize:"14px"}}>
                  {inc.time}
                </TableCell>

                <TableCell>{getStatusBadge(inc.status)}</TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
