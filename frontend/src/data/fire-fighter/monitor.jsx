// --- VTS Monitoring ---

export const LIVE_VTS_DATA = {
  mapUrl:
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/22550d48-cdab-4b60-ac64-b48eb6a5b88b.png",
  trackedVehicles: [
    {
      vehicleId: "VCL-101",
      routeName: "Ruta Principal (Rápida)",
      speedKph: 55,
      etaMinutes: 2,
      status: "En-Route",
      location: {
        lat: 34.0535,
        lng: -118.2455,
        locationName: "Cruce 1st Street",
      },
    },
    {
      vehicleId: "VCL-305",
      routeName: "Ruta Secundaria (Lenta)",
      speedKph: 30,
      etaMinutes: 6,
      status: "En-Route",
      location: {
        lat: 34.061,
        lng: -118.243,
        locationName: "Callejones del Mercado",
      },
    },
  ],
};

// --- Drone Monitoring ---

export const LIVE_DRONE_FLIGHT = {
  droneId: "DRN-X1",
  batteryPercent: 88,
  altitudeMeters: 45,
  speedKph: 15,
  missionProgress: "Streaming Activo",
  currentLocation: {
    lat: 34.05315,
    lng: -118.2451,
    locationName: "Sobre el edificio incidente",
  },
  flightPathPoints: [
    { lat: 34.053, lng: -118.244, locationName: "Launch" },
    { lat: 34.0535, lng: -118.2445, locationName: "Midpoint" },
    { lat: 34.05315, lng: -118.2451, locationName: "Current" },
  ],
};

export const LIVE_DRONE_CAMERA = {
  droneId: "DRN-X1",
  liveFeedUrl:
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/97bd59bd-080d-4739-b4c3-a4a01f1b5b4a.png",
  isInfraredActive: false,
  zoomLevel: 1.5,
  isRecording: true,
  snapshotIcon: "Camera",
};

// --- Digital Twin ---

export const LIVE_DIGITAL_TWIN = {
  dtAssetId: "DT-BLDG-112",
  modelRenderUrl:
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/8ecc4b99-06c5-4a1e-9675-d3d3699b27b8.png",
  fireLocationFloor: 3,
  windDirection: "Noroeste (15 kph)",
  hazards: [
    {
      type: "Compromiso Estructural",
      locationFloor: 4,
      status: "Potencial",
    },
    {
      type: "Línea Eléctrica",
      locationFloor: 0,
      status: "Confirmado",
    },
  ],
};
