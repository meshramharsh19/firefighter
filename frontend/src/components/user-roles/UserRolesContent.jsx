import React, { useState, useEffect } from "react";
import { useTheme } from "@/Context/ThemeContext";

import RegistrationForm from "./RegistrationForm";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";
import OtpModal from "./OtpModal";

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

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    station: "",
    role: "",
    status: "",
    name: "",
  });

  const [otpModal, setOtpModal] = useState({
    open: false,
    user: null,
    reason: "",
  });

  // 🔥 Fetch Users From Backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/get_all_users.php"
      );

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 🔥 Refresh UI after registration
  const handleSubmit = async () => {
    await fetchUsers();
  };

  const updateStatus = (id, status) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, active: status } : u)));
  };

const toggleUserStatus = async (user) => {
  // 🔥 If user is ACTIVE → Open OTP modal (DEACTIVATE)
  if (user.active) {
    setOtpModal({ open: true, user });
    return;
  }

  // 🔥 If user is INACTIVE → INSTANT UI update
  updateStatus(user.id, true);

  // 🔥 ALSO update database silently
  try {
    const response = await fetch(
      "http://localhost/fire-fighter-new/backend/controllers/update_user_status.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          status: 1,      // activate
          reason: "",     // no reason needed
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      toast.success("User Activated Successfully!");
    } else {
      toast.error("Failed to activate user in database");
      updateStatus(user.id, false); // ❗ rollback if failed
    }
  } catch (error) {
    toast.error("Server error");
    updateStatus(user.id, false); // ❗ rollback if server error
  }
};



  // Filter Logic
  const filteredUsers = users.filter((u) => {
    if (filters.station && u.station !== filters.station) return false;
    if (filters.role && u.role !== filters.role) return false;
    if (filters.status === "active" && !u.active) return false;
    if (filters.status === "inactive" && u.active) return false;
    if (filters.name && !u.name.toLowerCase().includes(filters.name.toLowerCase()))
      return false;

    return true;
  });

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: isDark ? "#0d0f12" : "#FFFFFF",
        color: isDark ? "white" : "black",
      }}
    >
      <RegistrationForm
        isDark={isDark}
        form={form}
        setForm={setForm}
        roles={roles}
        onSubmit={handleSubmit}
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
