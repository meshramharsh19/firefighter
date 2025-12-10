// No TypeScript types — plain JavaScript objects only

// --- Data Collections ---

export const MOCK_VEHICLE_ASSETS = [
  {
    id: "FT-001",
    type: "Fire Tender",
    plate: "B 1234 ZZZ",
    gpsId: "VTS-77A",
    stationId: "Stasiun Pusat",
    lastLocation: { lat: -6.2297, lng: 106.8650 },
    availability: "Available",
    assignedCrew: [
      { id: "U-112", name: "Agus Sutanto", role: "Petugas Pemadam" },
      { id: "U-125", name: "Siska Dewi", role: "Petugas Pemadam" }
    ],
    lastMaintenanceDate: "2025-11-05",
    mileageKm: 45000,
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/dc6dc832-e5c1-474d-8219-cf8126feb5ae.png",
  },

  {
    id: "AMB-005",
    type: "Ambulance",
    plate: "B 5050 MED",
    gpsId: "VTS-50M",
    stationId: "Ward 05",
    lastLocation: { lat: -6.1952, lng: 106.8200 },
    availability: "Busy",
    assignedCrew: [
      { id: "U-201", name: "Dr. Taufik", role: "Paramedis" }
    ],
    lastMaintenanceDate: "2025-10-20",
    mileageKm: 78000,
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/c9617e80-79d0-45c5-8139-b5dc12308de4.png",
  },

  {
    id: "QRV-010",
    type: "Quick Response Vehicle",
    plate: "B 7777 QRV",
    gpsId: "VTS-10S",
    stationId: "Stasiun Pusat",
    lastLocation: { lat: -6.2297, lng: 106.8650 },
    availability: "Maintenance",
    assignedCrew: [],
    lastMaintenanceDate: "2025-11-20",
    mileageKm: 22000,
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/a8e274b5-6a04-4fe9-9666-477a4e80de39.png",
  },
];
