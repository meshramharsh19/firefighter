// No TypeScript types. Pure JavaScript.

// List of statuses (instead of TS union type)
export const StatusTypes = [
  "Active",
  "Standby",
  "Maintenance",
  "Busy",
  "Inactive",
  "Available",
  "En-route",
  "In-Progress",
  "Closed",
  "Draft",
  "Archived",
  "Pending"
];

// Simple reusable coordinate helper
export const createLatLng = (lat, lng) => ({ lat, lng });

// Simple user summary creator (optional helper)
export const createUserSummary = (id, name, role) => ({
  id,
  name,
  role
});

