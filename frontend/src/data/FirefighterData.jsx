// --- No TypeScript imports or types ---
// Converted to pure JavaScript objects.

// --- Data Collections ---

export const FIRE_FIGHTER_LOGIN_BACKGROUND = {
  url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/73bbcd8d-b983-4660-af38-faa9796b3102.png",
  alt: "Latar belakang login petugas pemadam kebakaran",
};

export const FIRE_FIGHTER_SUMMARY = [
  { id: "today", label: "Insiden Hari Ini", count: 7, iconName: "CloudSun", colorClass: "text-red-500" },
  { id: "monthly", label: "Insiden Bulan Ini", count: 89, iconName: "CalendarDays", colorClass: "text-yellow-500" },
  { id: "active", label: "Insiden Aktif", count: 3, iconName: "MapPin", colorClass: "text-red-700" },
  { id: "pending", label: "Menunggu Pengakuan", count: 1, iconName: "BellRing", colorClass: "text-pink-500" },
];

export const MOCK_INCIDENTS = [
  {
    id: "INC-20250101-04",
    name: "Kebakaran Gudang Kimia",
    type: "HAZMAT",
    location: "Jl. Merdeka No. 15, Kawasan Industri Timur",
    coordinates: { lat: -6.1800, lng: 106.8400 },
    timeReported: "2025-11-20T11:45:00Z",
    status: "New",
    severity: "Critical",
    description:
      "Api besar terlihat dari Gudang C, diduga ada bahan kimia mudah terbakar. Memerlukan penanganan khusus dan mobil busa.",
    caller: { name: "Iwan Setiawan (Pekerja)", phone: "0812-3334-5555" },
    imageUrls: [
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/187cd947-ff2f-4c7e-ae5c-dbcfadbb9d12.png",
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/d25b9949-b0b1-44b0-8df7-5ffdb061e1ee.png",
    ],
    cctvFeedUrl:
      "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/0d3dc8bc-ec5d-4f26-a52a-e7fbbe44f1e1.png",
  },

  {
    id: "INC-20250101-05",
    name: "Kecelakaan Beruntun Tol Cipularang KM 90",
    type: "Kecelakaan",
    location: "Tol KM 90, dekat Gerbang Jakarta 2",
    coordinates: { lat: -6.2100, lng: 106.8000 },
    timeReported: "2025-11-20T10:00:00Z",
    status: "Assigned",
    severity: "High",
    description:
      "Tabrakan berantai melibatkan 5 mobil di jalur cepat. Ada korban terjebak di dalam kendaraan.",
    caller: { name: "Operator Tol", phone: "021-9999-0000" },
    imageUrls: [],
    acknowledgedBy: "Agus Sutanto",
  },
];

export const MOCK_LOCAL_VEHICLE_STATUS = [
  {
    id: "FT-001",
    plate: "B 1234 ZZZ",
    type: "Fire Tender",
    status: "Available",
    distanceKm: 0.5,
    ETA: "1 min",
  },
  {
    id: "AMB-005",
    plate: "B 5050 MED",
    type: "Ambulance",
    status: "Busy",
    distanceKm: 5.2,
    ETA: "15 min",
  },
  {
    id: "QRV-010",
    plate: "B 7777 QRV",
    type: "Quick Response Vehicle",
    status: "Maintenance",
  },
];

export const MOCK_DRONE_AVAILABILITY = [
  {
    id: "DRN-010",
    name: "Rapid Scout",
    status: "Available",
    batteryPercentage: 78,
    distanceKm: 1.2,
    pilotAssigned: "Joko S.",
  },
  {
    id: "DRN-005",
    name: "FireEye 2.0",
    status: "Maintenance",
    batteryPercentage: 45,
  },
];

export const MOCK_SUGGESTED_STATIONS = [
  { stationName: "Stasiun Kebakaran Utara (Satuan 1)", distanceKm: 4.5, ETA: "8 min" },
  { stationName: "Pos Bantuan Ward 15", distanceKm: 6.8, ETA: "12 min" },
  { stationName: "Markas Utama Kota", distanceKm: 10.1, ETA: "18 min" },
];

// --- Live Command Data ---

export const MOCK_VTS_DATA = {
  vehicleId: "FT-001",
  currentSpeedKpH: 65,
  ETA: "4 min 30 sec",
  statusMessage: "En-route, 90% optimized route.",
  routeCoordinates: [
    { lat: -6.2297, lng: 106.8650 },
    { lat: -6.2000, lng: 106.8500 },
    { lat: -6.1800, lng: 106.8400 },
  ],
};

export const MOCK_DRONE_TELEMETRY = {
  droneId: "DRN-010",
  altitudeMeters: 55,
  batteryPercentage: 65,
  signalStrength: 98,
  missionStatus: "Mapping Structure",
  currentLocation: { lat: -6.1805, lng: 106.8405 },
};

export const MOCK_INCIDENT_MAP_LOCATION = {
  url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/ad601701-6daf-4916-b7b9-528b6bb7a3dd.png",
  alt: "Peta lokasi insiden untuk penyesuaian",
};

export const MOCK_DRONE_ACTIVATION_MAP = {
  url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/72f0f27b-7c88-47ce-8b63-d15f5a86d938.png",
  alt: "Tampilan 3D Digital Twin insiden",
};

export const MOCK_LIVE_COMMAND_PANELS = {
  vts_map: {
    url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/7304f2e2-84a4-4a76-b0b4-d768c4137fd0.png",
    alt: "Peta VTS Lokasi Kendaraan Langsung",
  },
  drone_location: {
    url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/420cfbae-3bf5-49df-b931-2b2b2845c9cb.png",
    alt: "Lokasi Drone dan Telemetri",
  },
  drone_camera: {
    url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/c558fcd1-61ab-4f25-8880-9f5634028f98.png",
    alt: "Umpan Kamera Drone Langsung (Termal)",
  },
  digital_twin: {
    url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/76a1d808-a8f6-4590-a62a-d0c8f92e96c8.png",
    alt: "Visualisasi Kembaran Digital 3D",
  },
};
