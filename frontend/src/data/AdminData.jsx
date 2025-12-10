// No TypeScript types, only plain JS objects

// --- Data Collections ---

export const ADMIN_SIDEBAR_NAVIGATION = [
  { id: "live_monitoring", label: "Pengawasan Langsung", url: "/admin/monitoring", iconName: "LayoutDashboard" },
  { id: "vehicles", label: "Kendaraan", url: "/admin/assets?type=vehicles", iconName: "Truck" },
  { id: "drones", label: "Drone", url: "/admin/monitoring/drones", iconName: "Aperture" },
  { id: "sops", label: "SOP", url: "/admin/sops", iconName: "FileText" },
  { id: "users_roles", label: "Pengguna & Peran", url: "/admin/users-roles", iconName: "Users" },
  { id: "logs", label: "Log Audit", url: "/admin/logs", iconName: "ScrollText" },
];

export const ADMIN_DASHBOARD_SUMMARY = [
  { id: "drones", title: "Total Drone", value: 12, iconName: "Aperture", colorClass: "text-blue-400 bg-blue-900/50" },
  { id: "incidents", title: "Insiden Aktif", value: 3, iconName: "AlertTriangle", colorClass: "text-red-400 bg-red-900/50" },
  { id: "vehicles", title: "Kendaraan Tersedia", value: 18, iconName: "Truck", colorClass: "text-green-400 bg-green-900/50" },
];

export const MOCK_AUDIT_LOGS = [
  {
    id: "LOG-001",
    timestamp: "2025-11-20T10:00:00Z",
    activityType: "Login Pengguna",
    user: { name: "Rina Sari", role: "Administrator Utama" },
    details: "Login berhasil dari IP 192.168.1.5",
    status: "Active",
  },
  {
    id: "LOG-002",
    timestamp: "2025-11-20T10:15:30Z",
    activityType: "Aktivasi Drone",
    user: { name: "Bambang W.", role: "Operator" },
    details: "Drone DRN-005 diaktifkan untuk Insiden INC-20250101-04",
    target: "DRN-005",
    status: "Active",
  },
  {
    id: "LOG-003",
    timestamp: "2025-11-20T11:05:00Z",
    activityType: "Persetujuan Insiden",
    user: { name: "Dewi Puspita", role: "Petugas Pemadam Kebakaran" },
    details: "Insiden INC-20250101-05 disetujui untuk pengerahan",
    target: "INC-20250101-05",
    status: "In-Progress",
  },
  {
    id: "LOG-004",
    timestamp: "2025-11-20T11:30:00Z",
    activityType: "Penugasan Kendaraan",
    user: { name: "Rina Sari", role: "Administrator Utama" },
    details: "Menugaskan Fire Tender FT-012 ke Stasiun Kebakaran Pusat",
    target: "FT-012",
    status: "Available",
  },
];

export const MOCK_LIVE_DRONE_MAP_IMAGE = {
  url: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/e1a94ab7-2776-4227-aace-1c14dca7d8bf.png",
  alt: "Peta pengawasan drone langsung",
};
