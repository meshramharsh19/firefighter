import React, { useState, useEffect, useRef } from "react";
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

  /* 🔥 NEW STATE FOR SEARCHABLE DROPDOWN */
  const [stationOpen, setStationOpen] = useState(false);
  const [stationSearch, setStationSearch] = useState("");
  const dropdownRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API = `${API_BASE}/admin/admin-user-roles`;

  const inputClass = `
    w-full px-4 py-3 rounded-lg outline-none transition-all duration-200
    border
    focus:ring-2 focus:ring-red-500/40
    ${isDark
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

  /* ---------------- CLOSE DROPDOWN OUTSIDE ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FILTER STATIONS ---------------- */
  const filteredStations = stations.filter((s) =>
    s.name.toLowerCase().includes(stationSearch.toLowerCase())
  );

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
        toast.success(
          isEdit
            ? "User Updated Successfully"
            : "User Registered Successfully"
        );

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
          ✕
        </button>

        <h2 className="text-xl font-bold mb-3">
          {editUserId ? "Update User" : "User Registration"}
        </h2>

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

          {/* 🔥 SEARCHABLE STATION DROPDOWN */}
          <div className="relative col-span-2" ref={dropdownRef}>
            <div
              onClick={() => setStationOpen(!stationOpen)}
              className={`${inputClass} cursor-pointer flex justify-between items-center`}
            >
              <span>
                {form.station || "Select Fire Station"}
              </span>
              <span>▼</span>
            </div>

            {stationOpen && (
              <div
                className={`absolute z-50 mt-1 w-full rounded-lg border shadow-lg ${isDark
                    ? "bg-[#0f1114] border-gray-700"
                    : "bg-white border-gray-300"
                  }`}
              >
                <input
                  type="text"
                  placeholder="Search station..."
                  className={`w-full px-3 py-2 border-b outline-none ${isDark
                      ? "bg-[#0f1114] text-white border-gray-700"
                      : "bg-white text-black border-gray-200"
                    }`}
                  value={stationSearch}
                  onChange={(e) => setStationSearch(e.target.value)}
                />

                <div
                  className="max-h-52 overflow-y-scroll"
                  style={{ maxHeight: "200px" }}
                >
                  {filteredStations.length === 0 && (
                    <div className="px-4 py-2 text-gray-400">
                      No stations found
                    </div>
                  )}

                  {filteredStations.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setForm({ ...form, station: s.name });
                        setStationOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
