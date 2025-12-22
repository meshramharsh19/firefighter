import React, { useState, useEffect } from "react";

export default function RegistrationForm({
  isDark,
  form,
  setForm,
  roles,
  editUserId,
  setEditUserId,
  onSubmit,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [stations, setStations] = useState([]);

  const inputClass = `
    w-full px-4 py-3 pr-10 rounded-lg outline-none transition-all duration-200
    border appearance-none
    focus:ring-2 focus:ring-red-500/40
    ${
      isDark
        ? `
          bg-[#0f1114] text-white border-[#ffffff40]
          hover:border-white
          focus:border-white
        `
        : `
          bg-white text-black border-gray-400
          hover:border-black
          focus:border-black
        `
    }
  `;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    fetch(
      "http://localhost/fire-fighter-new/backend/controllers/get_firestations.php"
    )
      .then((res) => res.json())
      .then((data) => data.success && setStations(data.stations));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const isEdit = Boolean(editUserId);

    const url = isEdit
      ? "http://localhost/fire-fighter-new/backend/controllers/update_user.php"
      : "http://localhost/fire-fighter-new/backend/controllers/register_user.php";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { ...form, id: editUserId } : form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(isEdit ? "✅ User Updated" : "✅ User Registered");

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
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNewUser = () => {
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
    setMessage(null);
  };

  return (
    <div
      className="p-6 rounded-xl shadow mb-8"
      style={{
        backgroundColor: isDark ? "#0f1114" : "#ffffff",
        border: isDark ? "1px solid #1d1f23" : "1px solid #e0e0e0",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">
          {editUserId ? "Update User" : "User Registration"}
        </h2>

        {editUserId && (
          <button
            type="button"
            onClick={handleRegisterNewUser}
            className="
              px-4 py-2 rounded-lg text-sm font-semibold text-white
              bg-[#EF4343]
              transition-all duration-200
              hover:bg-red-600
              active:bg-red-700 active:scale-[0.97]
            "
          >
            Register New User
          </button>
        )}
      </div>

      {message && (
        <p
          className="mb-3"
          style={{ color: message.startsWith("✅") ? "green" : "red" }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* FULL NAME - REQUIRED */}
        <input
          className={inputClass}
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        {/* ADDRESS - OPTIONAL */}
        <input
          className={inputClass}
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        {/* EMAIL - OPTIONAL */}
        <input
          className={inputClass}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* PHONE - REQUIRED */}
        <input
          className={inputClass}
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {/* DESIGNATION - REQUIRED */}
        <input
          className={inputClass}
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />

        {/* ROLE - REQUIRED */}
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

        {/* STATION - REQUIRED */}
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
          className="
            col-span-2 py-3 rounded-lg font-semibold text-white
            bg-[#EF4343]
            transition-all duration-200
            hover:bg-red-600
            active:bg-red-700 active:scale-[0.97]
            disabled:opacity-60 disabled:cursor-not-allowed
          "
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
  );
}
