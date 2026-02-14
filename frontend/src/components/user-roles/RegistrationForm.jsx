import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RegistrationForm({
  isDark,
  form,
  setForm,
  roles,
  editUserId,
  setEditUserId,
  onSubmit,
  onCancel,
}) {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API = `${API_BASE}/admin/admin-user-roles`;

  const inputClass = `
    w-full px-4 py-3 pr-10 rounded-lg outline-none transition-all duration-200
    border appearance-none
    focus:ring-2 focus:ring-red-500/40
    ${
      isDark
        ? `bg-[#0f1114] text-white border-[#ffffff40] hover:border-white focus:border-white`
        : `bg-white text-black border-gray-400 hover:border-black focus:border-black`
    }
  `;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------------- FETCH STATIONS ---------------- */
  useEffect(() => {
    fetch(`${API_BASE}/admin/station/get_stations.php`)
      .then((res) => res.json())
      .then((data) => {
        const stationList = Array.isArray(data) ? data : data.stations || [];
        setStations(stationList);
      })
      .catch(() => setStations([]));
  }, []);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = Boolean(editUserId);
    const url = isEdit
      ? `${API}/update_user.php`
      : `${API}/register_user.php`;

    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { ...form, id: editUserId } : form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(isEdit ? " User Updated Successfully" : " User Registered Successfully");

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
        onSubmit();
      } else {
        toast.error("❌ " + data.message);
      }
    } catch {
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-3xl p-6 rounded-xl shadow-xl"
        style={{
          backgroundColor: isDark ? "#0f1114" : "#ffffff",
          border: isDark ? "1px solid #1d1f23" : "1px solid #e0e0e0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-3">
          {editUserId ? "Update User" : "User Registration"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            className={inputClass}
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            required
          />
          <select
            className={inputClass}
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            name="station"
            value={form.station}
            onChange={handleChange}
            required
          >
            <option value="">Select Fire Station</option>
            {stations.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 py-3 rounded-lg font-semibold text-white bg-[#EF4343] hover:bg-red-600 disabled:opacity-60"
          >
            {loading
              ? editUserId
                ? "Updating..."
                : "Registering..."
              : editUserId
              ? "Update User"
              : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
}
