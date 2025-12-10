import React, { useState } from "react";
import { Eye, List, ArrowUpDown } from "lucide-react";
import {
  Box, Card, CardContent, CardHeader, Typography,
  Table, TableBody, TableCell, TableHead, TableRow,
  TableSortLabel, Chip, Button, Alert
} from "@mui/material";

// -------------------------- Status Pill --------------------------
const StatusChip = ({ status }) => {
  const variants = {
    new:{bg:"rgba(255,50,50,0.25)",color:"#ff5252",label:"New"},
    "in-progress":{bg:"rgba(255,153,0,0.25)",color:"#ffa726",label:"In Progress"},
    assigned:{bg:"rgba(0,123,255,0.25)",color:"#42a5f5",label:"Assigned"},
    closed:{bg:"rgba(128,0,255,0.25)",color:"#b388ff",label:"Closed"}
  };
  const s = variants[status] || {bg:"#333", color:"#eee", label:status};
  return <Chip size="small" label={s.label} sx={{background:s.bg,color:s.color,fontWeight:"bold"}} />;
};

// -------------------------- Table Component --------------------------
function IncidentTableComponent({ incidents, onViewDetails }) {
  const [sortField, setSortField] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) =>{
    if(sortField === field) setSortDirection(sortDirection==="asc"?"desc":"asc");
    else { setSortField(field); setSortDirection("asc"); }
  };

  const sorted = [...incidents].sort((a,b)=>{
    const mod = sortDirection==="asc"?1:-1;
    return typeof a[sortField]==="string"
      ? a[sortField].localeCompare(b[sortField])*mod
      : (a[sortField]>b[sortField]?mod:-mod);
  });

  const columns = [
    {id:"id",label:"Incident ID"},
    {id:"name",label:"Name"},
    {id:"location",label:"Location"},
    {id:"coordinates",label:"Coordinates",sortable:false},
    {id:"time",label:"Time"},
    {id:"status",label:"Status"},
    {id:"actions",label:"Actions",sortable:false},
  ];

  return (
    <Card sx={{background:"#121314",border:"1px solid #1e1f22",color:"#eaeaea"}}>
      <CardHeader title={
        <Typography sx={{display:"flex",gap:1,alignItems:"center",fontWeight:600}}>
          <List size={18}/> Incident Stream
        </Typography>}
      />

      <CardContent sx={{p:0}}>
        <Box sx={{overflowX:"auto"}}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{background:"#1b1c1e"}}>
                {columns.map(col=>(
                  <TableCell key={col.id}
                    sx={{fontWeight:600,cursor:col.sortable===false?"default":"pointer"}}
                    onClick={()=>col.sortable!==false && handleSort(col.id)}>
                    <Box sx={{display:"flex",alignItems:"center",gap:1}}>
                      {col.label}
                      {col.sortable!==false &&
                        <TableSortLabel active={sortField===col.id} direction={sortDirection}
                          IconComponent={()=> <ArrowUpDown size={12}/>} />}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>

              {(sorted.length===0) && (
                <TableRow><TableCell colSpan={7} align="center" sx={{p:4}}>
                  <Alert severity="info">No incidents found</Alert>
                </TableCell></TableRow>
              )}

              {sorted.map(i=>(
                <TableRow key={i.id} hover sx={{"&:hover":{background:"#222427"}}}>
                  <TableCell>{i.id}</TableCell>
                  <TableCell sx={{maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{i.name}</TableCell>
                  <TableCell sx={{maxWidth:210,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{i.location}</TableCell>

                  {/* 🔥 FIXED SAFELY — no more toFixed crash */}
                  <TableCell sx={{fontSize:12}}>
                    { Number(i.latitude) ? Number(i.latitude).toFixed(4) : "-" },{" "}
                    { Number(i.longitude) ? Number(i.longitude).toFixed(4) : "-" }
                  </TableCell>

                  <TableCell>{i.time}</TableCell>
                  <TableCell><StatusChip status={i.status}/></TableCell>

                  <TableCell>
                    <Button size="small" variant="outlined"
                      startIcon={<Eye size={14}/>}
                      onClick={()=>onViewDetails(i.id)}
                      sx={{textTransform:"none",borderColor:"#3b82f6",color:"#3b82f6",
                          "&:hover":{background:"rgba(59,130,246,0.15)"}}}>
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

// -------------------------- Export Wrapper --------------------------
export default function IncidentStreamTable({ incidents }) {
  return (
    <IncidentTableComponent
      incidents={incidents}
      onViewDetails={(id)=>window.location.href=`/incident-details?id=${id}`}
    />
  );
}
