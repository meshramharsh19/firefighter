import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@/Context/ThemeContext";
import RegistrationForm from "./RegistrationForm";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";
import OtpModal from "./OtpModal";
import toast from "react-hot-toast";

export default function UserRoleManagementPage() {
  const { isDark } = useTheme();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API = `${API_BASE}/admin/admin-user-roles`;

  /* ---------------- CONSTANTS ---------------- */
  const ROLES = ["Pilot", "Fire Station Command Control", "Vehicle Driver"];

  /* ---------------- STATE ---------------- */
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formVisible, setFormVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    designation: "",
    role: "",
    station: "",
  });

  const [filters, setFilters] = useState({
    name: "",
    station: "",
    role: "",
    status: "",
    sortBy: "",
  });

  const [otpModal, setOtpModal] = useState({ open: false, user: null });

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/get_all_users.php`);
      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to load users");
        setUsers([]);
        return;
      }

      const normalizedUsers = data.users.map((u) => ({
        ...u,
        active: Number(u.active) === 1,
      }));

      setUsers(normalizedUsers);
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* ---------------- HANDLE ADD / EDIT ---------------- */
  const handleAddUser = () => {
    setForm({
      fullName: "",
      address: "",
      email: "",
      phone: "",
      designation: "",
      role: "",
      station: "",
    });
    setEditUserId(null);
    setFormVisible(true);
  };

  const handleEditUser = async (userId) => {
    try {
      const res = await fetch(`${API}/get_user_by_id.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to fetch user");
        return;
      }

      const user = data.user;

      setForm({
        fullName: user.fullName || "",
        address: user.address || "",
        email: user.email || "",
        phone: user.phone || "",
        designation: user.designation || "",
        role: user.role || "",
        station: user.station || "",
      });

      setEditUserId(userId);
      setFormVisible(true);
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching user");
    }
  };

  /* ---------------- STATUS ---------------- */
  const updateLocalStatus = (userId, isActive) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: isActive } : u))
    );
  };

  const toggleUserStatus = async (user) => {
    if (user.active) {
      setOtpModal({ open: true, user });
      return;
    }

    updateLocalStatus(user.id, true);

    try {
      const response = await fetch(`${API}/update_user_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, status: 1, reason: "" }),
      });

      const result = await response.json();

      if (!result.success) {
        toast.error("Failed to activate user");
        updateLocalStatus(user.id, false);
        return;
      }

      toast.success("User Activated Successfully");
    } catch {
      toast.error("Server error");
      updateLocalStatus(user.id, false);
    }
  };

  /* ---------------- FILTERED USERS ---------------- */
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        if (
          filters.name &&
          !u.fullName?.toLowerCase().includes(filters.name.toLowerCase())
        )
          return false;
        if (filters.station && u.station !== filters.station) return false;
        if (filters.role && u.role !== filters.role) return false;
        if (filters.status === "active" && !u.active) return false;
        if (filters.status === "inactive" && u.active) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "id_asc") return a.id - b.id;
        if (filters.sortBy === "id_desc") return b.id - a.id;
        return 0;
      });
  }, [users, filters]);

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`min-h-screen p-6 space-y-6 ${isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          User Management
        </h1>

        <button
          onClick={handleAddUser}
          className={`
          px-8 py-2 text-white rounded-md transition duration-200 border border-gray-700
          ${isDark ? "bg-black-800 hover:bg-red-600" : "bg-black hover:bg-red-600"}
        `}
        >
          Add User
        </button>

      </div>

      {/* Filters */}
      <UserFilters
        isDark={isDark}
        roles={ROLES}
        filters={filters}
        setFilters={setFilters}
      />

      {/* User Table */}
      <UsersTable
        isDark={isDark}
        users={filteredUsers}
        loading={loading}
        toggleUserStatus={toggleUserStatus}
        onEdit={handleEditUser}
      />

      {/* ✅ Registration Form (NO extra wrapper now) */}
      {formVisible && (
        <RegistrationForm
          isDark={isDark}
          form={form}
          setForm={setForm}
          roles={ROLES}
          editUserId={editUserId}
          setEditUserId={setEditUserId}
          onSubmit={() => {
            fetchUsers();
            setFormVisible(false);
          }}
          onCancel={() => setFormVisible(false)}
        />
      )}

      {/* OTP Modal */}
      {otpModal.open && (
        <OtpModal
          isDark={isDark}
          otpModal={otpModal}
          setOtpModal={setOtpModal}
          updateStatus={updateLocalStatus}
        />
      )}
    </div>
  );
}
