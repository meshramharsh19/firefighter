import React, { useEffect, useState } from "react";
import { useTheme } from "@/Context/ThemeContext";
import RegistrationForm from "./RegistrationForm";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";
import OtpModal from "./OtpModal";
import toast from "react-hot-toast";

export default function UserRoleManagementPage() {
  const { isDark } = useTheme();

  const roles = ["Pilot", "Fire Station Command Control", "Vehicle Driver"];

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    designation: "",
    role: "",
    station: "",
  });

  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    station: "",
    role: "",
    status: "",
    sortBy: "",
  });

  const [otpModal, setOtpModal] = useState({ open: false, user: null });

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/get_all_users.php"
      );
      const data = await res.json();

      setUsers(
        data.success
          ? data.users.map((u) => ({
              ...u,
              active: Number(u.active) === 1,
            }))
          : []
      );
    } catch {
      toast.error("Failed to load users");
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (userId) => {
    try {
      const res = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/get_user_by_id.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setForm({
          fullName: data.user.fullName || "",
          address: data.user.address || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          designation: data.user.designation || "",
          role: data.user.role || "",
          station: data.user.station || "",
        });
        setEditUserId(userId);
      }
    } catch {
      toast.error("Failed to fetch user");
    }
  };

  // ✅ STATE UPDATER (already correct)
  const updateStatus = (userId, isActive) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, active: isActive } : u
      )
    );
  };

  const toggleUserStatus = async (user) => {
    if (user.active === true) {
      setOtpModal({ open: true, user });
      return;
    }

    updateStatus(user.id, true);

    try {
      const response = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/update_user_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            status: 1,
            reason: "",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("User Activated Successfully!");
      } else {
        toast.error("Failed to activate user");
        updateStatus(user.id, false);
      }
    } catch {
      toast.error("Server error");
      updateStatus(user.id, false);
    }
  };

  const filteredUsers = users
    .filter((u) => {
      if (
        filters.name &&
        !u.fullName?.toLowerCase().includes(filters.name.toLowerCase())
      ) return false;

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

  return (
    <div className="min-h-screen p-6">
      <RegistrationForm
        isDark={isDark}
        form={form}
        setForm={setForm}
        roles={roles}
        editUserId={editUserId}
        setEditUserId={setEditUserId}
        onSubmit={fetchUsers}
      />

      <UserFilters
        isDark={isDark}
        roles={roles}
        filters={filters}
        setFilters={setFilters}
      />

      <UsersTable
        isDark={isDark}
        users={filteredUsers}
        toggleUserStatus={toggleUserStatus}
        onEdit={handleEdit}
      />

      {otpModal.open && (
        <OtpModal
          isDark={isDark}
          otpModal={otpModal}
          setOtpModal={setOtpModal}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}
