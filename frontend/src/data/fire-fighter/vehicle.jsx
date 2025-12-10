// ------------ ENUM LIKE CONSTANTS (NO TYPESCRIPT) ------------

export const VehicleStatus = {
  Available: "Disponible",
  EnRoute: "En Ruta",
  Busy: "Ocupado",
  UnderMaintenance: "En Mantenimiento",
};

export const VehicleType = {
  Pumper: "Camión Bomba",
  Ladder: "Camión Escalera",
  Rescue: "Rescate",
};

export const DroneStatus = {
  Available: "Disponible",
  Busy: "Ocupado en Misión",
  Maintenance: "En Mantenimiento",
  Charging: "Cargando",
};

// ------------ STATIC FLEET DATA (PURE JS) ------------

export const STATION_VEHICLES = [
  {
    id: "VCL-101",
    name: "Pumper 1",
    vehicleType: VehicleType.Pumper,
    status: VehicleStatus.Available,
    stationId: "STN-A-001",
    iconName: "Truck",
    crew: [{ id: "C-1", name: "R. Kumar", role: "Comandante" }],
  },
  {
    id: "VCL-102",
    name: "Ladder 2",
    vehicleType: VehicleType.Ladder,
    status: VehicleStatus.EnRoute,
    stationId: "STN-A-001",
    iconName: "HardHat",
    crew: [{ id: "C-2", name: "A. Sharma", role: "Conductor" }],
  },
  {
    id: "VCL-103",
    name: "Rescue 3",
    vehicleType: VehicleType.Rescue,
    status: VehicleStatus.UnderMaintenance,
    stationId: "STN-A-001",
    iconName: "Wrench",
    crew: [],
  },
];

// ------------ AVAILABLE DRONES ------------

export const AVAILABLE_DRONES = [
  {
    id: "DRN-X1",
    name: "Skyeye Tactical",
    status: DroneStatus.Available,
    batteryPercent: 95,
    iconName: "Dna",
  },
  {
    id: "DRN-X2",
    name: "Fire Scout",
    status: DroneStatus.Busy,
    batteryPercent: 30,
    iconName: "SquareDot",
  },
];

// ------------ DRONES / VEHICLES NEAR INCIDENT ------------

export const NEARBY_ASSETS = {
  vehicles: [
    {
      id: "VCL-101",
      name: "Pumper 1 (Propia)",
      vehicleType: VehicleType.Pumper,
      status: VehicleStatus.Available,
      stationId: "STN-A-001",
      iconName: "Truck",
      distanceKm: 2.5,
      etaMinutes: 5,
      currentLocation: { lat: 34.0522, lng: -118.2437, locationName: "Estación Central" },
      isSelected: false,
      crew: [{ id: "C-1", name: "R. Kumar", role: "Comandante" }],
    },
    {
      id: "VCL-305",
      name: "Rescue 5 (Est. B)",
      vehicleType: VehicleType.Rescue,
      status: VehicleStatus.Available,
      stationId: "STN-B-002",
      iconName: "HardHat",
      distanceKm: 4.1,
      etaMinutes: 8,
      currentLocation: { lat: 34.07, lng: -118.28, locationName: "Estación B" },
      isSelected: true,
      crew: [{ id: "C-3", name: "L. Singh", role: "Operador BPS" }],
    },
  ],

  drones: [
    {
      id: "DRN-X1",
      name: "Skyeye Tactical",
      status: DroneStatus.Available,
      batteryPercent: 95,
      iconName: "Dna",
      distanceKm: 1.2,
      etaMinutes: 3,
      currentLocation: { lat: 34.06, lng: -118.25, locationName: "Tejado del Distrito" },
      isSelected: true,
    },
  ],

  stations: [
    {
      stationId: "STN-B-002",
      stationName: "KAtraj Fire Station",
      distanceKm: 4.1,
      etaMinutes: 8,
      availableVehicles: 2,
      busyVehicles: 1,
      location: { lat: 34.07, lng: -118.28, locationName: "Estación B" },
    },
    {
      stationId: "STN-C-003",
      stationName: "Aundh Station",
      distanceKm: 7.8,
      etaMinutes: 14,
      availableVehicles: 1,
      busyVehicles: 2,
      location: { lat: 34.1, lng: -118.3, locationName: "Estación C" },
    },
    {
      stationId: "STN-D-004",
      stationName: "Baner Station",
      distanceKm: 12.0,
      etaMinutes: 20,
      availableVehicles: 3,
      busyVehicles: 0,
      location: { lat: 34.15, lng: -118.35, locationName: "Estación D" },
    },
  ],
};
