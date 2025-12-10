// Helper to create a vehicle object (optional but clean)
export const createVehicle = (vehicle) => ({
  id: vehicle.id,
  name: vehicle.name,
  type: vehicle.type,
  registrationNumber: vehicle.registrationNumber,
  vtsDeviceId: vehicle.vtsDeviceId,
  location: vehicle.location,
  latitude: vehicle.latitude,
  longitude: vehicle.longitude,
  ward: vehicle.ward,
  status: vehicle.status,
  assignedCrew: vehicle.assignedCrew || [],
  lastUpdated: vehicle.lastUpdated,
  batteryLevel: vehicle.batteryLevel,
  fuelLevel: vehicle.fuelLevel,
  maintenanceStatus: vehicle.maintenanceStatus
});

// --- Mock Data (Converted to plain JS) ---

export const vehiclesMockData = [
  createVehicle({
    id: "veh-001",
    name: "Fire Tender Alpha",
    type: "Fire Tender",
    registrationNumber: "DL-01-AB-1234",
    vtsDeviceId: "VTS-FT-001",
    location: "Central Fire Station",
    latitude: 28.6139,
    longitude: 77.2090,
    ward: "1",
    status: "available",
    assignedCrew: ["Rajesh Kumar", "Amit Singh"],
    lastUpdated: "2024-01-15T10:30:00Z",
    fuelLevel: 85,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-002",
    name: "Ambulance Unit 1",
    type: "Ambulance",
    registrationNumber: "DL-02-CD-5678",
    vtsDeviceId: "VTS-AMB-001",
    location: "Ward 2 Medical Center",
    latitude: 28.5355,
    longitude: 77.3910,
    ward: "2",
    status: "busy",
    assignedCrew: ["Dr. Priya Sharma", "Nurse Anita"],
    lastUpdated: "2024-01-15T10:28:00Z",
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-003",
    name: "Hydrant Vehicle 1",
    type: "Hydrant Vehicle",
    registrationNumber: "DL-03-EF-9012",
    vtsDeviceId: "VTS-HV-001",
    location: "North Zone Station",
    latitude: 28.7041,
    longitude: 77.1025,
    ward: "3",
    status: "available",
    assignedCrew: ["Vikram Patel"],
    lastUpdated: "2024-01-15T10:32:00Z",
    fuelLevel: 92,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-004",
    name: "Quick Response Vehicle 1",
    type: "Quick Response Vehicle",
    registrationNumber: "DL-04-GH-3456",
    vtsDeviceId: "VTS-QRV-001",
    location: "South Zone Station",
    latitude: 28.5244,
    longitude: 77.1855,
    ward: "4",
    status: "en-route",
    assignedCrew: ["Suresh Verma", "Deepak Rao"],
    lastUpdated: "2024-01-15T10:25:00Z",
    fuelLevel: 65,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-005",
    name: "Drone Unit Alpha",
    type: "Drone",
    registrationNumber: "DL-05-IJ-7890",
    vtsDeviceId: "VTS-DR-001",
    location: "Central Fire Station",
    latitude: 28.6139,
    longitude: 77.2090,
    ward: "1",
    status: "available",
    assignedCrew: ["Pilot Arjun Singh"],
    lastUpdated: "2024-01-15T10:31:00Z",
    batteryLevel: 95,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-006",
    name: "Support Vehicle 1",
    type: "Support Vehicle",
    registrationNumber: "DL-06-KL-2345",
    vtsDeviceId: "VTS-SV-001",
    location: "East Zone Station",
    latitude: 28.6292,
    longitude: 77.3692,
    ward: "5",
    status: "maintenance",
    assignedCrew: ["Mechanic Ravi"],
    lastUpdated: "2024-01-15T09:45:00Z",
    fuelLevel: 30,
    maintenanceStatus: "Under Maintenance - Engine Service"
  }),

  createVehicle({
    id: "veh-007",
    name: "Foam Truck 1",
    type: "Foam Truck",
    registrationNumber: "DL-07-MN-6789",
    vtsDeviceId: "VTS-FOM-001",
    location: "Industrial Zone Station",
    latitude: 28.5500,
    longitude: 77.2500,
    ward: "6",
    status: "available",
    assignedCrew: ["Captain Harish", "Operator Mohan"],
    lastUpdated: "2024-01-15T10:29:00Z",
    fuelLevel: 78,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-008",
    name: "Ladder Truck 1",
    type: "Ladder Truck",
    registrationNumber: "DL-08-OP-0123",
    vtsDeviceId: "VTS-LAD-001",
    location: "West Zone Station",
    latitude: 28.5500,
    longitude: 77.0500,
    ward: "7",
    status: "available",
    assignedCrew: ["Chief Rajesh", "Operator Sanjay"],
    lastUpdated: "2024-01-15T10:33:00Z",
    fuelLevel: 88,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-009",
    name: "Fire Tender Beta",
    type: "Fire Tender",
    registrationNumber: "DL-09-QR-4567",
    vtsDeviceId: "VTS-FT-002",
    location: "Central Fire Station",
    latitude: 28.6139,
    longitude: 77.2090,
    ward: "1",
    status: "busy",
    assignedCrew: ["Sunil Kumar", "Prakash Singh"],
    lastUpdated: "2024-01-15T10:20:00Z",
    fuelLevel: 45,
    maintenanceStatus: "Good"
  }),

  createVehicle({
    id: "veh-010",
    name: "Ambulance Unit 2",
    type: "Ambulance",
    registrationNumber: "DL-10-ST-8901",
    vtsDeviceId: "VTS-AMB-002",
    location: "Ward 3 Medical Center",
    latitude: 28.7041,
    longitude: 77.1025,
    ward: "3",
    status: "available",
    assignedCrew: ["Dr. Anil Gupta", "Nurse Meera"],
    lastUpdated: "2024-01-15T10:34:00Z",
    maintenanceStatus: "Good"
  })
];
