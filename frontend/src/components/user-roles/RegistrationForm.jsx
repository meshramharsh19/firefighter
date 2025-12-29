import React, { useState } from "react";

export default function RegistrationForm({
  isDark,
  form,
  setForm,
  roles
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const inputClass = `
    w-full px-4 py-3 rounded-lg outline-none transition-all
    ${isDark
      ? "bg-[#0f1114] text-white border border-[#ffffff40] placeholder-gray-400"
      : "bg-white text-black border border-gray-400 placeholder-gray-600"
    }
  `;

  // update form values
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 REGISTER USER API CALL
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "http://localhost/fire-fighter-new/backend/controllers/register_user.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage("✅ User Registered Successfully!");

        // reset form fields
        setForm({
          fullName: "",
          address: "",
          email: "",
          phone: "",
          designation: "",
          role: "",
          station: "",
        });
      } else {
        setMessage("❌ Error: " + result.message);
      }
    } catch (error) {
      setMessage("❌ Server Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="p-6 rounded-xl shadow mb-8"
      style={{
        backgroundColor: isDark ? "#0f1114" : "#ffffff",
        border: isDark ? "1px solid #1d1f23" : "1px solid #e0e0e0",
      }}
    >
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <p
          className="mb-4 font-medium"
          style={{ color: message.startsWith("✅") ? "green" : "red" }}
        >
          {message}
        </p>
      )}

      {/* FORM */}
      <form onSubmit={handleRegisterUser} className="grid grid-cols-2 gap-4">
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
          required
        />

        <input
          className={inputClass}
          name="email"
          placeholder="Email ID"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className={inputClass}
          name="phone"
          placeholder="Phone Number"
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

        {/* ROLE SELECT */}
        <select
          className={inputClass}
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        {/* STATION SELECT */}
        <select
          className={inputClass}
          name="station"
          value={form.station}
          onChange={handleChange}
          required
        >
          <option value="">Select Fire Station</option>
          <option value="Station 1">Station 1</option>
          <option value="Station 2">Station 2</option>
        </select>

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 py-3 rounded-lg font-semibold border text-white"
          style={{ backgroundColor: "#EF4343" }}
        >
          {loading ? "Registering..." : "Register User"}
        </button>
      </form>
    </div>
  );
}
