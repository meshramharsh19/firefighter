// No TypeScript types — using plain JavaScript objects only.

// --- Data Collections ---

export const MOCK_DRONES = [
  {
    id: "DRN-001",
    name: "SkyWatcher Alpha",
    serialNumber: "SW-A-74892",
    wardAllocation: "Ward 12 - West Industrial",
    batteryPercentage: 92,
    flightHours: 45.3,
    lastMissionDetails: "Pergantian shift, siaga.",
    healthStatus: "Optimal",
    firmwareVersion: "v2.1.0",
    pilotAssigned: { id: "U-102", name: "Joko Santoso", role: "Pilot Drone" },
    status: "Standby",
    currentLocation: { lat: -6.1754, lng: 106.8272 },
    lastMaintenanceDate: "2025-11-01",
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/d958f5f5-6ddf-4f69-8ee8-55b11e8cf148.png",
  },

  {
    id: "DRN-005",
    name: "FireEye 2.0",
    serialNumber: "FE-2-19301",
    wardAllocation: "Ward 05 - Commercial Hub",
    batteryPercentage: 45,
    flightHours: 198.1,
    lastMissionDetails:
      "Aktif dalam misi insiden, sedang pengisian baterai.",
    healthStatus: "Requires Service",
    firmwareVersion: "v1.9.5",
    pilotAssigned: { id: "U-105", name: "Lia Kurniawan", role: "Pilot Drone" },
    status: "Maintenance",
    currentLocation: { lat: -6.2088, lng: 106.8456 },
    lastMaintenanceDate: "2025-09-15",
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/e4a31bc2-dbac-4522-bb23-b7feec4ad626.png",
  },

  {
    id: "DRN-010",
    name: "Rapid Scout",
    serialNumber: "RS-10-8812",
    wardAllocation: "Ward 18 - Residential Area",
    batteryPercentage: 78,
    flightHours: 12.0,
    lastMissionDetails: "Patroli rutin, lokasi terakhir di stasiun.",
    healthStatus: "Optimal",
    firmwareVersion: "v2.1.5",
    pilotAssigned: { id: "U-110", name: "Ahmad Rizky", role: "Pilot Drone" },
    status: "Active",
    currentLocation: { lat: -6.2146, lng: 106.9113 },
    lastMaintenanceDate: "2025-11-15",
    imageUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/d6fa6532-6da6-4d0c-b6cc-975c5ce5baae.png",
  },
];

export const MOCK_DRONE_LOGS = [
  {
    timestamp: "2025-11-19T08:00:00Z",
    activity: "Pemeriksaan Pra-penerbangan",
    pilotName: "Joko Santoso",
    notes: "Semua sistem hijau.",
  },
  {
    timestamp: "2025-11-19T14:30:00Z",
    activity: "Penerbangan Misi Rutin",
    pilotName: "Joko Santoso",
    notes: "Penerbangan 3 jam di Ward 12. Baterai sisa 50%.",
  },
  {
    timestamp: "2025-11-20T09:00:00Z",
    activity: "Pencabutan dari Misi",
    pilotName: "Lia Kurniawan",
    notes: "Ditarik karena masalah sensor pada kamera termal.",
  },
];

export const MOCK_DRONE_MONITORING_MAP = {
  url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/5f115713-082e-4157-8cad-861d53d9f8dc.png",
  alt: "Peta monitoring drone",
};
