// ---------- INCIDENT DATA (NO TYPESCRIPT) ----------

export const IncidentStatus = {
  New: "new",
  Assigned: "assigned",
  InProgress: "in-progress",
  Closed: "closed",
};

export const INCIDENT_LIST_FEED = [
  {
    id: "INC-20251120-003",
    name: "Major Structural Fire - Downtown",
    location: "False Street A-123, Commercial District",
    coordinates: { lat: 34.0531, lng: -118.245, locationName: "False Street A-123" },
    timeReported: "2025-11-20T10:35:00Z",
    status: IncidentStatus.New,
    isNewAlert: true,
  },
  {
    id: "INC-20251120-002",
    name: "Severe Traffic Accident",
    location: "KM 45 West Highway, near Bridge",
    coordinates: { lat: 34.07, lng: -118.3, locationName: "West Highway (KM 45)" },
    timeReported: "2025-11-20T09:12:00Z",
    status: IncidentStatus.InProgress,
    isNewAlert: false,
    acknowledgedBy: "Station B",
  },
  {
    id: "INC-20251120-001",
    name: "Gas Leak in Residence",
    location: "Residential Ave 501, Apartment 2B",
    coordinates: { lat: 34.06, lng: -118.26, locationName: "Residential Ave 501" },
    timeReported: "2025-11-20T08:05:00Z",
    status: IncidentStatus.Closed,
    isNewAlert: false,
  },
];
