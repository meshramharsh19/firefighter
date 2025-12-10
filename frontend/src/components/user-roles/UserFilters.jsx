import React from "react";

export default function UserFilters({ isDark, roles, filters, setFilters }) {
  const base = `
    px-4 py-3 rounded-lg border outline-none
    ${isDark ? "bg-[#0f1114] text-white" : "bg-white text-black"}
  `;

  return (
    <div className="flex gap-4 mb-4">
      <input
        className={base}
        placeholder="Search Name"
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      <select
        className={base}
        onChange={(e) => setFilters({ ...filters, station: e.target.value })}
      >
        <option value="">All Stations</option>
        <option>Station 1</option>
        <option>Station 2</option>
      </select>

      <select
        className={base}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
      >
        <option value="">All Roles</option>
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <select
        className={base}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
