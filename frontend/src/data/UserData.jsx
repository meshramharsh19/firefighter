import { StatusTypes } from "./SharedModels";

// --- Models Converted to Simple JS Objects / Helpers ---

// Permission helper (optional)
export const createPermission = (key, name, description) => ({
  key,
  name,
  description
});

// User role helper
export const createUserRole = (id, name, description, assignedUserCount, permissions = []) => ({
  id,
  name,
  description,
  assignedUserCount,
  permissions
});

// User model helper
export const createUser = (
  id,
  name,
  email,
  phone,
  roleId,
  roleName,
  status,
  lastActivity,
  profileImageUrl
) => ({
  id,
  name,
  email,
  phone,
  roleId,
  roleName,
  status,
  lastActivity,
  profileImageUrl
});

// --- Data Collections (PURE JS) ---

export const MOCK_PERMISSIONS = [
  createPermission("drone:activate", "Aktivasi Drone", "Mengirim sinyal aktivasi dan mengendalikan misi drone."),
  createPermission("incident:approve", "Persetujuan Insiden", "Menyetujui insiden untuk pengerahan aset resmi."),
  createPermission("asset:manage", "Kelola Aset", "Menambahkan, mengedit, atau menghapus aset kendaraan/drone."),
  createPermission("sop:edit", "Edit SOP", "Membuat dan memodifikasi Prosedur Operasi Standar."),
  createPermission("user:manage", "Kelola Pengguna", "Membuat, menangguhkan, atau mengubah peran pengguna.")
];

export const MOCK_USER_ROLES = [
  createUserRole(
    "R-ADM",
    "Administrator Utama",
    "Akses penuh ke semua modul administratif.",
    2,
    ["drone:activate", "incident:approve", "asset:manage", "sop:edit", "user:manage"]
  ),
  createUserRole(
    "R-OPE",
    "Operator ICCC",
    "Bertanggung jawab untuk pemantauan insiden dan pengerahan awal.",
    5,
    ["drone:activate", "incident:approve"]
  ),
  createUserRole(
    "R-PIL",
    "Pilot Drone",
    "Khusus operasi drone dan pemeliharaan terkait.",
    3,
    ["drone:activate"]
  ),
  createUserRole(
    "R-FFT",
    "Petugas Pemadam Kebakaran",
    "Akses ke dashboard operasional dan detail insiden.",
    20,
    ["drone:activate"]
  )
];

export const MOCK_USERS = [
  createUser(
    "U-101",
    "Rina Sari",
    "rina.sari@admin.gov",
    "081234567890",
    "R-ADM",
    "Administrator Utama",
    "Active",
    "2025-11-20T10:30:00Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/40f50edd-92e9-49ad-a3b4-c6efa9bc395a.png"
  ),
  createUser(
    "U-105",
    "Lia Kurniawan",
    "lia.k@drone.com",
    "087711223344",
    "R-PIL",
    "Pilot Drone",
    "Active",
    "2025-11-20T09:45:10Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/436b425f-b9a6-41fd-aba5-d7b63a0ccacf.png"
  ),
  createUser(
    "U-112",
    "Agus Sutanto",
    "agus.s@fire.gov",
    "081556789012",
    "R-FFT",
    "Petugas Pemadam Kebakaran",
    "Active",
    "2025-11-20T10:50:00Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/3992c622-9d2b-4e92-911a-8fcbc05ebbff.png"
  ),
  createUser(
    "U-118",
    "Bambang W.",
    "bambang.w@op.com",
    "089887766554",
    "R-OPE",
    "Operator ICCC",
    "Active",
    "2025-11-19T17:00:00Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/e6d54b2f-68c4-4d79-8417-4ead97c3c951.png"
  ),
  createUser(
    "U-125",
    "Siska Dewi",
    "siska.d@ward.net",
    "085612345678",
    "R-FFT",
    "Petugas Pemadam Kebakaran",
    "Inactive",
    "2025-10-01T00:00:00Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/2f7758be-5847-4a8e-99f0-afa514015e7b.png"
  ),
  createUser(
    "U-130",
    "Joko Santoso",
    "joko.s@pilot.net",
    "081333444555",
    "R-PIL",
    "Pilot Drone",
    "Active",
    "2025-11-20T11:05:00Z",
    "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/7ffd4949-97a7-4d51-bfce-2e8bd92c6ab3.png"
  )
];
